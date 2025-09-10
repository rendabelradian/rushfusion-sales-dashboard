import Papa from "papaparse"

export async function processCsv(files) {
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

  const results = await Promise.all(fileArray.map(parseSingle))

  // Flatten into one array of reps
  const reps = results.flat().map((row, index) => {
    const sales = parseInt(row["Amount of Sales"], 10) || 0
    return {
      id: index + 1,
      name: row["Name"] || `Rep ${index + 1}`,
      yesCount: sales,
      commission: sales * 100, // $100 per sale
    }
  })

  return reps
}
