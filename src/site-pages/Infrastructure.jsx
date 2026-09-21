'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../components/common/SectionWrapper.jsx'
import { 
  Building2, Library, Microscope, Code2, Users, 
  Trophy, BookOpen, Monitor, ArrowRight,
  Wifi, Coffee, Shield, Sun, Wind, Clock, Award, Star, Crown , Theater
} from 'lucide-react'

const Infrastructure = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const facilities = [
    {
      icon: <Building2 size={28} />,
      title: 'Modern Classrooms',
      description: 'Spacious, well-ventilated classrooms equipped with smart boards and modern teaching aids for an enhanced learning experience.',
      tag: 'Smart Learning',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      icon: <Library size={28} />,
      title: 'Library',
      description: 'A well-stocked library with thousands of books, reference materials, and digital resources to support academic excellence.',
      tag: 'Knowledge Hub',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconColor: 'text-emerald-600'
    },
    {
      icon: <Microscope size={28} />,
      title: 'Science Laboratories',
      description: 'State-of-the-art laboratories for Physics, Chemistry, and Biology with modern equipment for hands-on learning.',
      tag: 'Innovation',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      icon: <Code2 size={28} />,
      title: 'Computer Labs',
      description: 'Fully equipped computer labs with high-speed internet, latest software, and programming tools for computer science education.',
      tag: 'Digital Ready',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconColor: 'text-orange-600'
    },
    {
      icon: <Monitor size={28} />,
      title: 'Smart Classrooms',
      description: 'Technology-enabled classrooms with interactive displays, digital content, and audio-visual facilities for engaging lessons.',
      tag: 'Tech Enabled',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      iconColor: 'text-cyan-600'
    },
    {
      icon: <Users size={28} />,
      title: 'Activity Rooms',
      description: 'Dedicated rooms for various activities including arts and crafts, music, dance, and debate to nurture creative talents.',
      tag: 'Creative Space',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      iconColor: 'text-pink-600'
    },
    {
      icon: <Trophy size={28} />,
      title: 'Sports Facilities',
      description: 'Extensive sports facilities including playgrounds, courts, and indoor sports facilities for holistic physical development.',
      tag: 'Sports Excellence',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconColor: 'text-amber-600'
    },
    {
      icon: <Theater size={28} />,
      title: 'Auditorium',
      description: 'A well equipped set up stage for our students to explore and display their potential with great enthusiasm.',
      tag: 'Hall area',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      iconColor: 'text-indigo-600'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const iconVariants = {
    hover: {
      scale: 1.15,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
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
            CAMPUS
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
              <Building2 size={18} className="text-gold-400" />
              <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Our Campus</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
            >
              Our <span className="text-gold-400">Infrastructure</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-sm mt-1"
            >
              State-of-the-art facilities for holistic education
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
              <Building2 size={14} className="text-maroon-700" />
              <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">Our Campus</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              St. Mary's Higher Secondary School boasts modern infrastructure designed to provide
              students with the best possible environment for learning and personal growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FACILITIES GRID ===== */}
      <section className="section-padding bg-white pb-24">
        <div className="container-custom">
          {/* Section Title */}
          <SectionWrapper>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-maroon-800 mb-4">
                World-Class <span className="text-gold-600">Infrastructure</span>
              </h2>
              <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
            </div>
          </SectionWrapper>

          {/* Facilities Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Decorative Top Bar */}
                <div className={`h-1 w-full ${facility.bgColor} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`} />

                {/* Content */}
                <div className="p-6 text-center">
                  {/* Icon with Premium Effect */}
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className={`relative inline-flex p-4 rounded-2xl ${facility.bgColor} border ${facility.borderColor} mb-4 group-hover:shadow-lg transition-all duration-300`}
                  >
                    <span className={facility.iconColor}>{facility.icon}</span>
                  </motion.div>

                  {/* Tag */}
                  <div className="inline-block px-3 py-0.5 bg-gray-100 rounded-full text-[10px] font-semibold text-gray-500 mb-2 group-hover:bg-maroon-50 group-hover:text-maroon-700 transition-all duration-300">
                    {facility.tag}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-semibold text-lg text-maroon-800 mb-2 group-hover:text-maroon-700 transition-colors duration-300">
                    {facility.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {facility.description}
                  </p>

                  {/* Learn More Link - Appears on Hover */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-maroon-700">
                      Learn More
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Bottom Decorative Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${facility.bgColor} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right`} />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Decorative Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-block px-6 py-3 bg-maroon-50 border border-maroon-200 rounded-2xl">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-maroon-800">8+</span> World-Class Facilities 
                <span className="hidden sm:inline"> | </span>
                <br className="sm:hidden" />
                <span className="font-semibold text-maroon-800">24/7</span> Access 
                <span className="hidden sm:inline"> | </span>
                <br className="sm:hidden" />
                <span className="font-semibold text-maroon-800">100%</span> Student Satisfaction
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .font-serif {
          font-family: 'Fraunces', Georgia, serif;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default Infrastructure