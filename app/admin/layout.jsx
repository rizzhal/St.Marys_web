import ProtectedRoute from '../../src/components/ProtectedRoute.jsx'
import AdminLayout from '../../src/components/layout/AdminLayout.jsx'

export default function AdminRootLayout({ children }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  )
}
