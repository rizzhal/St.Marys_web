'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-800">{item.title}</span>
            <ChevronDown
              size={20}
              className={`text-gray-400 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion