import Papa from "papaparse"

export async function loadSalesData() {
  const response = await fetch("/data/sales_tracker.csv")
  const csvText = await response.text()

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  })

  // Normalize data
  return parsed.data.map((row, index) => ({
    id: index + 1,
    name: row.Name,
    sales: Number(row["Amount of Sales"]) || 0, // 👈 matches CSV header
    commission: (Number(row["Amount of Sales"]) || 0) * 100,
  }))
}
