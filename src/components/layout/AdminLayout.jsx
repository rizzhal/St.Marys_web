'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, FileText, Users, Image, BookOpen, ShieldCheck, 
  LogOut, ChevronDown, Menu, X, School 
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth.js'

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const menuItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/circulars', icon: <FileText size={20} />, label: 'Circulars' },
    { path: '/admin/staff', icon: <Users size={20} />, label: 'Staff' },
    { path: '/admin/gallery', icon: <Image size={20} />, label: 'Gallery' },
    { path: '/admin/syllabus', icon: <BookOpen size={20} />, label: 'Syllabus' },
    { path: '/admin/disclosure', icon: <ShieldCheck size={20} />, label: 'Disclosure' }
  ]

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const isActive = (path) => pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-300 z-40`}>
        <div className="p-4 border-b flex items-center justify-between">
          <div className={`flex items-center gap-2 ${!sidebarOpen && 'justify-center w-full'}`}>
            <div className="bg-maroon-800 text-white p-2 rounded-lg">
              <School size={20} />
            </div>
            {sidebarOpen && (
              <span className="font-serif font-bold text-lg text-maroon-800">St. Mary's Admin</span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:block p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <ChevronDown size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-maroon-800 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
          {sidebarOpen && (
            <div className="mt-4 pt-4 border-t text-xs text-gray-400">
              <p className="font-medium text-gray-600">{user?.fullname}</p>
              <p>{user?.email}</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} ml-0`}>
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-xl font-serif font-semibold text-maroon-800 hidden lg:block">
            {menuItems.find(item => item.path === pathname)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4 ml-auto lg:ml-0">
            <span className="text-sm text-gray-600 hidden sm:block">{user?.fullname}</span>
            <div className="w-9 h-9 bg-maroon-100 rounded-full flex items-center justify-center text-maroon-800 font-semibold text-sm">
              {user?.fullname?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  )
}

export default AdminLayout