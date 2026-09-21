'use client'

import React from 'react'
import { Mail, Phone, Sparkles, Pen, Quote, Star, Award, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

const PrincipalMessage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  }

  return (
    <section className="py-16 md:py-20 bg-[#FBF6EC] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-gold-100/25 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-maroon-100/15 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-maroon-900">
            A Word From Our <span className="italic text-gold-600">Principal</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold-400 to-maroon-600 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl border border-maroon-100/50 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left - Photo Column - 4/12 */}
            <div className="md:col-span-4 relative bg-maroon-900 min-h-[300px] md:min-h-[400px]">
              <img
                src="/principal.png"
                alt="Principal Sr. Jessy Nedumala"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-maroon-950/20 to-transparent" />
              
              {/* Decorative Gold Frame */}
              <div className="absolute inset-4 border border-gold-400/30 rounded-lg pointer-events-none" />
              <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-gold-400/50 rounded-tl" />
              <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-gold-400/50 rounded-tr" />
              <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-gold-400/50 rounded-bl" />
              <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-gold-400/50 rounded-br" />

              {/* Years Badge */}
              <div className="absolute top-4 right-4 bg-gold-500/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-maroon-900">
                  <Award size={12} />
                  100 Years
                </span>
              </div>

              {/* ✅ FIXED: Name Plate - Now Visible */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="w-10 h-0.5 bg-gold-400 mb-2" />
                <p className="font-serif text-xl text-black leading-tight font-semibold">
                  Sr. Jessy Nedumala
                </p>
                <p className="text-[13px] text-gblack tracking-[0.2em] uppercase mt-0.5">
                  Principal
                </p>
              </div>
            </div>

            {/* Right - Message Column - 8/12 */}
            <div className="md:col-span-8 p-6 md:p-8 lg:p-10">
              <div className="flex items-start gap-3 mb-3">
                <Quote size={20} className="text-gold-300 flex-shrink-0 mt-0.5" />
                <span className="text-[10px] font-semibold text-gold-600 tracking-[0.15em] uppercase">
                  Dear Parents and Students,
                </span>
              </div>

              {/* Message Content */}
              <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-[15px] max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                <p>
                  The legacy and excellence of <span className="text-maroon-800 font-semibold">St. Mary's Higher Secondary School, Guwahati</span> has carved a niche for itself through <span className="text-gold-600 font-bold">100 glorious years</span>. The essence of the institution lies in its focus on virtue, knowledge, and discipline — each day striving to produce women of quality and stature.
                </p>

                <p>
                  We believe that schools are centres that harness power — the power to mould, to direct, to change. The pivot of the institution is the relationship between teachers, students, parents, and management, all essential in creating an environment for the holistic development of a child.
                </p>

                {/* Quote Block */}
                <div className="my-3 pl-4 border-l-3 border-gold-400 py-1 bg-gold-50/50 rounded-r-lg">
                  <p className="italic text-maroon-800 text-sm leading-relaxed">
                    "We aim to create a safe, nurturing yet challenging space — preparing each student to be academically excellent, spiritually enlightened, emotionally balanced, socially committed, and eco-conscious."
                  </p>
                </div>

                <p>
                  As an inclusive institution, we understand, acknowledge, and respect every student's unique individuality. Our teachers ensure every student leaves with respect, cooperation, kindness, empathy, and tolerance — a positive attitude to navigate the world with confidence.
                </p>

                <p>
                  As you explore our website, you'll see our commitment to academic excellence and to giving every student the opportunities they deserve. Our teachers and management work together to nurture competent, upright, and empowered young women.
                </p>
              </div>

              {/* Footer - Signature & Contact */}
              <div className="mt-5 pt-4 border-t-2 border-gold-200/60">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="font-serif italic text-xl text-maroon-800 leading-tight">Sr. Jessy Nedumala</p>
                    <p className="text-xs font-semibold text-gold-600 tracking-[0.15em] uppercase">Principal</p>
                  </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-wrap items-center justify-between mt-3 pt-3 border-t border-gold-100/50">
                  <div className="flex items-center gap-2">
                    <Heart size={12} className="text-rose-400" />
                    <span className="text-sm font-medium text-maroon-700 italic">God Bless us all.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={12} className="text-gold-500" />
                    <span className="text-xs font-semibold text-maroon-600 tracking-wide">Est. 1924</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .ribbon {
          clip-path: polygon(6% 0, 94% 0, 100% 50%, 94% 100%, 6% 100%, 0% 50%);
        }
        .border-l-3 {
          border-left-width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D9A441;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #c48d32;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #D9A441 transparent;
        }
      `}</style>
    </section>
  )
}

export default PrincipalMessage