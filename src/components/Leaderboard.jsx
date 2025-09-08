import Image from "next/image"
import { useState } from "react"
import ProfileCard from "./ProfileCard"

export default function Leaderboard({ ranking }) {
  const [selectedRep, setSelectedRep] = useState(null)

  return (
    <div className="mt-8 w-full max-w-4xl">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="text-left p-3">Rank</th>
            <th className="text-left p-3">Rep</th>
            <th className="text-left p-3">Response Rate</th>
            <th className="text-left p-3">Emails</th>
            <th className="text-left p-3">Yes</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((rep, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedRep(rep)}
            >
              <td className="p-3 font-medium text-gray-800">{index + 1}</td>
              <td className="p-3 flex items-center gap-3 text-gray-800">
                <Image
                  src={`/icons/${rep.name?.toLowerCase()}.png`}
                  alt={rep.name || "Rep"}
                  width={40}
                  height={40}
                  className="rounded-full border border-gray-300"
                />
                {rep.name || "Unknown"}
              </td>
              <td className="p-3 text-gray-800">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${rep.responseRate}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {rep.responseRate}%
                </span>
              </td>
              <td className="p-3 text-gray-800">{rep.emails}</td>
              <td className="p-3 text-gray-800">{rep.yesCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal only renders when a rep is selected */}
      {selectedRep && (
        <ProfileCard
          rep={selectedRep}
          onClose={() => setSelectedRep(null)}
        />
      )}
    </div>
  )
}
