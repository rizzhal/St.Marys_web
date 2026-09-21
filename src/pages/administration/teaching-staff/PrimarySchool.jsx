'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, BookOpen, GraduationCap } from 'lucide-react'
import SectionWrapper from '../../../components/common/SectionWrapper.jsx'
import StaffCard from '../../../components/common/StaffCard.jsx'
import { getStaff } from '../../../services/api.js'

const PrimarySchool = () => {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStaff('primary')
      .then(data => {
        setStaff(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

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
            PRIMARY
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
              <BookOpen size={18} className="text-gold-400" />
              <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Classes 5-6</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
            >
              Primary <span className="text-gold-400">School Staff</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-sm mt-1"
            >
              Dedicated teachers nurturing young minds
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
              <Users size={14} className="text-maroon-700" />
              <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">Primary Section</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Dedicated teachers who nurture and guide students in their formative years,
              building a strong foundation for their educational journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== STAFF GRID ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionWrapper>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-maroon-800 mb-4">
                Dedicated <span className="text-gold-600">Primary</span> Teachers
              </h2>
              <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto mt-3"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/3 mx-auto mt-1"></div>
                  <div className="h-3 bg-gray-100 rounded w-2/3 mx-auto mt-2"></div>
                </div>
              ))
            ) : staff.length > 0 ? (
              staff.map((member) => (
                <SectionWrapper key={member.id}>
                  <StaffCard staff={member} />
                </SectionWrapper>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 bg-maroon-50 rounded-3xl border border-maroon-200"
              >
                <div className="max-w-md mx-auto px-4">
                  <div className="inline-flex p-6 bg-white rounded-2xl shadow-lg mb-6 border border-maroon-100">
                    <GraduationCap size={48} className="text-maroon-700" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-maroon-800 mb-3">
                    Staff List Coming Soon
                  </h3>
                  <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-base leading-relaxed">
                    We are currently updating our primary school staff details. 
                    Please check back later.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrimarySchool