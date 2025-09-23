import { useState } from "react"
import { useRouter } from "next/router"

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Load users.json
      const res = await fetch("/data/users.json")
      const users = await res.json()

      // Find the user
      const user = users.find(
        (u) => u.username === username && u.password === password
      )

      if (user) {
        // Save login state with user info
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("currentUser", JSON.stringify(user))
        router.push("/") // redirect to homepage
      } else {
        setError("Invalid username or password")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2 mb-6">
          <span role="img" aria-label="lock">🔒</span>
          Login to RushFusion100
        </h1>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">❌ {error}</p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                       text-black placeholder-gray-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                       text-black placeholder-gray-600"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
