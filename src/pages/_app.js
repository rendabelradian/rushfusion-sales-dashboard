import "@/styles/globals.css"
import { Poppins } from "next/font/google"
import { useEffect } from "react"
import { useRouter } from "next/router"

// Load Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Don’t run on the login page itself
    if (router.pathname !== "/login") {
      const isLoggedIn = localStorage.getItem("isLoggedIn")

      // If not logged in → force redirect
      if (!isLoggedIn) {
        router.push("/login")
      }
    }
  }, [router.pathname, router])

  return (
    <div className={`${poppins.className} bg-gray-50 min-h-screen`}>
      <Component {...pageProps} />
    </div>
  )
}
