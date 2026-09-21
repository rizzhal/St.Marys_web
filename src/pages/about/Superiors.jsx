'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Cross, Users, Sparkles, ListOrdered } from 'lucide-react'
import SectionWrapper from '../../components/common/SectionWrapper.jsx'

const Superiors = () => {
  const superiorsList = [
    { id: 1, name: 'Sr. Innocenza Vallino' },
    { id: 2, name: 'Sr. Maria Avio' },
    { id: 3, name: 'Sr. Clotilde Appiano' },
    { id: 4, name: 'Sr. Luigina Saletta' },
    { id: 5, name: 'Sr. Clotilde Appiano' },
    { id: 6, name: 'Sr. Teresa Villa' },
    { id: 7, name: 'Sr. Francesca Martina' },
    { id: 8, name: 'Sr. Severina Schiapparelli' },
    { id: 9, name: 'Sr. Clotilde Appiano' },
    { id: 10, name: 'Sr. Cleofe Fassa' },
    { id: 11, name: 'Sr. Margaret Greppi' },
    { id: 12, name: 'Sr. Lydia Dias' },
    { id: 13, name: 'Sr. Rosy Devassy' },
    { id: 14, name: 'Sr. Margaret Greppi' },
    { id: 15, name: 'Sr. Rosy Devassy' },
    { id: 16, name: 'Sr. Mary Mampilly' },
    { id: 17, name: 'Sr. Celine Michael' },
    { id: 18, name: 'Sr. Annie Adichirayil' },
    { id: 19, name: 'Sr. Alphonsa Kurisinkal' },
    { id: 20, name: 'Sr. Lucy Rose Ozhukayil' },
    { id: 21, name: 'Sr. Grace Ottalankal' },
    { id: 22, name: 'Sr. Bridget Chittappanattu' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

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
            SUPERIORS
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
              <Cross size={18} className="text-gold-400" />
              <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Our Leadership</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
            >
              Our <span className="text-gold-400">Superiors</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-sm mt-1"
            >
              Spiritual & administrative leadership guiding our institution
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
              <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">Our Superiors</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our superiors provide the spiritual and administrative guidance that keeps our institution
              aligned with its founding vision and values.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== SUPERIORS GRID ===== */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50/50">
        <div className="container-custom">
          <SectionWrapper className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-maroon-800 mb-4">
              Spiritual & Administrative <span className="text-gold-600">Leadership</span>
            </h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
          </SectionWrapper>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {superiorsList.map((superior) => (
              <motion.div
                key={superior.id}
                variants={itemVariants}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 p-4 text-center border border-gray-100 hover:border-gold-300/60 hover:-translate-y-1"
              >
                {/* Decorative top line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400/0 via-gold-400 to-gold-400/0 rounded-t-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                {/* Number Badge */}
                <div className="flex justify-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-maroon-50 to-gold-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-gold-200/30">
                    <span className="text-xs font-bold text-maroon-700">{superior.id}</span>
                  </div>
                </div>
                
                {/* Cross Icon */}
                <div className="flex justify-center mb-1.5">
                  <Cross size={12} className="text-gold-400/60 group-hover:text-gold-500 transition-colors duration-300" />
                </div>
                
                <p className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-maroon-800 transition-colors duration-300 leading-tight">
                  {superior.name}
                </p>
                
                {/* Decorative bottom dot */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-400/0 group-hover:bg-gold-400 transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-100">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <ListOrdered size={16} className="text-maroon-700" />
                <span className="font-semibold text-maroon-800">{superiorsList.length}</span>
                <span>Superiors</span>
              </span>
              <span className="w-px h-6 bg-gray-200 hidden sm:block" />
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <Sparkles size={16} className="text-gold-500" />
                Serving with <span className="text-gold-600 font-semibold">❤️</span> and dedication
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Superiors