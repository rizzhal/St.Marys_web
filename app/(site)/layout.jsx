import TopBar from '../../src/components/layout/TopBar.jsx'
import Navbar from '../../src/components/layout/Navbar.jsx'
import Footer from '../../src/components/layout/Footer.jsx'

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  )
}
