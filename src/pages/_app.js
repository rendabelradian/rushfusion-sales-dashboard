import '@/styles/globals.css'
import { Poppins } from 'next/font/google'

// Load Poppins with 400 (regular) and 700 (bold) weights
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={poppins.className}>
      <Component {...pageProps} />
    </div>
  )
}
