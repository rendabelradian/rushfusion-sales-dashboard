import { createPortal } from "react-dom"
import Image from "next/image"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function ProfileCard({ rep, onClose }) {
  if (!rep) return null

  // Mock weekly data for now
  const weeklyData = [
    { week: "W1", yes: 1 },
    { week: "W2", yes: 3 },
    { week: "W3", yes: 2 },
    { week: "W4", yes: rep.yesCount },
  ]

  const modal = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
      onClick={onClose} // close if you click background
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-[400px] relative transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside card
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <Image
            src={`/icons/${rep.name.toLowerCase()}.png`}
            alt={rep.name}
            width={80}
            height={80}
            className="rounded-full border-2 border-gray-300"
          />
          <h2 className="mt-3 text-xl font-bold text-gray-900">{rep.name}</h2>
        </div>

        {/* Stats */}
        <p className="text-gray-700">Emails: {rep.emails}</p>
        <p className="text-gray-700">Yes: {rep.yesCount}</p>
        <p className="text-gray-700">Response Rate: {rep.responseRate}%</p>
        <p className="text-green-600 font-semibold">
          Commission: ${rep.yesCount * 100}
        </p>

        {/* Weekly Trend */}
        <div className="mt-6 w-full h-32">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Weekly Trend
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <XAxis dataKey="week" hide />
              <YAxis hide />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="yes"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )

  // Mount modal at the <body> level to guarantee overlay
  return createPortal(modal, document.body)
}
