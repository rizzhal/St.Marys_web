import './globals.css'
import Providers from '../src/components/Providers.jsx'
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "St. Mary's School",
  description: "St. Mary's School website",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Analytics/>
      </body>
    </html>
  )
}
