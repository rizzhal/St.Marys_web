'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox.jsx'

const GalleryGrid = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer overflow-hidden rounded-xl"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={image.image}
              alt={image.title}
              className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div>
                <p className="text-white font-medium text-sm">{image.title}</p>
                <p className="text-white/70 text-xs">{image.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedIndex !== null && (
        <Lightbox images={images} initialIndex={selectedIndex} onClose={() => setSelectedIndex(null)} />
      )}
    </>
  )
}

export default GalleryGrid