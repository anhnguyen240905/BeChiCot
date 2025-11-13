import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {/* Analytics chỉ nên hiển thị khi deploy (prod) */}
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </>
  )
}
