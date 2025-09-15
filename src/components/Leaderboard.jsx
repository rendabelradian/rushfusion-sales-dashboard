import Image from "next/image"
import { useState } from "react"
import ProfileCard from "./ProfileCard"

export default function Leaderboard({ ranking }) {
  const [selectedRep, setSelectedRep] = useState(null)

  // Ensure sales is always a number (default 0 if missing)
  const normalizedRanking = ranking.map((rep) => ({
    ...rep,
    sales: rep.sales !== undefined ? rep.sales : rep.yesCount || 0,
  }))

  return (
    <div className="mt-12 w-full max-w-5xl mx-auto px-2 sm:px-0">
      {/* Title */}
      <h2 className="text-xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
        📊 Sales Performance Leaderboard
      </h2>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-800 font-semibold">
            <tr>
              <th className="p-2 sm:p-3 text-sm sm:text-base">Rank</th>
              <th className="p-2 sm:p-3 text-sm sm:text-base">Rep</th>
              <th className="p-2 sm:p-3 text-sm sm:text-base">Sales</th>
            </tr>
          </thead>
          <tbody>
            {normalizedRanking.map((rep, index) => (
              <tr
                key={rep.id || rep.name}
                className="hover:bg-gray-50 transition cursor-pointer"
                onClick={() => setSelectedRep(rep)}
              >
                <td className="p-2 sm:p-3 text-gray-800 font-medium text-sm sm:text-base">
                  {index + 1}
                </td>
                <td className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3 text-gray-800">
                  <Image
                    src={`/icons/${rep.name.toLowerCase()}.png`}
                    alt={rep.name}
                    width={32}
                    height={32}
                    className="sm:w-10 sm:h-10 rounded-full border"
                    onError={(e) => (e.target.src = "/icons/default.png")}
                  />
                  <span className="font-medium text-gray-800 text-sm sm:text-base">
                    {rep.name}
                  </span>
                </td>
                <td className="p-2 sm:p-3 text-gray-800 text-sm sm:text-base">
                  {rep.sales}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Profile Modal */}
      {selectedRep && (
        <ProfileCard rep={selectedRep} onClose={() => setSelectedRep(null)} />
      )}
    </div>
  )
}
