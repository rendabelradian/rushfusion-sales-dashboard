import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Podium from "@/components/Podium"
import Leaderboard from "@/components/Leaderboard"
import MonthlyGoalDashboard from "@/components/MonthlyGoalDashboard"
import { rankPods } from "@/utils/rankPods"
import { loadSalesData } from "@/utils/loadSalesData"

export default function Home() {
  const [ranking, setRanking] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const salesData = await loadSalesData()
      const ranked = rankPods(salesData, "sales")
      setRanking(ranked)
    }

    // Load logged-in user from localStorage
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    } else {
      router.push("/login") // redirect if not logged in
    }

    fetchData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("currentUser")
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 px-4 sm:px-8 py-6">
      {/* Header with logo + logout */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl mb-6 gap-4 sm:gap-0">
        {/* Logo + Title */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <img src="/icons/f100.avif" alt="Logo" className="w-10 h-10" />
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
              RushFusion Sales
            </h1>
          </div>
          {currentUser && (
            <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-0">
              👋 Welcome, <span className="font-semibold">{currentUser.name}</span>
            </p>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Podium */}
      {ranking && <Podium ranking={ranking} />}

      {/* Monthly Goal Dashboard */}
      {ranking && <MonthlyGoalDashboard ranking={ranking} />}

      {/* Leaderboard */}
      {ranking && <Leaderboard ranking={ranking} currentUser={currentUser} />}
    </div>
  )
}
