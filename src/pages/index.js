import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Podium from "@/components/Podium"
import Leaderboard from "@/components/Leaderboard"
import MonthlyGoalDashboard from "@/components/MonthlyGoalDashboard"
import { rankPods } from "@/utils/rankPods"
import { loadSalesData } from "@/utils/loadSalesData"

export default function Home() {
  const [ranking, setRanking] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const salesData = await loadSalesData()
      const ranked = rankPods(salesData, "sales")
      setRanking(ranked)
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("auth")
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-8">
      {/* Header with logo + logout */}
      <div className="flex items-center justify-between w-full max-w-5xl mb-6">
        <div className="flex items-center gap-3">
          <img src="/icons/f100.avif" alt="Logo" className="w-10 h-10" />
          <h1 className="text-4xl font-bold text-gray-900">RushFusion Sales</h1>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Podium */}
      {ranking && <Podium ranking={ranking} />}

      {/* Monthly Goal Dashboard */}
      {ranking && <MonthlyGoalDashboard ranking={ranking} />}

      {/* Leaderboard */}
      {ranking && <Leaderboard ranking={ranking} />}
    </div>
  )
}
