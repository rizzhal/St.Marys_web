'use client'

import React from 'react'
import Link from 'next/link'
import { School, Phone, Mail, MapPin, Globe2, MessageCircle, Send, Play, Heart, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
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

  return (
    <footer className="bg-maroon-900 text-white relative overflow-hidden">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-gold-400 to-transparent" />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-maroon-700/30 rounded-full translate-y-1/2 -translate-x-1/3" />

      <div className="container-custom pt-16 pb-8 relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        >
          {/* About - Column 1 */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gold-500/10 p-2.5 rounded-xl">
                <School size={28} className="text-gold-400" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-white">St. Mary's</h3>
                <p className="text-[10px] text-gold-400 tracking-[0.2em] uppercase font-label">Higher Secondary School</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              St. Mary's Higher Secondary School, Guwahati, is committed to providing quality education and fostering holistic development of students since 1924.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: <Globe2 size={16} />, label: 'Website' },
                { icon: <MessageCircle size={16} />, label: 'WhatsApp' },
                { icon: <Send size={16} />, label: 'Telegram' },
                { icon: <Play size={16} />, label: 'YouTube' }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 hover:bg-gold-500/20 p-2.5 rounded-xl transition-all duration-300 group"
                  aria-label={item.label}
                >
                  <span className="text-gray-300 group-hover:text-gold-400 transition-colors duration-300">
                    {item.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - Column 2 */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-serif text-lg font-semibold mb-5 text-white flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gold-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/about/founders', label: 'About Us' },
                { to: '/admissions', label: 'Admissions' },
                { to: '/academics/syllabus', label: 'Syllabus' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact Us' }
              ].map((item) => (
                <li key={item.to}>
                  <Link 
                    href={item.to} 
                    className="group flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-all duration-300 text-sm"
                  >
                    <ChevronRight size={12} className="text-gold-400/50 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-all duration-300">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Academics - Column 3 */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-serif text-lg font-semibold mb-5 text-white flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gold-400" />
              Academics
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/academics/syllabus', label: 'Syllabus' },
                { to: '/academics/evaluation', label: 'Evaluation System' },
                { to: '/administration/teaching-staff/primary', label: 'Primary School' },
                { to: '/administration/teaching-staff/higher-secondary', label: 'Higher Secondary' }
              ].map((item) => (
                <li key={item.to}>
                  <Link 
                    href={item.to} 
                    className="group flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-all duration-300 text-sm"
                  >
                    <ChevronRight size={12} className="text-gold-400/50 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-all duration-300">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact - Column 4 */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-serif text-lg font-semibold mb-5 text-white flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gold-400" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm group">
                <div className="bg-gold-500/10 p-2 rounded-lg shrink-0 group-hover:bg-gold-500/20 transition-colors duration-300">
                  <MapPin size={16} className="text-gold-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  Guwahati, Assam - 781001
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm group">
                <div className="bg-gold-500/10 p-2 rounded-lg shrink-0 group-hover:bg-gold-500/20 transition-colors duration-300">
                  <Phone size={16} className="text-gold-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  +91 9435190537
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm group">
                <div className="bg-gold-500/10 p-2 rounded-lg shrink-0 group-hover:bg-gold-500/20 transition-colors duration-300">
                  <Mail size={16} className="text-gold-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  stmarysghy1924@yahoo.com
                </span>
              </li>
            </ul>

            {/* Quick Contact Button - CHANGED TO YELLOW */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-yellow-400 text-maroon-900 rounded-lg font-semibold font-label text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get in Touch
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} St. Mary's Higher Secondary School. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Privacy Policy</span>
            <span className="w-px h-4 bg-white/10" />
            <span>Terms of Service</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-1">
              Made with <Heart size={12} className="text-gold-400 animate-pulse" /> in Assam
            </span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .font-label {
          font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
        }
        .font-serif {
          font-family: 'Fraunces', Georgia, serif;
        }
      `}</style>
    </footer>
  )
}

export default Footer