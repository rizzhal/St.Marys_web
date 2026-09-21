'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { motion } from 'framer-motion'
import { ArrowRight, Award, GraduationCap, Users, Sparkles } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const HeroCarousel = () => {
  const slides = [
    {
      title: "St. Mary's",
      subtitle: 'Higher Secondary School, Guwahati',
      description: '"If you are seeking a secondary school, St. Mary\'s School is the place to be."',
      badge: 'SINCE 1924'
    },
    {
      title: 'Every Age, Every Ambition',
      subtitle: 'KG to Class XII',
      description: '"From a child\'s first alphabet to a young adult\'s final examination — one campus, one continuous journey."',
      badge: '100+ YEARS LEGACY'
    },
    {
      title: 'Beyond the Classroom',
      subtitle: 'Mind, Body & Character',
      description: '"Education here is not a subject to be studied, but a life to be lived — fully, kindly, and with purpose."',
      badge: 'EST. 1924'
    }
  ]

  const particles = [
    { left: 66.7, size: 4, drift: 18 },
    { left: 23.4, size: 7, drift: -24 },
    { left: 54.3, size: 6, drift: 12 },
    { left: 78.0, size: 5, drift: -18 },
    { left: 11.0, size: 7, drift: 26 },
    { left: 43.6, size: 3, drift: -12 },
    { left: 52.3, size: 6, drift: 20 },
    { left: 0.8, size: 4, drift: -20 },
    { left: 73.9, size: 8, drift: 14 },
    { left: 74.3, size: 5, drift: -26 },
    { left: 75.0, size: 3, drift: 10 },
    { left: 54.8, size: 7, drift: -16 },
    { left: 95.3, size: 6, drift: 22 },
    { left: 88.9, size: 4, drift: -14 },
    { left: 0.5, size: 8, drift: 18 },
    { left: 69.8, size: 5, drift: -22 },
    { left: 27.1, size: 7, drift: 16 },
    { left: 96.6, size: 4, drift: -18 },
    { left: 76.8, size: 6, drift: 24 },
    { left: 34.9, size: 3, drift: -10 }
  ]
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      effect="fade"
      speed={1000}
      className="h-full w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-full relative overflow-hidden">
            {/* Background Image with Ken Burns Zoom Effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-110"
              style={{ 
                backgroundImage: `url('/walpaper.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            {/* Premium Gradient Overlay - MUCH STRONGER for text visibility */}
            <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Decorative Gold Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-500" />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    background: i % 2 === 0 ? 'rgba(234, 179, 8, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    left: `${particle.left}%`,
                    bottom: '-10%',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    y: ['0%', '-150%'], 
                    opacity: [0, 0.5, 0],
                    x: [0, particle.drift]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 12,
                    ease: 'easeInOut'
                  }}
                
                />
              ))}
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-12 lg:px-16 max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-5"
                >
                  {/* Premium Badge - BOLD YELLOW for maximum visibility */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="inline-flex items-center gap-2 bg-yellow-400 border-2 border-yellow-300 rounded-full px-6 py-2.5 shadow-2xl"
                  >
                    <Sparkles size={16} className="text-black/70" />
                    <span className="text-sm md:text-base text-black font-extrabold font-label tracking-[0.15em] uppercase">
                      {slide.badge}
                    </span>
                  </motion.div>

                  {/* Title with Glow Effect */}
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif-custom text-white font-bold leading-tight drop-shadow-2xl"
                  >
                    {slide.title}
                    <span className="block text-yellow-300 text-2xl md:text-3xl lg:text-4xl font-light mt-2 drop-shadow-xl">
                      {slide.subtitle}
                    </span>
                  </motion.h2>

                  {/* Divider */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '80px' }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-0.5 bg-yellow-400 rounded-full shadow-lg"
                  />

                  {/* Description with Glow Effect */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-white text-base md:text-lg lg:text-xl leading-relaxed max-w-xl font-light italic drop-shadow-lg"
                  >
                    {slide.description}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-wrap items-center gap-4 pt-2"
                  >
                    <a
                      href="/admissions"
                      className="group inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-800 text-white px-8 py-3.5 rounded-full font-bold text-sm font-label tracking-wide transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
                    >
                      <span className="relative">
                        Start Journey
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform group-hover:scale-110" />
                    </a>
                    <a
                      href="/about/founders"
                      className="group inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-maroon-900 px-6 py-3.5 rounded-full font-bold text-sm font-label tracking-wide transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
                    >
                      <span className="relative">
                        Our Legacy
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-maroon-900/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform group-hover:scale-110" />
                    </a>
                  </motion.div>

                  {/* Trust Indicators - With solid backgrounds */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="flex items-center gap-4 pt-4 border-t border-white/20"
                  >
                    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/30 flex items-center justify-center border border-yellow-500/30">
                        <Award size={18} className="text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-white drop-shadow-lg">100+</div>
                        <div className="text-[10px] text-white/80 font-label uppercase tracking-wide">Years Legacy</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/30 flex items-center justify-center border border-yellow-500/30">
                        <GraduationCap size={18} className="text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-white drop-shadow-lg">KG-XII</div>
                        <div className="text-[10px] text-white/80 font-label uppercase tracking-wide">Classes</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/30 flex items-center justify-center border border-yellow-500/30">
                        <Users size={18} className="text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-white drop-shadow-lg">2000+</div>
                        <div className="text-[10px] text-white/80 font-label uppercase tracking-wide">Students</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HeroCarousel