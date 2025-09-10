import Image from "next/image"
import { useState } from "react"
import ProfileCard from "./ProfileCard"

export default function Leaderboard({ ranking }) {
  const [selectedRep, setSelectedRep] = useState(null)

  return (
    <div className="mt-12 w-full max-w-4xl mx-auto">
      <table className="w-full text-left border-collapse shadow-md rounded-lg overflow-hidden bg-white">
        <thead className="bg-gray-100 text-gray-800 font-semibold">
          <tr>
            <th className="p-3">Rank</th>
            <th className="p-3">Rep</th>
            <th className="p-3">Sales</th>
            <th className="p-3">Commission</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((rep, index) => (
            <tr
              key={rep.id}
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
              <td className="p-3 text-gray-800">{rep.yesCount}</td>
              <td className="p-3 text-green-600 font-semibold">
                ${rep.commission}
              </td>
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
