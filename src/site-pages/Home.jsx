'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../components/common/SectionWrapper.jsx'
import HeroCarousel from '../components/home/HeroCarousel.jsx'
import StatsCounter from '../components/home/StatsCounter.jsx'
import CircularsPanel from '../components/home/CircularsPanel.jsx'
import WelcomeSection from '../components/home/WelcomeSection.jsx'
import FeatureCard from '../components/home/FeatureCard.jsx'
import PrincipalMessage from '../components/home/PrincipalMessage.jsx'

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  }

  return (
    <div className="font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

        .font-serif-custom { font-family: 'Playfair Display', Georgia, serif; }
        .font-sans-custom { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-label { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }

        .shadow-premium {
          box-shadow: 0 20px 60px -15px rgba(122, 12, 30, 0.12);
        }

        .bg-hero-gradient {
          background: linear-gradient(135deg, 
            rgba(122, 12, 30, 0.08) 0%,
            rgba(255, 255, 255, 0.98) 40%,
            rgba(217, 164, 65, 0.06) 100%
          );
        }
      `}</style>

      {/* ============ HERO SECTION ============ */}
      <section className="relative w-full min-h-[90vh]  max-h-212.5 bg-hero-gradient overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold-400 z-20" />
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-125 h-125 bg-gold-50/30 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-maroon-50/20 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="relative h-full w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-[90vh] max-h-100">
            <div className="lg:col-span-8 xl:col-span-8 relative h-full">
              <HeroCarousel />
            </div>

            <div className="lg:col-span-4 xl:col-span-4 relative">
              <div id="latest-notices" className="w-full h-full px-3 py-3 lg:px-4 lg:py-8 flex items-center">
                <div className="w-full">
                  <CircularsPanel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WELCOME SECTION ============ */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gold-300/30" />
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <SectionWrapper>
                <WelcomeSection />
              </SectionWrapper>
            </div>
            
            <div className="lg:col-span-1">
              <SectionWrapper>
                <div className="bg-maroon-50 rounded-2xl p-6 md:p-8 shadow-premium border border-maroon-100/40 h-full">
                  <h3 className="font-serif-custom text-lg font-semibold text-maroon-800 mb-6 flex items-center gap-2">
                    <span className="text-gold-500">✦</span>
                    Quick Facts
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Established', value: '1924' },
                      { label: 'Students', value: '2,000+' },
                      { label: 'Teachers', value: '85+' },
                      { label: 'Years Legacy', value: '100+' },
                      { label: 'Awards Won', value: '100+' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between py-2 border-b border-maroon-100/50 last:border-0"
                      >
                        <span className="text-sm text-gray-600">{item.label}</span>
                        <span className="font-semibold text-maroon-800 text-sm">{item.value}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-maroon-100/50">
                    <a 
                      href="/about/founders" 
                      className="group inline-flex items-center gap-1 text-sm text-maroon-700 font-medium hover:text-maroon-900 transition-colors"
                    >
                      Discover Our Legacy
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS COUNTER ============ */}
      {/* <StatsCounter /> */}

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-75 h-75 bg-maroon-50/30 rounded-full -translate-y-1/2 -translate-x-1/4" />
          <div className="absolute bottom-0 right-0 w-100 h-100 bg-gold-50/20 rounded-full translate-y-1/2 translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-maroon-50/10 rounded-full" />
        </div>

        <div className="container-custom relative">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-14"
          >
            {/* Decorative Gold Line - Left */}
            <span className="inline-flex items-center gap-3 text-gold-600 font-label text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              <span className="w-10 h-px bg-gold-400" />
              Why Choose Us
              <span className="w-10 h-px bg-gold-400" />
            </span>
            
            <h2 className="font-serif-custom text-3xl md:text-4xl lg:text-5xl font-semibold text-maroon-900">
              Why Choose <span className="text-gold-600">St. Mary's?</span>
            </h2>
            
            <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4 mb-4" />
            
            <p className="text-gray-600 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              For over a century, St. Mary's has been shaping young minds into responsible 
              citizens and future leaders through quality education and values.
            </p>
          </motion.div>

          <FeatureCard />
        </div>
      </section>

      {/* ============ PRINCIPAL'S MESSAGE ============ */}
      <PrincipalMessage />

      {/* ============ READY TO JOIN ============ */}
      <section className="py-16 bg-maroon-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-0 right-0 w-100 h-100 bg-gold-400 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-75 h-75 bg-gold-300 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-3 text-gold-400 font-label text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              <span className="w-8 h-px bg-gold-400/50" />
              Join Our Family
              <span className="w-8 h-px bg-gold-400/50" />
            </span>

            <h2 className="font-serif-custom text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Ready to Join <span className="text-gold-400">St. Mary's?</span>
            </h2>

            <p className="text-white/70 text-base md:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
              Take the first step towards a bright future. Be with us for upcoming admission notification details.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 bg-yellow-400 text-maroon-900 hover:bg-yellow-600 px-8 py-3.5 rounded-full font-medium text-sm font-label tracking-wide transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                Contact Us
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 pt-6 border-t border-white/10 text-xs text-white/40 font-label">
              <span className="flex items-center gap-2">📍 M.C.Road, Chenikuthi, Guwahati</span>
              <span className="flex items-center gap-2">📞 +91-94351-90537</span>
              <span className="flex items-center gap-2">✉️ stmarysghy1924@yahoo.com</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home