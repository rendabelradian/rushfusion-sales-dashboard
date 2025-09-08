import { useState } from "react"
import FileUploader from "@/components/FileUploader"
import Podium from "@/components/Podium"
import Leaderboard from "@/components/Leaderboard"
import { rankPods } from "@/utils/rankPods"

export default function Home() {
  const [ranking, setRanking] = useState(null)
  const [reportDate, setReportDate] = useState(null)

  const handleDataProcessed = (pods) => {
    const ranked = rankPods(pods, "yesCount")
    setRanking(ranked)

    if (pods[0]?.date) {
      setReportDate(pods[0].date)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-8">
      {/* Header with Logo */}
      <div className="flex items-center gap-3 mb-6">
        <img src="/icons/f100.avif" alt="Logo" className="w-10 h-10" />
        <h1 className="text-4xl font-bold text-gray-900">
          RushFusion Sales {reportDate && `(as of ${reportDate})`}
        </h1>
      </div>

      {/* CSV Upload */}
      <FileUploader onDataProcessed={handleDataProcessed} />

      {/* Podium */}
      {ranking && <Podium ranking={ranking} />}

      {/* Leaderboard */}
      {ranking && <Leaderboard ranking={ranking} />}
    </div>
  )
}
