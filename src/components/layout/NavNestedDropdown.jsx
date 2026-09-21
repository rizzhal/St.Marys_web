'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const NavNestedDropdown = ({ items, isOpen = false, onToggle = () => {}, onNavigate = () => {} }) => {
  return (
    <div className={`absolute left-0 top-full pt-2 z-50 transition-all duration-200 ${
      isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
    } group-hover:opacity-100 group-hover:visible`}>
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 min-w-[220px] py-2">
        {items.map((item) => (
          <div key={item.path} className="relative group/sub">
            {item.nested ? (
              <>
                <button
                  type="button"
                  onClick={() => onToggle(item.path)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:text-maroon-700 hover:bg-maroon-50 transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
                <div className={`absolute left-full top-0 pt-0 pl-2 z-50 transition-all duration-200 ${
                  isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                } group-hover/sub:opacity-100 group-hover/sub:visible`}>
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 min-w-[200px] py-2">
                    {item.nested.map((nested) => (
                      <Link
                        key={nested.path}
                        href={nested.path}
                        onClick={onNavigate}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:text-maroon-700 hover:bg-maroon-50 transition-colors"
                      >
                        {nested.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Link
                href={item.path}
                onClick={onNavigate}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:text-maroon-700 hover:bg-maroon-50 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NavNestedDropdown