'use client'

import React from 'react'
import Link from 'next/link'

const NavDropdown = ({ items, isOpen = false, onNavigate = () => {} }) => {
  return (
    <div className={`absolute left-0 top-full pt-2 z-50 transition-all duration-200 ${
      isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
    } group-hover:opacity-100 group-hover:visible`}>
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 min-w-[220px] py-2">
        {items.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            onClick={onNavigate}
            className="block px-4 py-2.5 text-sm text-gray-700 hover:text-maroon-700 hover:bg-maroon-50 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NavDropdown