'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionWrapper from '../../components/common/SectionWrapper.jsx'
import { Phone, Mail, Calendar, User, Calendar as CalendarIcon, Users, BookOpen, MapPin, Send, Sparkles, GraduationCap } from 'lucide-react'

const AdmissionInquiry = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    gender: '',
    board: '',
    grade: '',
    academicYear: '',
    currentSchool: '',
    fatherName: '',
    motherName: '',
    contactNo: '',
    email: '',
    address: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSuccess(true)
    setFormData({
      studentName: '',
      dateOfBirth: '',
      gender: '',
      board: '',
      grade: '',
      academicYear: '',
      currentSchool: '',
      fatherName: '',
      motherName: '',
      contactNo: '',
      email: '',
      address: ''
    })
    setTimeout(() => setSuccess(false), 5000)
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
            INQUIRY
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
              <GraduationCap size={18} className="text-gold-400" />
              <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Begin Your Journey</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
            >
              Admission <span className="text-gold-400">Inquiry</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-sm mt-1"
            >
              Your journey begins here
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
              <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">Enquiry Form</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Fill in the details below and our admissions team will get back to you within 24 hours.
              We're here to help you take the first step towards a brighter future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <SectionWrapper>
                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-0.5 bg-gold-400" />
                    <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">Enquiry Form</span>
                    <Sparkles size={14} className="text-gold-500 ml-auto" />
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-maroon-800 mb-2">
                    Admission <span className="text-gold-600">Enquiry</span>
                  </h2>
                  <div className="w-16 h-0.5 bg-gold-400 mb-4" />
                  <p className="text-gray-500 text-sm mb-6">
                    Fill in the details below and our admissions team will get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Student Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Student Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold-600 transition-colors" />
                        <input
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all text-sm sm:text-base hover:border-gold-300"
                          placeholder="Enter student's full name"
                        />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <CalendarIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold-600 transition-colors" />
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all text-sm sm:text-base hover:border-gold-300"
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleChange}
                            className="w-4 h-4 text-maroon-600 focus:ring-maroon-500 border-gray-300"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-maroon-700 transition-colors">Male</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleChange}
                            className="w-4 h-4 text-maroon-600 focus:ring-maroon-500 border-gray-300"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-maroon-700 transition-colors">Female</span>
                        </label>
                      </div>
                    </div>

                    {/* Choice of Board */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Choice of Board
                      </label>
                      <div className="relative group">
                        <BookOpen size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold-600 transition-colors" />
                        <select
                          name="board"
                          value={formData.board}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all appearance-none text-sm sm:text-base hover:border-gold-300"
                        >
                          <option value="">Select Board</option>
                          <option value="cbse">CBSE</option>
                          <option value="seba">SEBA</option>
                          <option value="icse">ICSE</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Admission into Grade */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Admission into (Grade) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold-600 transition-colors" />
                        <select
                          name="grade"
                          value={formData.grade}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all appearance-none text-sm sm:text-base hover:border-gold-300"
                        >
                          <option value="">Select Grade</option>
                          <option value="5">Class 5</option>
                          <option value="6">Class 6</option>
                          <option value="7">Class 7</option>
                          <option value="8">Class 8</option>
                          <option value="9">Class 9</option>
                          <option value="10">Class 10</option>
                        </select>
                      </div>
                    </div>

                    {/* Academic Year */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Academic Year
                      </label>
                      <div className="relative group">
                        <CalendarIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold-600 transition-colors" />
                        <select
                          name="academicYear"
                          value={formData.academicYear}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all appearance-none text-sm sm:text-base hover:border-gold-300"
                        >
                          <option value="">Select Academic Year</option>
                          <option value="2025-26">2025-26</option>
                          <option value="2026-27">2026-27</option>
                        </select>
                      </div>
                    </div>

                    {/* School Currently studying in */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        School Currently studying in (with the curriculum)
                      </label>
                      <div className="relative group">
                        <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold-600 transition-colors" />
                        <input
                          type="text"
                          name="currentSchool"
                          value={formData.currentSchool}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all text-sm sm:text-base hover:border-gold-300"
                          placeholder="Enter current school name"
                        />
                      </div>
                    </div>

                    {/* Contact Details Section */}
                    <div className="pt-4 border-t-2 border-maroon-200/50">
                      <h3 className="font-serif font-semibold text-lg text-maroon-800 mb-4 flex items-center gap-2">
                        <span className="w-8 h-0.5 bg-gold-400" />
                        Contact Details
                      </h3>

                      {/* Father's Name */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Father's Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fatherName"
                          value={formData.fatherName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all text-sm sm:text-base hover:border-gold-300"
                          placeholder="Enter father's full name"
                        />
                      </div>

                      {/* Mother's Name */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Mother's Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="motherName"
                          value={formData.motherName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all text-sm sm:text-base hover:border-gold-300"
                          placeholder="Enter mother's full name"
                        />
                      </div>

                      {/* Contact No */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Contact No. <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                          <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold-600 transition-colors" />
                          <input
                            type="tel"
                            name="contactNo"
                            value={formData.contactNo}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all text-sm sm:text-base hover:border-gold-300"
                            placeholder="Enter contact number"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          E-mail <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                          <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold-600 transition-colors" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all text-sm sm:text-base hover:border-gold-300"
                            placeholder="Enter email address"
                          />
                        </div>
                      </div>

                      {/* Correspondence Address */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Correspondence Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          rows="3"
                          className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all resize-none text-sm sm:text-base hover:border-gold-300"
                          placeholder="Enter complete correspondence address"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 bg-maroon-800 hover:bg-maroon-900 text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm sm:text-base border-2 border-maroon-700"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Submit Enquiry</span>
                        </>
                      )}
                    </button>

                    {success && (
                      <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm">
                        ✅ Thank you for your enquiry! Our admissions team will get back to you within 24 hours.
                      </div>
                    )}
                  </form>
                </div>
              </SectionWrapper>
            </div>

            {/* Right Column - Contact Info */}
            <div className="lg:col-span-1">
              <SectionWrapper>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg">
                    <h3 className="font-serif font-bold text-xl text-maroon-800 mb-4 flex items-center gap-2">
                      <span className="w-6 h-0.5 bg-gold-400" />
                      Admission Office
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      Visit our admission office for a campus tour and to learn more about the
                      admission process in detail.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-600 group hover:bg-maroon-50 p-2 rounded-xl transition-colors">
                        <div className="p-2 bg-maroon-100 rounded-lg flex-shrink-0 group-hover:bg-maroon-200 transition-colors">
                          <Phone size={16} className="text-maroon-700" />
                        </div>
                        <span className="text-sm">+91 9435190537</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 group hover:bg-maroon-50 p-2 rounded-xl transition-colors">
                        <div className="p-2 bg-maroon-100 rounded-lg flex-shrink-0 group-hover:bg-maroon-200 transition-colors">
                          <Mail size={16} className="text-maroon-700" />
                        </div>
                        <span className="text-sm break-all">stmarysghy1924@yahoo.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 group hover:bg-maroon-50 p-2 rounded-xl transition-colors">
                        <div className="p-2 bg-maroon-100 rounded-lg flex-shrink-0 group-hover:bg-maroon-200 transition-colors">
                          <CalendarIcon size={16} className="text-maroon-700" />
                        </div>
                        <span className="text-sm">Mon-Sat: 7:45 AM - 2:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-maroon-50 border border-maroon-200 rounded-2xl p-4 sm:p-6 shadow-lg">
                    <h4 className="font-serif font-bold text-maroon-800 text-lg mb-4 flex items-center gap-2">
                      <span className="w-6 h-0.5 bg-gold-400" />
                      Important Dates
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-maroon-200 gap-1">
                        <span className="text-gray-600">Application Form Available For KG</span>
                        <span className="font-medium text-maroon-800 bg-white px-2 py-0.5 rounded">August/September</span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-maroon-200 gap-1">
                        <span className="text-gray-600">Last Date of Submission</span>
                        <Link href="/#latest-notices" className="font-medium text-maroon-700 bg-white px-2 py-0.5 rounded hover:text-maroon-900 underline underline-offset-2 transition-colors">
                          Check for updates
                        </Link>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-maroon-200 gap-1">
                        <span className="text-gray-600">Entrance dates</span>
                        <Link href="/#latest-notices" className="font-medium text-maroon-700 bg-white px-2 py-0.5 rounded hover:text-maroon-900 underline underline-offset-2 transition-colors">
                          Check for updates
                        </Link>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span className="text-gray-600">Admission List</span>
                        <Link href="/#latest-notices" className="font-medium text-maroon-700 bg-white px-2 py-0.5 rounded hover:text-maroon-900 underline underline-offset-2 transition-colors">
                          Check for updates
                        </Link>
                      </li>
                    </ul>
                  </div>

                  




                  <div className="bg-maroon-800 rounded-2xl p-4 sm:p-6 text-center shadow-lg text-white">
                    <div className="text-4xl mb-2">📞</div>
                    <p className="text-sm text-maroon-200">For immediate assistance</p>
                    <p className="font-bold text-gold-300 text-base sm:text-lg">+91-94351-90537</p>
                    <div className="mt-3 pt-3 border-t border-maroon-700">
                      <p className="text-xs text-maroon-300">Available 24/7</p>
                    </div>
                  </div>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdmissionInquiry