'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../components/common/SectionWrapper.jsx'
import { Shield, Bell, Users, BookOpen, Clock, HeartHandshake, Sparkles, Crown } from 'lucide-react'

const StudentRules = () => {
  const rules = [
    {
      icon: <Shield size={28} />,
      title: 'Discipline',
      rules: [
        'Students must maintain discipline at all times within the school premises.',
        'Respect all teachers, staff, and fellow students.',
        'School property must be treated with care and respect.',
        'Any form of bullying, harassment, or discrimination is strictly prohibited.'
      ]
    },
    {
      icon: <Bell size={28} />,
      title: 'Attendance & Punctuality',
      rules: [
        'Students must arrive at school by 8:00 AM sharp.',
        'Attendance of at least 75% is mandatory for promotion.',
        'Leave applications must be submitted in advance for planned absences.',
        'Medical certificates required for absences of more than 3 days.'
      ]
    },
    {
      icon: <BookOpen size={28} />,
      title: 'Academic Conduct',
      rules: [
        'Homework and assignments must be submitted on time.',
        'Academic integrity is paramount - no cheating or plagiarism.',
        'Students must bring all required textbooks and materials to class.',
        'Active participation in classroom activities is encouraged.'
      ]
    },
    {
      icon: <Users size={28} />,
      title: 'School Uniform & Appearance',
      rules: [
        'Prescribed school uniform must be worn on all school days.',
        'Students must maintain clean and neat appearance.',
        'Hair should be neatly combed and properly styled.',
        'No jewelry or accessories beyond the permitted items.'
      ]
    },
    {
      icon: <Clock size={28} />,
      title: 'School Hours & Behavior',
      rules: [
        'School hours are from 8:00 AM to 3:00 PM.',
        'Students must not leave the school premises without permission.',
        'Mobile phones and electronic devices are strictly prohibited.',
        'Lunch breaks should be used responsibly.'
      ]
    },
    {
      icon: <HeartHandshake size={28} />,
      title: 'Values & Ethics',
      rules: [
        'Practice honesty, kindness, and empathy in daily interactions.',
        'Respect cultural and religious diversity of all students.',
        'Maintain cleanliness in all areas of the school.',
        'Participate actively in community service activities.'
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
            RULES
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
              <Shield size={18} className="text-gold-400" />
              <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Guidelines</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
            >
              Student <span className="text-gold-400">Rules</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-sm mt-1"
            >
              Guidelines for a disciplined and enriching school life
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
              <Crown size={14} className="text-maroon-700" />
              <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">School Guidelines</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our school rules are designed to create a safe, respectful, and conducive
              learning environment where every student can thrive academically and personally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== RULES GRID ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:border-gold-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="bg-maroon-50 text-maroon-700 p-3 rounded-lg flex-shrink-0 group-hover:bg-maroon-100 group-hover:text-maroon-800 transition-all duration-300 group-hover:shadow-md">
                        {rule.icon}
                      </div>
                      <div className="absolute -inset-1 bg-gold-400/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-maroon-800 text-xl mb-3 group-hover:text-gold-700 transition-colors duration-300">
                        {rule.title}
                      </h3>
                      <ul className="space-y-2">
                        {rule.rules.map((item, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                            <span className="text-gold-500 font-bold group-hover:text-gold-600 transition-colors">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Decorative Bottom Accent */}
                  <div className="mt-4 pt-3 border-t border-gray-100 group-hover:border-gold-200 transition-colors duration-300">
                    <div className="h-0.5 w-0 bg-gradient-to-r from-gold-400 to-gold-500 group-hover:w-full transition-all duration-700" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <SectionWrapper className="mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-maroon-800 to-maroon-900 text-white rounded-2xl p-8 md:p-10 text-center border border-maroon-700 shadow-xl"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles size={20} className="text-gold-400" />
                <span className="text-xs font-semibold text-gold-400 tracking-widest uppercase">Core Values</span>
                <Sparkles size={20} className="text-gold-400" />
              </div>
              <h3 className="font-serif font-bold text-2xl md:text-3xl mb-3 text-gold-300">Remember</h3>
              <p className="text-white/80 max-w-2xl mx-auto text-base leading-relaxed">
                These rules are not just about maintaining discipline - they are about building
                character, fostering respect, and creating a community where everyone can succeed.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-white/50">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  Respect
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  Discipline
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  Integrity
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  Excellence
                </span>
              </div>
            </motion.div>
          </SectionWrapper>
        </div>
      </section>
    </div>
  )
}

export default StudentRules