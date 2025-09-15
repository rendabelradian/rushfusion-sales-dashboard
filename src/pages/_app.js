import '@/styles/globals.css'
import { Poppins } from 'next/font/google'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Load Poppins with 400 (regular) and 700 (bold) weights
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('auth')

      // If not logged in and not on login page → redirect
      if (!auth && router.pathname !== '/login') {
        router.push('/login')
      }
    }
  }, [router.pathname])

  return (
    <div className={poppins.className}>
      <Component {...pageProps} />
    </div>
  )
}
