'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react'
import NavDropdown from './NavDropdown.jsx'
import NavNestedDropdown from './NavNestedDropdown.jsx'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState({})
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setOpenDropdowns({})
  }, [pathname])

  const toggleDropdown = (path) => {
    setOpenDropdowns(prev => {
      const isAlreadyOpen = !!prev[path]
      const nextState = {}

      Object.keys(prev).forEach((key) => {
        nextState[key] = false
      })

      return {
        ...nextState,
        [path]: !isAlreadyOpen
      }
    })
  }

  const navItems = [
    { label: 'Home', path: '/' },
    {
      label: 'About',
      path: '/about',
      dropdown: [
        { label: 'Our Founders', path: '/about/founders' },
        { label: 'Our Journey', path: '/about/journey' },
        { label: 'Superiors', path: '/about/superiors' },
        { label: 'Principal', path: '/about/principal' }
      ]
    },
    {
      label: 'Administration',
      path: '/administration',
      dropdown: [
        { label: 'Management', path: '/administration/management' },
        {
          label: 'Teaching Staff',
          path: '/administration/teaching-staff',
          nested: [
            { label: 'Primary School', path: '/administration/teaching-staff/primary' },
            { label: 'Middle School', path: '/administration/teaching-staff/middle' },
            { label: 'High School', path: '/administration/teaching-staff/high' },
            { label: 'Higher Secondary', path: '/administration/teaching-staff/higher-secondary' }
          ]
        },
        { label: 'Non-Teaching Staff', path: '/administration/non-teaching' }
      ]
    },
    { label: 'Infrastructure', path: '/infrastructure' },
    {
      label: 'Admissions',
      path: '/admissions',
      dropdown: [
        { label: 'Admission Process', path: '/admissions' },
        { label: 'Enquiry Form', path: '/admissions/inquiry' }
      ]
    },
    {
      label: 'Academics',
      path: '/academics',
      dropdown: [
        { label: 'Syllabus', path: '/academics/syllabus' },
        { label: 'Evaluation System', path: '/academics/evaluation' }
      ]
    },
    { label: 'Student Rules', path: '/student-rules' },
    {
      label: 'Activities',
      path: '/extracurricular',
      dropdown: [
        { label: 'Clubs & Associations', path: '/extracurricular/clubs' },
        { label: 'Formative Moments', path: '/extracurricular/moments' }
      ]
    },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' }
  ]

  const isActive = (path) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-morphism shadow-2xl py-1' 
        : 'bg-white/95 shadow-sm py-3'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className={`relative transition-all duration-500 ${
              isScrolled ? 'scale-95' : 'scale-100'
            }`}>
              <div className="bg-linear-to-br from-maroon-700 to-maroon-900 p-2 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 overflow-hidden">
                <img 
                  src="/logo.jpeg" 
                  alt="St. Mary's School Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="absolute -inset-1 bg-linear-to-r from-gold-400/20 to-maroon-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div>
              <h1 className={`font-display font-bold text-maroon-900 transition-all duration-300 tracking-tight ${
                isScrolled ? 'text-lg' : 'text-2xl'
              }`}>
                St. Mary's
                <span className="inline-block ml-1">
                  <Sparkles size={12} className="text-gold-400 fill-gold-400 inline" />
                </span>
              </h1>
              <p className={`text-[13px] text-gray-700 leading-tight tracking-widest uppercase font-label transition-all duration-300 ${
                isScrolled ? 'text-[8px]' : ''
              }`}>
                Higher Secondary School
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-0.5 flex-nowrap overflow-visible">
            {navItems.map((item) => (
              <div key={item.path} className="relative group shrink-0">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item.path)}
                      aria-expanded={!!openDropdowns[item.path]}
                      className={`relative px-2.5 py-2 text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-xl whitespace-nowrap
                        ${isActive(item.path)
                          ? 'text-maroon-700 bg-linear-to-r from-maroon-50/80 to-gold-50/80 shadow-sm'
                          : 'text-gray-700 hover:text-gold-500'
                        }`}
                    >
                      <span className="relative z-10 flex items-center gap-1">
                        {item.label}
                        <ChevronDown size={11} className={`transition-all duration-300 ${
                          openDropdowns[item.path] ? 'rotate-180 text-gold-500' : ''
                        } ${isActive(item.path) ? 'text-gold-500' : 'text-gray-400'} group-hover:rotate-180 group-hover:text-gold-500`} />
                      </span>
                      <span className={`absolute inset-x-2 -bottom-1 h-0.5 bg-linear-to-r from-gold-400 to-maroon-600 rounded-full 
                        transition-all duration-500 ease-out
                        scale-x-0 group-hover:scale-x-100
                        group-hover:shadow-[0_0_12px_rgba(212,175,55,0.6)]`} 
                      />
                    </button>
                    {item.dropdown.some(d => d.nested) ? (
                      <NavNestedDropdown
                        items={item.dropdown}
                        isOpen={!!openDropdowns[item.path]}
                        onToggle={toggleDropdown}
                        onNavigate={() => setOpenDropdowns({})}
                      />
                    ) : (
                      <NavDropdown
                        items={item.dropdown}
                        isOpen={!!openDropdowns[item.path]}
                        onNavigate={() => setOpenDropdowns({})}
                      />
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={`relative px-2.5 py-2 text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-xl whitespace-nowrap
                      ${isActive(item.path)
                        ? 'text-maroon-700 bg-linear-to-r from-maroon-50/80 to-gold-50/80 shadow-sm'
                        : 'text-gray-700 hover:text-gold-500'
                      }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className={`absolute inset-x-2 -bottom-1 h-0.5 bg-linear-to-r from-gold-400 to-maroon-600 rounded-full 
                      transition-all duration-500 ease-out
                      scale-x-0 group-hover:scale-x-100
                      group-hover:shadow-[0_0_12px_rgba(212,175,55,0.6)]`} 
                    />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-linear-to-r from-maroon-50 to-gold-50/30 hover:from-maroon-100 hover:to-gold-100/50 transition-all duration-300 border border-maroon-100/50"
          >
            {isOpen ? (
              <X size={22} className="text-maroon-700" />
            ) : (
              <Menu size={22} className="text-maroon-700" />
            )}
          </button>
        </div>

        {/* ============ MOBILE MENU – SUBMENU EXPANDS UPWARD ============ */}
        <div className={`xl:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-6 pb-4 space-y-1 overflow-y-auto max-h-[80vh] border-t border-dashed border-maroon-100/60 mt-4">
            {navItems.map((item) => (
              <div key={item.path} className="space-y-0.5">
                {item.dropdown ? (
                  <>
                    {/* Parent Item */}
                    <button
                      onClick={() => toggleDropdown(item.path)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-300 ${
                        isActive(item.path)
                          ? 'text-maroon-700 bg-linear-to-r from-maroon-50/80 to-gold-50/80'
                          : 'text-gray-700 hover:text-gold-500 hover:bg-maroon-50/50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-300 ${
                          openDropdowns[item.path] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Submenu – Expands Upward, No Scrolling */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openDropdowns[item.path] ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pl-5 space-y-1 border-l-2 border-gold-200/50 ml-3">
                        {item.dropdown.map((sub) => (
                          <div key={sub.path}>
                            {sub.nested ? (
                              <>
                                {/* Nested Parent */}
                                <button
                                  onClick={() => toggleDropdown(sub.path)}
                                  className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold uppercase tracking-wider text-gray-600 hover:text-gold-500 rounded-lg hover:bg-maroon-50/50 transition-colors"
                                >
                                  <span>{sub.label}</span>
                                  <ChevronDown 
                                    size={14} 
                                    className={`transition-transform duration-300 ${
                                      openDropdowns[sub.path] ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>

                                {/* Nested Submenu – Full Expansion, No Scrolling */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                  openDropdowns[sub.path] ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                  <div className="pl-4 space-y-0.5">
                                    {sub.nested.map((nested) => (
                                      <Link
                                        key={nested.path}
                                        href={nested.path}
                                        className="block text-sm font-semibold text-gray-600 hover:text-gold-500 px-4 py-2 rounded-lg hover:bg-maroon-50/50 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {nested.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <Link
                                href={sub.path}
                                className="block text-sm font-semibold text-gray-600 hover:text-gold-500 px-4 py-2 rounded-lg hover:bg-maroon-50/50 transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-maroon-700 bg-linear-to-r from-maroon-50 to-gold-50/50 shadow-sm'
                        : 'text-gray-700 hover:text-gold-500 hover:bg-maroon-50/50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 mt-2 border-t border-dashed border-maroon-100/60">
              <div className="flex items-center justify-center gap-3 text-xs text-gray-400 font-label">
                <span>🏫 St. Mary's</span>
                <span className="w-px h-3 bg-gray-300" />
                <span>📚 Guwahati</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .glass-morphism {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }
        .font-display {
          font-family: 'Fraunces', ui-serif, Georgia, serif;
        }
        .font-label {
          font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  )
}

export default Navbar