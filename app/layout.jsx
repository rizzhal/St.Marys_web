import './globals.css'
import Providers from '../src/components/Providers.jsx'

export const metadata = {
  title: "St. Mary's School",
  description: "St. Mary's School website",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
