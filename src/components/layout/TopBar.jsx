'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Phone, Mail, MapPin, CreditCard, ChevronDown, ExternalLink, Sparkles, ArrowRight } from 'lucide-react'

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const feeOptions = [
    {
      label: 'Class KG – VIII',
      bank: 'Federal Bank, Silpukhuri Branch',
      url: 'https://epay.federalbank.co.in/easypayments/AddPayee.aspx'
    },
    {
      label: 'Class IX – XII',
      bank: 'South Indian Bank, Ambari Branch',
      url: 'https://eacademia.southindianbank.bank.in/feeuser/home?encr=MzAzNw==#no-back'
    }
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="bg-linear-to-r from-[#1a0a0a] via-[#2d1212] to-[#1a0a0a] text-white py-2.5 px-4 border-b border-[#c9a84c]/30 relative z-60">
      <div className="container-custom">
        <div className="flex flex-wrap justify-between items-center text-xs gap-2">
          {/* Left - Contact Info - Hidden on mobile, visible on md+ */}
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="tel:+919435190537" 
              className="flex items-center gap-2 text-white/80 hover:text-[#c9a84c] transition-all duration-300 cursor-pointer group"
            >
              <Phone size={14} className="text-[#c9a84c] group-hover:scale-110 transition-transform" />
              <span className="tracking-wide font-medium">+91-94351-90537</span>
            </a>
            <a 
              href="mailto:stmarysghy1924@yahoo.com" 
              className="flex items-center gap-2 text-white/80 hover:text-[#c9a84c] transition-all duration-300 cursor-pointer group"
            >
              <Mail size={14} className="text-[#c9a84c] group-hover:scale-110 transition-transform" />
              <span className="tracking-wide font-medium">stmarysghy1924@yahoo.com</span>
            </a>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-[#c9a84c] transition-all duration-300 cursor-pointer group"
            >
              <MapPin size={14} className="text-[#c9a84c] group-hover:scale-110 transition-transform" />
              <span className="tracking-wide font-medium">Guwahati, Assam</span>
            </a>
          </div>

          {/* Right - Pay Fees Button - Always visible, centered on mobile */}
          <div className="flex w-full md:w-auto justify-center md:justify-end">
            <div className="flex items-center">
              {/* Pay Fees Dropdown - Premium Design */}
              <div className="relative z-70" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="pay-fees-cta group relative inline-flex items-center gap-1.5 sm:gap-2 bg-linear-to-r from-[#f5d98a] via-[#c9a84c] to-[#b8942a] text-[#1a0a0a] px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider hover:from-[#e8c97a] hover:via-[#b8942a] hover:to-[#a07e20] transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(201,168,76,0.4)] hover:shadow-[0_0_30px_rgba(201,168,76,0.6)] border border-[#f5d98a]/30"
                >
                  <span className="relative">
                    <Sparkles size={12}  className="inline sm:h-3.5 sm:w-3.5 animate-pulse text-[#1a0a0a]" />
                    <span className="absolute -inset-1 blur-md bg-[#c9a84c]/20 rounded-full -z-10" />
                  </span>
                  <span className="relative whitespace-nowrap">
                    <span className="hidden sm:inline">Pay Fees Online</span>
                    <span className="sm:hidden">Pay Fees</span>
                    <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#1a0a0a]/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </span>
                  <ChevronDown
                    size={12}
                    className={`transition-all duration-300 ${isOpen ? 'rotate-180' : ''} group-hover:translate-y-0.5`}
                  />
                  <span className="absolute -inset-1 rounded-full bg-linear-to-r from-[#c9a84c]/20 via-transparent to-[#c9a84c]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                </button>

                {/* Dropdown - Responsive width */}
                <div
                  className={`absolute right-0 top-full mt-2 w-70 sm:w-80 bg-white rounded-xl shadow-2xl border border-[#c9a84c]/20 overflow-hidden transition-all duration-200 origin-top-right ${
                    isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                  }`}
                  style={{ zIndex: 9999 }}
                >
                  <div className="bg-linear-to-r from-[#1a0a0a] to-[#2d1212] px-4 py-3 flex items-center justify-between">
                    <p className="text-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
                      Select Your Class Group
                    </p>
                    <CreditCard size={14} className="text-[#c9a84c]" />
                  </div>
                  {feeOptions.map((option, index) => (
                    <a
                      key={index}
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-4 py-3.5 hover:bg-linear-to-r hover:from-[#f5f0e6] hover:to-[#faf6ed] transition-all duration-200 border-b border-gray-100 last:border-b-0 group/item"
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-[#1a0a0a] group-hover/item:text-[#2d1212] flex items-center gap-1.5">
                          {option.label}
                          <span className="w-1 h-1 rounded-full bg-[#c9a84c] opacity-60" />
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{option.bank}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#c9a84c] font-medium opacity-0 group-hover/item:opacity-100 transition-opacity hidden sm:inline">Pay Now</span>
                        <ExternalLink size={14} className="text-[#c9a84c] shrink-0 opacity-60 group-hover/item:opacity-100 transition-all group-hover/item:translate-x-0.5" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pay-fees-cta {
          animation: pay-fees-pulse 2.5s ease-in-out infinite;
          position: relative;
        }
        
        .pay-fees-cta::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #c9a84c, #f5d98a, #c9a84c);
          z-index: -1;
          opacity: 0.5;
          filter: blur(8px);
          animation: pay-fees-glow 3s ease-in-out infinite;
        }
        
        .pay-fees-cta::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #f5d98a, #c9a84c, #b8942a);
          z-index: -1;
          opacity: 0.3;
          filter: blur(4px);
          animation: pay-fees-glow 2s ease-in-out infinite reverse;
        }
        
        @keyframes pay-fees-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(201, 168, 76, 0.6), 0 0 20px rgba(201, 168, 76, 0.2);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(201, 168, 76, 0), 0 0 40px rgba(201, 168, 76, 0.3);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(201, 168, 76, 0), 0 0 20px rgba(201, 168, 76, 0.1);
          }
        }
        
        @keyframes pay-fees-glow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        
        .pay-fees-cta:hover {
          animation: pay-fees-pulse-hover 1.5s ease-in-out infinite;
        }
        
        @keyframes pay-fees-pulse-hover {
          0% {
            box-shadow: 0 0 0 0 rgba(201, 168, 76, 0.8), 0 0 30px rgba(201, 168, 76, 0.4);
            transform: scale(1.05);
          }
          50% {
            box-shadow: 0 0 0 20px rgba(201, 168, 76, 0), 0 0 50px rgba(201, 168, 76, 0.5);
            transform: scale(1.08);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(201, 168, 76, 0), 0 0 30px rgba(201, 168, 76, 0.3);
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  )
}

export default TopBar