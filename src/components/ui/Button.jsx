'use client'

import React from 'react'

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-maroon-700 text-white hover:bg-maroon-800 focus:ring-maroon-500',
    secondary: 'bg-gold-500 text-maroon-900 hover:bg-gold-400 focus:ring-gold-400',
    outline: 'border-2 border-maroon-700 text-maroon-700 hover:bg-maroon-50 focus:ring-maroon-500',
    ghost: 'text-maroon-700 hover:bg-maroon-50 focus:ring-maroon-500'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button