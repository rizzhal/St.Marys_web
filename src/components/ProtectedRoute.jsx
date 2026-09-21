'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth.js'
import Loader from '../components/ui/Loader.jsx'

const ProtectedRoute = ({ children }) => {
  const router = useRouter()
  const { loading, isAuthenticated, user } = useAuth()

  useEffect(() => {
    if (!loading && (!isAuthenticated || !user)) router.replace('/login')
    else if (!loading && user && user.role !== 'admin' && user.role !== 'super-admin') router.replace('/')
  }, [loading, isAuthenticated, user, router])

  if (loading || !isAuthenticated || !user || (user.role !== 'admin' && user.role !== 'super-admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }

  return children
}

export default ProtectedRoute
