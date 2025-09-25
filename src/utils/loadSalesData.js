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

  // Normalize + merge
  return parsed.data.map((row, index) => {
    const name = row.Name
    const sales = Number(row["Amount of Sales"]) || 0

    // Find matching user for avatar/isAdmin
    const user = users.find((u) => u.name === name)

    return {
      id: index + 1,
      name,
      sales,
      // commission removed everywhere (you mentioned that earlier)
      avatar: user?.avatar || "/icons/default.png",
      isAdmin: user?.isAdmin || false,
    }
  })
}
