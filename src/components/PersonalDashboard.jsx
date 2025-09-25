import Image from "next/image"
import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function PersonalDashboard({ currentUser, salesData }) {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (currentUser && salesData) {
      // Match the currentUser with salesData
      const found = salesData.find(
        (rep) =>
          rep.name.toLowerCase() === currentUser.name.toLowerCase()
      )
      setUserData(found || { ...currentUser, sales: 0 })
    }
  }, [currentUser, salesData])

  // Mock weekly trend (in a real case, replace with real data)
  const weeklyTrend = [
    { week: "W1", sales: 0 },
    { week: "W2", sales: Math.floor(userData?.sales * 0.25) },
    { week: "W3", sales: Math.floor(userData?.sales * 0.5) },
    { week: "W4", sales: userData?.sales || 0 },
  ]

  if (!userData) return null

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10">
        {/* Profile Image */}
        {!userData.isAdmin && (
          <div className="flex-shrink-0">
            <Image
              src={`/icons/${userData.name.toLowerCase()}.png`}
              alt={userData.name}
              width={150}
              height={150}
              className="rounded-full border-4 border-blue-500 shadow-lg"
              onError={(e) => (e.target.src = "/icons/default.png")}
            />
          </div>
        )}

        {/* User Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            👋 Welcome back, {userData.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Here is your progress so far:
          </p>

          {/* Sales Highlight Card */}
          <div className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 rounded-xl shadow-lg inline-block">
            <p className="text-sm uppercase tracking-wide">Total Sales</p>
            <p className="text-3xl font-extrabold">{userData.sales}</p>
          </div>
        </div>
      </div>

      {/* Weekly Sales Trend */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          📈 Weekly Sales Trend
        </h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Future Section: Achievements or Goals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">🎯 Monthly Goal</h3>
          <p className="text-gray-600">
            You’ve reached{" "}
            <span className="font-bold text-blue-600">
              {userData.sales}
            </span>{" "}
            sales this month. Keep pushing to hit your target!
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">🏆 Achievements</h3>
          <ul className="list-disc ml-5 text-gray-600">
            <li>Logged in successfully</li>
            {userData.sales > 0 && <li>First sales recorded</li>}
            {userData.sales >= 5 && <li>Reached 5+ sales milestone</li>}
            {userData.sales >= 10 && <li>Top performer potential</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
