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

  // Mock weekly sales trend (replace with real later if you have dates)
  const weeklyData = [
    { week: "W1", sales: Math.floor((rep.sales || rep.yesCount) * 0.2) },
    { week: "W2", sales: Math.floor((rep.sales || rep.yesCount) * 0.3) },
    { week: "W3", sales: Math.floor((rep.sales || rep.yesCount) * 0.25) },
    { week: "W4", sales: rep.sales || rep.yesCount || 0 },
  ]

  const modal = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-[400px] max-w-[90%] relative transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Avatar + Name */}
        <div className="flex flex-col items-center mb-4">
          {/* Only show avatar if not admin */}
          {!rep.isAdmin && (
            <Image
              src={`/icons/${rep.name.toLowerCase()}.png`}
              alt={rep.name}
              width={80}
              height={80}
              className="rounded-full border-2 border-gray-300"
              onError={(e) => (e.target.src = "/icons/default.png")}
            />
          )}
          <h2 className="mt-3 text-xl font-bold text-gray-900">{rep.name}</h2>
        </div>

        {/* Stats */}
        <p className="text-gray-700 mb-4">
          <strong>Sales:</strong> {rep.sales || rep.yesCount || 0}
        </p>

        {/* Weekly Trend */}
        <div className="mt-4 w-full h-32">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Weekly Sales Trend
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <XAxis
                dataKey="week"
                stroke="#888"
                tick={{ fontSize: 10, fill: "#888" }}
              />
              <YAxis hide />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
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

  return createPortal(modal, document.body)
}
