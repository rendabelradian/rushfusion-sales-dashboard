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
    <div className="mt-12 w-full max-w-4xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        📊 Sales Performance Leaderboard
      </h2>

      <table className="w-full text-left border-collapse shadow-md rounded-lg overflow-hidden bg-white">
        <thead className="bg-gray-100 text-gray-800 font-semibold">
          <tr>
            <th className="p-3">Rank</th>
            <th className="p-3">Rep</th>
            <th className="p-3">Sales</th>
          </tr>
        </thead>
        <tbody>
          {normalizedRanking.map((rep, index) => (
            <tr
              key={rep.id || rep.name}
              className="hover:bg-gray-50 transition cursor-pointer"
              onClick={() => setSelectedRep(rep)}
            >
              <td className="p-3 text-gray-800 font-medium">{index + 1}</td>
              <td className="p-3 flex items-center gap-3 text-gray-800">
                <Image
                  src={`/icons/${rep.name.toLowerCase()}.png`}
                  alt={rep.name}
                  width={40}
                  height={40}
                  className="rounded-full border"
                  onError={(e) => (e.target.src = "/icons/default.png")}
                />
                <span className="font-medium text-gray-800">{rep.name}</span>
              </td>
              <td className="p-3 text-gray-800">{rep.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Profile Modal */}
      {selectedRep && (
        <ProfileCard rep={selectedRep} onClose={() => setSelectedRep(null)} />
      )}
    </div>
  )
}
