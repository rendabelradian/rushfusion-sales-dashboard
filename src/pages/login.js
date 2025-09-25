import { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

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
        // Save login state with user info (including isAdmin)
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            username: user.username,
            name: user.name,
            avatar: user.avatar,
            isAdmin: user.isAdmin || false,
          })
        )

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
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <Image src="/icons/f100.avif" alt="Logo Watermark" width={400} height={400} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo + tagline */}
        <div className="text-center mb-6">
          <Image
            src="/icons/f100.avif"
            alt="RushFusion100 Logo"
            width={60}
            height={60}
            className="mx-auto animate-bounce"
          />
          <h1 className="text-2xl font-bold text-gray-900 mt-2">RushFusion100</h1>
          <p className="text-gray-600 text-sm italic">
            Fueling Sales Performance 🚀
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg transform transition hover:scale-[1.01] hover:shadow-2xl">
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2 mb-6">
            <span role="img" aria-label="lock">🔒</span>
            Login
          </h2>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">❌ {error}</p>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600 transition transform focus:scale-[1.02]"
            />

            {/* Password with toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600 transition transform focus:scale-[1.02] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 text-sm"
              >
                {showPassword ? "🙈" : "👁️‍🗨️"}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Blob animation keyframes */}
      <style jsx>{`
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
      `}</style>
    </div>
  )
}
