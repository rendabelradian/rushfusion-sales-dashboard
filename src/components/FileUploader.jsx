import { useState } from "react"
import { processCsv } from "@/data/processCsv"

export default function FileUploader({ onDataProcessed }) {
  const [loading, setLoading] = useState(false)

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files) // ensure it’s an array
    if (!files.length) return
    setLoading(true)

    try {
      const pods = await processCsv(files) // pass array of files
      onDataProcessed(pods)
    } catch (err) {
      console.error("Error parsing CSVs:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="my-4 flex flex-col items-center">
      <label className="px-6 py-2 bg-yellow-500 text-black font-bold rounded cursor-pointer hover:bg-yellow-400 transition">
        {loading ? "Processing..." : "Upload 3 CSVs"}
        <input
          type="file"
          accept=".csv"
          multiple
          className="hidden"
          onChange={handleFiles}
        />
      </label>
    </div>
  )
}
