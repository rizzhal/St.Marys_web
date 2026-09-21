'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../../components/common/SectionWrapper.jsx'
import { Users, Clock, Sparkles } from 'lucide-react'

const ClubsAndAssociations = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-maroon-900 h-[30vh] min-h-[220px] max-h-[280px]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-300 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>

        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[80px] md:text-[120px] font-serif font-bold text-white/5 tracking-[0.3em] select-none">
            CLUBS
          </span>
        </div>

        <div className="container-custom relative h-full flex items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-2"
            >
              <Users size={18} className="text-gold-400" />
              <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Extracurricular</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
            >
              Clubs & <span className="text-gold-400">Associations</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-sm mt-1"
            >
              Pursue your passions beyond the classroom
            </motion.p>
          </div>
        </div>

        {/* Bottom Gold Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500/50" />
      </section>

      {/* ===== INTRO TEXT ===== */}
      <section className="py-12 border-b border-gray-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-maroon-50 border border-maroon-100 rounded-full mb-4">
              <Sparkles size={14} className="text-maroon-700" />
              <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">Coming Soon</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              We are currently updating our clubs and associations. Stay tuned for exciting new
              opportunities to explore your interests, develop new skills, and build lasting friendships.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== COMING SOON PLACEHOLDER ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center py-20 max-w-2xl mx-auto"
          >
            <div className="inline-flex p-6 bg-maroon-50 rounded-3xl border border-maroon-100 mb-8">
              <Clock size={64} className="text-maroon-700" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-maroon-800 mb-4">
              Clubs & Associations
            </h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg leading-relaxed">
              We're preparing an exciting lineup of clubs and associations for our students.
              From music and art to coding and sports, there will be something for everyone.
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Check back soon for the complete list and how to join.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ClubsAndAssociations