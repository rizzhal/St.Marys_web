'use client'

import React from 'react'
import Breadcrumb from './Breadcrumb.jsx'

const PageHeader = ({ title, subtitle, breadcrumb }) => {
  return (
    <div className="relative bg-gradient-to-r from-maroon-800 to-maroon-700 py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-400 rounded-full translate-y-1/2 -translate-x-1/3" />
      </div>
      <div className="container-custom relative">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gold-300 text-lg md:text-xl">{subtitle}</p>
          )}
          {breadcrumb && <Breadcrumb items={breadcrumb} className="mt-4" />}
        </div>
      </div>
    </div>
  )
}

export default PageHeader