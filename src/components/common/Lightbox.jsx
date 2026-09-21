'use client'

import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const Lightbox = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = 'auto'
    }
  })

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const next = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
      >
        <X size={32} />
      </button>
      <button
        onClick={prev}
        className="absolute left-4 text-white/70 hover:text-white transition-colors p-2"
      >
        <ChevronLeft size={40} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 text-white/70 hover:text-white transition-colors p-2"
      >
        <ChevronRight size={40} />
      </button>
      <div className="max-w-5xl max-h-[80vh] px-8">
        <img
          src={images[currentIndex].image}
          alt={images[currentIndex].title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg"
        />
        <p className="text-white text-center mt-4 text-sm">
          {images[currentIndex].title} ({currentIndex + 1}/{images.length})
        </p>
      </div>
    </div>
  )
}

export default Lightbox