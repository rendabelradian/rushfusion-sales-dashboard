import Papa from "papaparse"

// Load and merge CSV sales with users.json info
export async function loadSalesData() {
  // Fetch CSV
  const response = await fetch("/data/sales_tracker.csv")
  const csvText = await response.text()

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  })

  // Fetch users.json
  const usersRes = await fetch("/data/users.json")
  const users = await usersRes.json()

  // Merge sales reps from CSV
  const salesData = parsed.data.map((row, index) => {
    const name = row.Name
    const sales = Number(row["Amount of Sales"]) || 0

    const user = users.find((u) => u.name === name)

    return {
      id: index + 1,
      name,
      sales,
      avatar: user?.avatar || "/icons/default.png",
      isAdmin: user?.isAdmin || false,
    }
  })

  // Add admins (if not already included in CSV)
  users
    .filter((u) => u.isAdmin)
    .forEach((admin) => {
      const exists = salesData.find(
        (rep) => rep.name.toLowerCase() === admin.name.toLowerCase()
      )
      if (!exists) {
        salesData.push({
          id: salesData.length + 1,
          name: admin.name,
          sales: 0,
          avatar: null, // admins don't need avatar
          isAdmin: true,
        })
      }
    })

  return salesData
}
