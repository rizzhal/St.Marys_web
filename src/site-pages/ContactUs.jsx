'use client'

import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Heart, MessageCircle, Headphones, Globe, Building2, Loader, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import SectionWrapper from '../components/common/SectionWrapper.jsx'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Thank you for your message! We will get back to you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (err) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <MapPin size={22} />,
      title: 'Visit Us',
      details: "St. Mary's Higher Secondary School\nM.C.Road, Chenikuthi\nGuwahati - 781003",
      color: 'text-maroon-700',
      bg: 'bg-maroon-50',
      border: 'border-maroon-100'
    },
    {
      icon: <Phone size={22} />,
      title: 'Call Us',
      details: '+91 9435190537',
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      icon: <Mail size={22} />,
      title: 'Email Us',
      details: 'stmarysghy1924@yahoo.com',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      icon: <Clock size={22} />,
      title: 'Office Hours',
      details: 'Monday - Saturday\n7:45 AM - 2:00 PM',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-100'
    }
  ]

  const socialLinks = [
    { icon: <Globe size={18} />, label: 'Website', color: 'hover:bg-gray-100' },
    { icon: <MessageCircle size={18} />, label: 'WhatsApp', color: 'hover:bg-green-50 hover:text-green-600' },
    { icon: <Send size={18} />, label: 'Telegram', color: 'hover:bg-blue-50 hover:text-blue-600' },
    { icon: <Headphones size={18} />, label: 'Support', color: 'hover:bg-purple-50 hover:text-purple-600' }
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
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
            CONTACT
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
              <Phone size={18} className="text-gold-400" />
              <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Reach Out</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
            >
              Contact <span className="text-gold-400">Us</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-sm mt-1"
            >
              Get in touch with us
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
              <Heart size={14} className="text-maroon-700" />
              <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">We'd Love to Hear From You</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Have questions about admissions, academics, or anything else?
              We'd love to hear from you. Fill out the form and we'll get back to you soon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left Side - Contact Form - 3/5 */}
            <div className="lg:col-span-3">
              <SectionWrapper>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-0.5 bg-gold-400" />
                    <span className="text-xs font-semibold text-maroon-800 tracking-widest uppercase">Get in Touch</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-maroon-800 mb-4">
                    Send Us a <span className="text-gold-600">Message</span>
                  </h2>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Have questions about admissions, academics, or anything else?
                    We'd love to hear from you. Fill out the form and we'll get back to you soon.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all hover:border-gold-300"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all hover:border-gold-300"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all hover:border-gold-300"
                          placeholder="+91-XXXXX-XXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all hover:border-gold-300"
                          placeholder="Subject of inquiry"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all resize-none hover:border-gold-300"
                        placeholder="Your message here..."
                      />
                    </div>
                    
                    {/* Fixed Submit Button - Dark & Visible */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-maroon-800 hover:bg-maroon-900 text-white font-semibold px-6 py-3.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] border-2 border-maroon-700"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-400 text-center mt-2">
                      We'll get back to you within 24 hours
                    </p>
                  </form>
                </motion.div>
              </SectionWrapper>
            </div>

            {/* Right Side - Contact Info - 2/5 */}
            <div className="lg:col-span-2">
              <SectionWrapper>
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  {/* Info Cards */}
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-0.5 bg-gold-400" />
                      <span className="text-xs font-semibold text-maroon-800 tracking-widest uppercase">Contact Information</span>
                    </div>

                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        className={`flex items-start gap-4 p-4 rounded-2xl border ${info.border} ${info.bg} transition-all duration-300 hover:shadow-md`}
                      >
                        <div className={`p-3 rounded-xl ${info.bg} border ${info.border}`}>
                          <span className={info.color}>{info.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">{info.title}</h4>
                          <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                            {info.details}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="p-6 bg-gray-50 rounded-2xl border border-gray-100"
                  >
                    <h4 className="font-semibold text-gray-800 text-sm mb-4">Connect With Us</h4>
                    <div className="flex gap-3">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={index}
                          href="#"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 bg-white rounded-xl border border-gray-200 text-gray-500 transition-all duration-300 ${social.color}`}
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>

                  {/* Emergency Contact */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="relative bg-maroon-800 rounded-2xl p-6 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold-500/5 rounded-full translate-y-1/2 -translate-x-1/3" />
                    
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart size={16} className="text-gold-400" />
                        <span className="text-xs font-semibold text-gold-300 tracking-widest uppercase">Emergency</span>
                      </div>
                      <p className="text-white font-medium text-lg">
                        Need immediate assistance?
                      </p>
                      <p className="text-white/70 text-sm mt-1">
                        Call our emergency helpline available 24/7
                      </p>
                      <div className="flex items-center gap-3 mt-4">
                        <div className="bg-white/10 p-2.5 rounded-xl">
                          <Phone size={20} className="text-gold-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-lg">+91 9435190537</p>
                          <p className="text-white/40 text-xs">Available 24/7</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Quick Note */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <Building2 size={18} className="text-maroon-700 flex-shrink-0" />
                    <p className="text-xs text-gray-500 leading-relaxed">
                      <span className="font-semibold text-gray-700">Visit us:</span> M.C.Road, Chenikuthi, Guwahati - 781003
                    </p>
                  </motion.div>
                </motion.div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="w-full h-80 md:h-96 bg-gray-200 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.456789012345!2d91.7!3d26.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDA2JzAwLjAiTiA5McKwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="St. Mary's School Location"
              />
              <div className="absolute inset-0 pointer-events-none bg-black/5" />
              
              {/* Map Overlay Label */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-maroon-700" />
                  <span className="text-sm font-medium text-gray-800">St. Mary's Higher Secondary School</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactUs