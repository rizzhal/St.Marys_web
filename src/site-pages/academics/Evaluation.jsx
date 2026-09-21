'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../../components/common/SectionWrapper.jsx'
import Accordion from '../../components/common/Accordion.jsx'
import { ClipboardCheck, BookOpen, GraduationCap, BarChart, Award, Calendar, Sparkles } from 'lucide-react'

const Evaluation = () => {
  const evaluationDetails = [
    {
      title: 'Continuous Assessment (CA)',
      content: 'Contineous assessment consists of various projects assignment and co-curricular activities taken part by the student throughout the academic year'
    },
    {
      title: 'Unit-Test-One',
      content: 'The unit test one examination is conducted in the month of june out of 50 marks.'
    },
    {
      title: 'Half yearly examination',
      content: 'The half yearly examination is conducted in the month of September/October. The examination is being conducted out of 100 marks.'
    },
    {
      title: 'Unit-test-two',
      content: 'The unit test one examination is conducted in the month of December out of 50 marks.'
    },
    {
      title: 'Annual examination',
      content: 'The Annual examination is conducted in the month of mid Feb to march , out of 100 marks'
    }
  ]

  const assessmentTypes = [
    {
      title: 'Formative Assessment',
      description: 'Conducted throughout the academic session through observations, worksheets, quizzes, and class activities to monitor day-to-day learning progress.'
    },
    {
      title: 'Summative Assessment',
      description: 'End-term evaluations that test the cumulative knowledge and understanding of the subjects covered during the academic period.'
    },
    {
      title: 'Practical Assessment',
      description: 'For subjects like Science, Computer Science, and AI, practical assessments evaluate hands-on skills, experimentation, and application of concepts.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-maroon-900 h-[30vh] min-h-55 max-h-70">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-300 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>

        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[80px] md:text-[120px] font-serif font-bold text-white/5 tracking-[0.3em] select-none">
            EVALUATION
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
              <ClipboardCheck size={18} className="text-gold-400" />
              <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Assessment</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
            >
              Evaluation of <span className="text-gold-400">Examination</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-sm mt-1"
            >
              Understanding our assessment system
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
              <BarChart size={14} className="text-maroon-700" />
              <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">Assessment System</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              At St. Mary's, we follow a comprehensive evaluation system designed to assess
              students' knowledge, understanding, and application skills effectively.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {assessmentTypes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:border-gold-300 group">
                  <div className="w-12 h-12 rounded-full bg-maroon-100 flex items-center justify-center mx-auto mb-3 group-hover:bg-maroon-200 transition-colors">
                    {index === 0 && <BookOpen size={22} className="text-maroon-700" />}
                    {index === 1 && <GraduationCap size={22} className="text-maroon-700" />}
                    {index === 2 && <ClipboardCheck size={22} className="text-maroon-700" />}
                  </div>
                  <h3 className="font-serif font-bold text-maroon-800 text-xl group-hover:text-gold-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <SectionWrapper>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:border-gold-200 transition-all duration-300"
            >
              <h2 className="text-2xl font-serif font-bold text-maroon-800 mb-6 flex items-center gap-2">
                <Award size={24} className="text-gold-500" />
                Detailed Evaluation Structure
              </h2>
              <Accordion items={evaluationDetails} />
            </motion.div>
          </SectionWrapper>

          <SectionWrapper className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-maroon-50 rounded-xl p-8 border border-maroon-100"
            >
              <h3 className="font-serif font-bold text-maroon-800 text-xl text-center flex items-center justify-center gap-2">
                <BarChart size={24} className="text-gold-500" />
                Assessment Weightage Distribution
              </h3>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:border-gold-300 border-2 border-transparent">
                  <div className="text-3xl font-bold text-maroon-700">20%</div>
                  <p className="text-sm text-gray-600 font-medium">Continuous Assessment</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:border-gold-300 border-2 border-transparent">
                  <div className="text-3xl font-bold text-maroon-700">30%</div>
                  <p className="text-sm text-gray-600 font-medium">Half-Yearly</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:border-gold-300 border-2 border-transparent">
                  <div className="text-3xl font-bold text-maroon-700">50%</div>
                  <p className="text-sm text-gray-600 font-medium">Annual Examination</p>
                </div>
                <div className="bg-linear-to-r from-gold-500 to-gold-600 rounded-lg p-4 text-center shadow-sm border-2 border-gold-400 hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-black">100%</div>
                  <p className="text-m text-black font-medium">Total Marks</p>
                </div>
              </div>
            </motion.div>
          </SectionWrapper>
        </div>
      </section>
    </div>
  )
}

export default Evaluation