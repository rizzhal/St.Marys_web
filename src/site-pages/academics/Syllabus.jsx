'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../../components/common/SectionWrapper.jsx'
import { getSyllabus, getAcademicYears, getSyllabusClasses, getSyllabusStreams, getFileUrl } from '../../services/api.js'
import { FileText, Loader, Calendar, GraduationCap, Download, Eye, BookOpen } from 'lucide-react'

const SyllabusPublic = () => {
  const [syllabus, setSyllabus] = useState([])
  const [loading, setLoading] = useState(true)
  const [academicYears, setAcademicYears] = useState([])
  const [classes, setClasses] = useState([])
  const [streams, setStreams] = useState([])
  
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedStream, setSelectedStream] = useState('')

  const classOptions = ['KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  const streamOptions = [
    { value: 'arts', label: 'Arts' },
    { value: 'science', label: 'Science' },
    { value: 'commerce', label: 'Commerce' }
  ]

  useEffect(() => {
    fetchAcademicYears()
  }, [])

  useEffect(() => {
    if (selectedYear) {
      fetchClasses(selectedYear)
    }
  }, [selectedYear])

  useEffect(() => {
    if (selectedClass && ['11', '12'].includes(selectedClass)) {
      fetchStreams(selectedClass)
    } else {
      setStreams([])
      setSelectedStream('')
    }
  }, [selectedClass])

  useEffect(() => {
    if (selectedYear) {
      fetchSyllabus()
    }
  }, [selectedYear, selectedClass, selectedStream])

  const fetchAcademicYears = async () => {
    try {
      const data = await getAcademicYears()
      setAcademicYears(data)
      if (data.length > 0) setSelectedYear(data[0])
    } catch (err) {
      console.error('Failed to fetch academic years:', err)
    }
  }

  const fetchClasses = async (year) => {
    try {
      const data = await getSyllabusClasses(year)
      setClasses(data)
      if (data.length > 0) setSelectedClass(data[0])
    } catch (err) {
      console.error('Failed to fetch classes:', err)
    }
  }

  const fetchStreams = async (classNum) => {
    try {
      const data = await getSyllabusStreams(classNum)
      setStreams(data)
      if (data.length > 0) setSelectedStream(data[0])
    } catch (err) {
      console.error('Failed to fetch streams:', err)
    }
  }

  const fetchSyllabus = async () => {
    try {
      setLoading(true)
      const data = await getSyllabus(
        selectedClass || null,
        selectedYear,
        ['11', '12'].includes(selectedClass) ? selectedStream : null
      )
      setSyllabus(data)
    } catch (err) {
      console.error('Failed to fetch syllabus:', err)
    } finally {
      setLoading(false)
    }
  }

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-maroon-800 h-[30vh] min-h-[220px] max-h-[280px]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-300 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[80px] md:text-[120px] font-serif font-bold text-white/5 tracking-[0.3em] select-none">
            SYLLABUS
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
              <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Curriculum</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
            >
              Our <span className="text-gold-400">Syllabus</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-sm mt-1"
            >
              Class-wise curriculum overview
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500/50" />
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-gray-100 bg-gray-50/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                <Calendar size={16} className="text-gold-500" />
                Academic Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent text-gray-700"
              >
                {academicYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                <GraduationCap size={16} className="text-gold-500" />
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent text-gray-700"
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>Class {cls}</option>
                ))}
              </select>
            </div>

            {['11', '12'].includes(selectedClass) && streams.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                  <FileText size={16} className="text-gold-500" />
                  Stream
                </label>
                <select
                  value={selectedStream}
                  onChange={(e) => setSelectedStream(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent text-gray-700"
                >
                  {streamOptions.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Syllabus List */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader size={40} className="animate-spin text-maroon-700" />
            </div>
          ) : syllabus.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
              <FileText size={56} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-serif font-semibold text-gray-600">No syllabus found</h3>
              <p className="text-gray-400 text-sm mt-2">
                No syllabus available for {selectedYear} - Class {selectedClass}
                {['11', '12'].includes(selectedClass) && ` - ${selectedStream}`}
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-maroon-700">{syllabus.length}</span> syllabus entries
                </p>
                <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                  {selectedYear} · Class {selectedClass}
                  {['11', '12'].includes(selectedClass) && ` · ${selectedStream}`}
                </span>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {syllabus.map((item) => (
                  <motion.div
                    key={item._id}
                    variants={cardVariants}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-gold-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-maroon-100 text-maroon-800 text-xs px-3 py-1 rounded-full font-semibold">
                            Class {item.class}
                          </span>
                          {item.stream && item.stream !== 'general' && (
                            <span className="bg-gold-100 text-gold-700 text-xs px-3 py-1 rounded-full font-medium capitalize">
                              {item.stream}
                            </span>
                          )}
                        </div>
                        <div className="mt-3">
                          <a
                            href={getFileUrl(item.fileUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-maroon-800 hover:bg-maroon-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            <Eye size={16} />
                            View PDF
                            <Download size={14} className="ml-1" />
                          </a>
                        </div>
                        <p className="text-gray-400 text-xs mt-2">
                          Uploaded: {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default SyllabusPublic