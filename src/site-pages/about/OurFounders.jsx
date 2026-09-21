'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Quote, Sparkles, Heart, Cross, Users, Award, BookOpen, Crown } from 'lucide-react'

const OurFounders = () => {
  const founders = [
    {
      id: '1',
      name: 'St. John Bosco',
      role: 'Founder',
      shortName: 'Don Bosco',
      description: `St. John Bosco, popularly known as Don Bosco (Italian for Father Bosco) was born at Becchi, in Piedmont, Italy on August 16, 1815. From a very young age he was inspired to work for the poor young people of his time, when Europe was under the grip of the Industrial Revolution and many a young person who came to the cities to study or in search of work, fell an easy prey to the many social evils of his time.

He lost his father at the age of 2 and was brought up by his mother Mama Margherita, who was truly his guide, his model and his educator. From early years of life he discovered his leadership qualities especially among his peers. At the age of nine little John Bosco was given a mission in a vision. He was to transform young people "NOT WITH BLOWS BUT WITH KINDNESS" that became the goal of his life. Overcoming untold hardships and hostility he became a priest on June 5th, 1841. His determination to be a priest for young people combined with his dynamic optimism resulted in the flowering of his long cherished goal.

Don Bosco was an educational practitioner rather than an educational theorist. It is impossible to understand his approach to education without reference to his experiences in life, because he actually incorporated the lessons of his own life experiences into his pedagogy. This style of education consists in involving young people, their parents or guardians and the educators in a family atmosphere. This system is based on Reason, Religion (Faith in God) and Loving Kindness. The goal is integral formation. It embraces developing physical, intellectual, moral, social and spiritual aspects of a person's life.

In spite of initial poverty, hardships, opposition of all sorts, soon his works flourished. The little seed planted by him grew into a mighty tree, and now there are hundreds of educational institutions catering to thousands of young people all over the world. Rightly, Don Bosco is recognized as the Father, Friend and Teacher of young people. He is the Founder of the Salesian Fathers (SDB), Salesian Sisters (FMA), and Salesian Cooperators (SC).`,
      image: '/john.png',
      years: '1815 - 1888',
      feastDay: 'January 31'
    },
    {
      id: '2',
      name: 'St. Mary Domenica Mazzarello',
      role: 'Co-Founder',
      shortName: 'Mary Mazzarello',
      description: `God's ways are marvellous. Contemporaneously with Don Bosco, Mary Mazzarello in the hamlet of Mornese a little village in Piedmont, Italy thirsted with the same desire to help girls. She was born on May 9, 1837.

She too received a heavenly mandate. While walking down the uninhabited slopes of Borgo Alto she saw a group of girls playing in the non existent playground and a strong voice-firm and steady, communicated to her the divine mission : "I entrust them to you" Was it a dream, a hallucination? Yet, there she was fully awake. Walking in full consciousness...

In 1864 came the momentous meeting with Don Bosco, "He is a saint! I can feel it!" She said to all. Don Bosco too saw something exceptional in her. In Mary Mazzarello a likeminded soul, Salesian by instinct Don Bosco found a ready, active and creative collaborator. In 1872, he founded the Society of the Salesian Sisters (FMA) with Mary Mazzarello at their head. Imbibed with the spirit of the Founder they would march forward in the quest of providing integral formation and education for girls. 1875 saw the first expansion of the Salesian work outside Europe. India welcomed the first Salesian Sisters in 1922.`,
      image: '/domenica.png',
      years: '1837 - 1881',
      feastDay: 'May 13'
    },
    {
      id: '3',
      name: 'Pioneering Sisters',
      role: 'First Missionaries to Assam',
      shortName: 'First Sisters',
      description: `Sr. Innocenza Vallino, Sr. Cecilia Da Roit, Sr. Clotilde Appiano, Sr. Maria Bricarello, Sr. Rosetti Antonietta and Sr. Giulia Berra formed the first batch of sisters destined for Assam. These courageous women ventured into the unknown, bringing education and hope to the people of Assam. Their pioneering spirit and dedication to the Salesian mission laid the foundation for St. Mary's Higher Secondary School and the countless educational institutions that followed.`,
      image: '/sister.jpg',
      years: '1922',
      feastDay: '—'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
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
            FOUNDERS
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
              <Cross size={18} className="text-gold-400" />
              <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Est. 1924</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
            >
              Our <span className="text-gold-400">Founders</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-sm mt-1"
            >
              The visionaries who laid the foundation of St. Mary's Higher Secondary School
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
            <p className="text-gray-600 text-lg leading-relaxed">
              St. Mary's Higher Secondary School was established with a vision to provide
              quality education rooted in Christian values. Our founders dedicated their
              lives to building an institution that would serve the community for generations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FOUNDERS ===== */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-20"
          >
            {founders.map((founder, index) => (
              <motion.div
                key={founder.id}
                variants={cardVariants}
                className="group"
              >
                <div className="bg-white rounded-2xl border border-gray-100 hover:border-gold-200 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <div className="p-6 md:p-8 lg:p-10">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                      {/* Left - Image */}
                      <div className="md:w-56 flex-shrink-0">
                        <div className="text-center md:text-left">
                          <div className="relative inline-block">
                            <img
                              src={founder.image}
                              alt={founder.name}
                              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gold-200 group-hover:border-gold-400 transition-all duration-300 shadow-md group-hover:shadow-xl"
                              loading="lazy"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-gold-500 rounded-full p-1.5 border-2 border-white">
                              <Sparkles size={12} className="text-white" />
                            </div>
                          </div>

                          <h3 className="font-serif font-bold text-xl text-maroon-900 mt-4">
                            {founder.name}
                          </h3>
                          <span className="inline-block bg-maroon-100 text-maroon-700 text-xs font-semibold px-3 py-0.5 rounded-full mt-1">
                            {founder.role}
                          </span>
                          <div className="flex items-center justify-center md:justify-start gap-3 mt-2 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {founder.years}
                            </span>
                            {founder.feastDay !== '—' && (
                              <span className="flex items-center gap-1">
                                <Heart size={14} className="text-rose-400" />
                                Feast: {founder.feastDay}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right - Description */}
                      <div className="flex-1 min-w-0">
                        <div className="relative">
                          <Quote size={24} className="absolute -top-1 -left-1 text-gold-200" />
                          <div className="pl-6">
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-h-[280px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gold-300 scrollbar-track-gray-100">
                              {founder.description}
                            </p>
                          </div>
                        </div>

                        {/* Quote */}
                        <div className="mt-4 p-4 bg-maroon-50 rounded-xl border border-maroon-100">
                          <p className="text-maroon-800 text-sm italic font-medium">
                            "{founder.quote || (founder.name === 'St. John Bosco' ? 'NOT WITH BLOWS BUT WITH KINDNESS' : founder.name === 'St. Mary Domenica Mazzarello' ? 'I entrust them to you' : 'Courage to venture into the unknown')}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Decorative Line */}
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-gold-300 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-16 bg-maroon-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen size={22} className="text-gold-500" />
              <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">Carrying Forward the Vision</span>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              The legacy of our founders continues to inspire generations of students.
              Their vision of quality education rooted in values remains the cornerstone
              of St. Mary's Higher Secondary School.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <a
                href="/about/journey"
                className="inline-flex items-center gap-2 bg-maroon-800 hover:bg-maroon-700 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg text-sm"
              >
                Explore Our Journey
                <Sparkles size={14} />
              </a>
              <a
                href="/about/principal"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-maroon-800 px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 text-sm"
              >
                Principal's Message
                <span>→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 9999px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d4a947;
          border-radius: 9999px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #b8922a;
        }
      `}</style>
    </div>
  )
}

export default OurFounders