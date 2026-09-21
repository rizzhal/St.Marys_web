'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const Breadcrumb = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`}>
      <Link href="/" className="text-white/70 hover:text-white transition-colors">
        Home
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={item.path || index}>
          <ChevronRight size={14} className="text-white/40" />
          {item.path && index < items.length - 1 ? (
            <Link href={item.path} className="text-white/70 hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gold-300">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumb