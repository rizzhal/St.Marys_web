'use client'

import React from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-serif font-bold text-maroon-700">404</h1>
        <h2 className="text-3xl font-serif font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-maroon-700 text-white px-6 py-3 rounded-lg mt-6 hover:bg-maroon-800 transition-colors"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound