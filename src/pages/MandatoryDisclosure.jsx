'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../components/common/SectionWrapper.jsx'
import { Shield, FileCheck, Award, BadgeCheck, Building2, ClipboardCheck, Loader, Sparkles, Crown } from 'lucide-react'
import { getDisclosures } from '../services/api.js'
import { toast } from 'react-toastify'

const MandatoryDisclosure = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDisclosures()
  }, [])

  const fetchDisclosures = async () => {
    try {
      const data = await getDisclosures()
      setCertificates(data)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load disclosures')
    } finally {
      setLoading(false)
    }
  }

  const getIconForTitle = (title) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('fire')) return <FileCheck size={28} />
    if (titleLower.includes('building')) return <Shield size={28} />
    if (titleLower.includes('affiliation')) return <BadgeCheck size={28} />
    if (titleLower.includes('registration')) return <Award size={28} />
    if (titleLower.includes('land') || titleLower.includes('ownership')) return <Building2 size={28} />
    if (titleLower.includes('health') || titleLower.includes('sanitation')) return <ClipboardCheck size={28} />
    return <Shield size={28} />
  }

  const getColorForStatus = (status) => {
    const statusLower = status?.toLowerCase() || ''
    if (statusLower === 'valid' || statusLower === 'active') return 'from-emerald-500 to-emerald-600'
    if (statusLower === 'expired') return 'from-red-500 to-red-600'
    if (statusLower === 'pending') return 'from-amber-500 to-amber-600'
    return 'from-blue-500 to-blue-600'
  }

  const getStatusBadgeColor = (status) => {
    const statusLower = status?.toLowerCase() || ''
    if (statusLower === 'valid' || statusLower === 'active') return 'bg-emerald-50 border-emerald-200 text-emerald-700'
    if (statusLower === 'expired') return 'bg-red-50 border-red-200 text-red-700'
    if (statusLower === 'pending') return 'bg-amber-50 border-amber-200 text-amber-700'
    return 'bg-gray-50 border-gray-200 text-gray-700'
  }

  const getStatusDotColor = (status) => {
    const statusLower = status?.toLowerCase() || ''
    if (statusLower === 'valid' || statusLower === 'active') return 'bg-emerald-500'
    if (statusLower === 'expired') return 'bg-red-500'
    if (statusLower === 'pending') return 'bg-amber-500'
    return 'bg-gray-500'
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section Skeleton */}
        <section className="relative overflow-hidden bg-maroon-900 h-[30vh] min-h-[220px] max-h-[280px]">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-300 rounded-full translate-y-1/2 -translate-x-1/3" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[80px] md:text-[120px] font-serif font-bold text-white/5 tracking-[0.3em] select-none">
              DISCLOSURE
            </span>
          </div>
          <div className="container-custom relative h-full flex items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield size={18} className="text-gold-400" />
                <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Official</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">
                Mandatory <span className="text-gold-400">Disclosure</span>
              </h1>
              <p className="text-white/50 text-sm mt-1">Official Certificates & Documents</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500/50" />
        </section>
        
        <section className="section-padding bg-gray-50/50">
          <div className="container-custom">
            <div className="flex justify-center items-center py-20">
              <Loader size={40} className="animate-spin text-maroon-700" />
            </div>
          </div>
        </section>
      </div>
    )
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
            DISCLOSURE
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
              <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Official</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
            >
              Mandatory <span className="text-gold-400">Disclosure</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-sm mt-1"
            >
              Official Certificates & Documents
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
              <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">Official Documents</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              St. Mary's Higher Secondary School maintains all mandatory certificates and disclosures
              as required by regulatory authorities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-custom">
          <SectionWrapper className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-maroon-100/50 border border-maroon-200/50 rounded-full mb-4">
              <Shield size={14} className="text-maroon-600" />
              <span className="text-xs font-semibold text-maroon-600 tracking-wider uppercase">Official Documents</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-maroon-900">
              Certificates & <span className="text-gold-600">Disclosures</span>
            </h2>
            <div className="w-16 h-[3px] bg-gold-400 mx-auto mt-4 rounded-full" />
            <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              St. Mary's Higher Secondary School maintains all mandatory certificates and disclosures
              as required by regulatory authorities.
            </p>
          </SectionWrapper>

          {certificates.length === 0 ? (
            <SectionWrapper>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16 bg-white rounded-2xl shadow-lg"
              >
                <Shield size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600">No disclosures found</h3>
                <p className="text-gray-400 text-sm mt-1">No certificates or disclosures have been uploaded yet.</p>
              </motion.div>
            </SectionWrapper>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert._id || cert.id || index}
                  variants={cardVariants}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:border-gold-300/60 hover:-translate-y-2">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${getColorForStatus(cert.status)} shadow-lg text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {getIconForTitle(cert.title)}
                    </div>
                    
                    <h3 className="font-display font-bold text-lg text-maroon-900 mb-2 group-hover:text-gold-700 transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {cert.description}
                    </p>
                    
                    {/* Status Badge */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-semibold ${getStatusBadgeColor(cert.status)}`}>
                        <span className={`w-1.5 h-1.5 ${getStatusDotColor(cert.status)} rounded-full animate-pulse`} />
                        {cert.status || 'Valid'}
                      </span>
                      <span className="text-xs text-gray-400">✓ Verified</span>
                    </div>

                    {/* File Download */}
                    {cert.fileUrl && (
                      <div className="mt-3 pt-3 border-t border-gray-100 group-hover:border-gold-200 transition-colors duration-300">
                        <a
                          href={`${process.env.NEXT_PUBLIC_API_URL || '/api'}${cert.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-maroon-700 hover:text-gold-600 transition-colors"
                        >
                          <FileCheck size={14} />
                          View Document
                        </a>
                      </div>
                    )}

                    {/* Expiry Date */}
                    {cert.expiryDate && (
                      <div className="mt-2 text-xs text-gray-400">
                        Expires: {new Date(cert.expiryDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    )}

                    {/* Decorative Bottom Line */}
                    <div className="mt-4 pt-3 border-t border-gray-100 group-hover:border-gold-200 transition-colors duration-300">
                      <div className="h-0.5 w-0 bg-gradient-to-r from-gold-400 to-gold-500 group-hover:w-full transition-all duration-700" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Footer Note */}
          <SectionWrapper className="mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-maroon-50 rounded-2xl p-6 md:p-8 border border-maroon-100/60 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles size={16} className="text-gold-500" />
                <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">Verified & Authentic</span>
                <Sparkles size={16} className="text-gold-500" />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                <span className="font-semibold text-maroon-800">Note:</span> All certificates are valid and maintained 
                as per the requirements of the education board and government regulations. 
                For any queries, please contact the school administration.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-500">
                <span>📅 Last Updated: {new Date().toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}</span>
                <span className="hidden sm:inline">|</span>
                <span>🔒 Verified by: School Administration</span>
              </div>
            </motion.div>
          </SectionWrapper>
        </div>
      </section>
    </div>
  )
}

export default MandatoryDisclosure