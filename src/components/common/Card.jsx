'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ children, className = '', hover = true, onClick }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)' } : {}}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-xl shadow-md overflow-hidden ${hover ? 'hover:shadow-xl transition-all duration-300' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

export default Card