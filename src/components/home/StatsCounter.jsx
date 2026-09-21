'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const AnimatedNumber = ({ end, duration = 2.5, suffix = '' }) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frameId
    let startTime

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(end * easedProgress))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step)
      }
    }

    frameId = window.requestAnimationFrame(step)

    return () => window.cancelAnimationFrame(frameId)
  }, [end, duration])

  return <span>{value}{suffix}</span>
}

const StatsCounter = () => {
  const stats = [
    { value: 50, label: 'Years of Legacy', suffix: '+' },
    { value: 2500, label: 'Students', suffix: '+' },
    { value: 85, label: 'Teaching Staff', suffix: '+' },
    { value: 100, label: 'Awards Won', suffix: '+' }
  ]

  return (
    <div className="bg-maroon-800 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-serif font-bold text-gold-400">
                <AnimatedNumber end={stat.value} duration={2.5} suffix={stat.suffix || ''} />
              </div>
              <p className="text-sm text-white/70 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsCounter