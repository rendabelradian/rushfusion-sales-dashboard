import { useState } from "react"
import { useRouter } from "next/router"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()

    if (
      username === process.env.NEXT_PUBLIC_DASHBOARD_USER &&
      password === process.env.NEXT_PUBLIC_DASHBOARD_PASS
    ) {
      localStorage.setItem("auth", "true")
      router.push("/")
    } else {
      setError("❌ Invalid username or password")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-lg p-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          🔐 Login to Dashboard
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

       <input
  type="text"
  placeholder="Username"
  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
             text-black placeholder-gray-500"
/>

<input
  type="password"
  placeholder="Password"
  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
             text-black placeholder-gray-500"
/>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}
