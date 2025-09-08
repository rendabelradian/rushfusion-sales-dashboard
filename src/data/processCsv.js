import Papa from "papaparse"

// Mock names for now since CSVs don’t include names
const mockNames = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"]

export async function processCsv(files) {
  // Ensure it's always an array
  const fileArray = Array.isArray(files) ? files : [files]

  const parseSingle = (file) =>
    new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
        error: (err) => reject(err),
      })
    })

  // Parse all files in parallel
  const results = await Promise.all(fileArray.map(parseSingle))

  // Map each parsed CSV into a pod with stats + mock name
  return results.map((data, index) => {
    const yesCount = data.filter(
      (row) => row.Status?.toLowerCase() === "yes"
    ).length

    return {
      id: index + 1,
      name: mockNames[index] || `Pod ${index + 1}`,
      data,
      emails: data.length,
      yesCount,
      responseRate: data.length ? ((yesCount / data.length) * 100).toFixed(1) : 0,
    }
  })
}
