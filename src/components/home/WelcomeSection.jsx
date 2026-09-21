'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, ArrowRight, TrendingUp, BookOpen, Award, 
  GraduationCap, Heart, Calendar, Rocket, Shield, 
  Star, Compass, Crown, Gem, Zap
} from 'lucide-react'
import SectionWrapper from '../common/SectionWrapper.jsx'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
}

const WelcomeSection = () => {
  return (
    <SectionWrapper>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="relative bg-white rounded-[2rem] shadow-xl p-7 md:p-9 border border-maroon-100/60 overflow-hidden h-full min-h-[420px] flex flex-col justify-center"
      >
        {/* Decorative Background Elements - Solid Colors */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gold-100/15 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-maroon-50/20 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-32 h-32 bg-gold-200/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Floating Decorations */}
        <div className="absolute top-5 right-8 w-2 h-2 bg-gold-400 rounded-full opacity-50" />
        <div className="absolute bottom-8 right-14 w-2.5 h-2.5 bg-maroon-300 rounded-full opacity-30" />
        <div className="absolute top-1/3 left-5 w-1.5 h-1.5 bg-gold-500 rounded-full opacity-40" />

        {/* Top Border Accent - Solid Gold */}
        <div className="absolute top-0 left-8 right-8 h-0.5 bg-gold-400/40 rounded-full" />

        {/* Badge - Solid Maroon & Gold */}
        <motion.div variants={itemVariants} className="mb-5">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-maroon-800 rounded-full shadow-lg shadow-maroon-900/25 border border-maroon-700">
            <Sparkles size={12} className="text-gold-300" />
            <span className="text-[10px] font-bold text-white tracking-[0.18em] uppercase">
              Welcome to St. Mary's
            </span>
            <div className="w-px h-3.5 bg-gold-400/30" />
            <span className="flex items-center gap-1.5 text-[9px] font-semibold text-white tracking-wider">
              <Rocket size={11} />
              Since 1924
            </span>
          </div>
        </motion.div>

        <div className="relative flex-1 flex flex-col justify-center">
          {/* Heading - Premium Design */}
          <motion.div variants={itemVariants} className="mb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-0.5 bg-gold-400 rounded-full" />
              <span className="text-[10px] font-bold text-gold-600 tracking-[0.2em] uppercase flex items-center gap-1.5">
                <Compass size={12} className="text-gold-500" />
                Your Journey Begins Here
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]">
              <span className="text-maroon-900">Start Your</span>
              <br />
              <span className="inline-block mt-0.5 text-gold-600 text-3xl md:text-4xl lg:text-5xl font-bold">
                Golden Journey
              </span>
            </h2>
          </motion.div>

          {/* Description - Well Balanced */}
          <motion.p 
            variants={itemVariants} 
            className="text-gray-700 text-sm md:text-base mt-2 leading-relaxed max-w-lg"
          >
            Where every student discovers their potential, builds character, 
            and achieves excellence. Join us for a transformative educational journey.
          </motion.p>

          {/* Stats Row - Premium Design */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4">
            {[
              { icon: <Crown size={14} />, label: '100+ Years Legacy', color: 'text-maroon-600', bg: 'bg-maroon-50' },
              { icon: <Gem size={14} />, label: 'Class KG-12', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: <Star size={14} />, label: '2026-27 Session', color: 'text-gold-600', bg: 'bg-gold-50' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 text-xs">
                <div className={`p-1.5 rounded-lg ${item.bg} border border-${item.color.split('-')[1]}-100/30`}>
                  <span className={item.color}>{item.icon}</span>
                </div>
                <span className="font-semibold text-gray-700 text-xs">{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons - Solid Colors */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mt-5">
            <a
              href="/admissions"
              className="group relative inline-flex items-center gap-2 text-white px-7 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-maroon-800 hover:bg-maroon-800 border border-maroon-600"
            >
              <Rocket size={16} />
              Begin Your Journey
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            <a
              href="/about/founders"
              className="group inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-white hover:bg-maroon-50 shadow-md hover:shadow-lg hover:-translate-y-0.5 border-2 border-maroon-200/50 hover:border-maroon-300/80 text-maroon-700"
            >
              <Shield size={16} />
              Discover Our Heritage
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>

          {/* Quick Links - Solid Colors */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 mt-4 pt-4 border-t border-dashed border-maroon-100/50">
            {/* <a
              href="/admissions"
              className="group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-semibold text-xs tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-white bg-emerald-500 hover:bg-emerald-600"
            >
              <TrendingUp size={13} />
              Admissions 2025-26
              <span className="bg-white/30 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                Hot
              </span>
            </a> */}

            <a
              href="/academics/syllabus"
              className="group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-semibold text-xs tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-white bg-blue-500 hover:bg-blue-600"
            >
              <BookOpen size={13} />
              Download Syllabus
            </a>

            <a
              href="/gallery"
              className="group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-semibold text-xs tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-white bg-purple-500 hover:bg-purple-600"
            >
              <Award size={13} />
              Explore Gallery
            </a>
          </motion.div>
        </div>

        {/* Bottom Border - Solid Gold */}
        <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gold-400/30 rounded-full" />

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
          }
          .animate-pulse {
            animation: pulse 3s ease-in-out infinite;
          }
        `}</style>
      </motion.div>
    </SectionWrapper>
  )
}

export default WelcomeSection