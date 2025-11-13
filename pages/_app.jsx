import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'  // <- import Analytics

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />  {/* <- thêm Analytics ở đây */}
    </>
  )
}
