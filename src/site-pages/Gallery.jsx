'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, X, Grid3x3, LayoutGrid, 
  Calendar, Tag, Eye, Heart, 
  Share2, Download, ChevronLeft, ChevronRight,
  ZoomIn, ZoomOut, RotateCw, Camera, Loader, Sparkles
} from 'lucide-react'
import { toast } from 'react-toastify'
import SectionWrapper from '../components/common/SectionWrapper.jsx'
import { getGallery } from '../services/api.js'
import { formatDate } from '../utils/helpers.js'

const Gallery = () => {
  // ---------- STATE ----------
  const [images, setImages] = useState([])           // all loaded images
  const [loading, setLoading] = useState(true)      // initial load
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid')  // 'grid' or 'masonry'
  
  // Lightbox
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedImages, setLikedImages] = useState([])

  const loaderRef = useRef(null)

  // ---------- FETCH FUNCTIONS ----------
  const fetchGallery = async (reset = false) => {
    try {
      setLoading(true)
      // Always fetch first page when resetting
      const res = await getGallery(1, 12, false)   // ✅ returns { data, pagination }
      setImages(res.data || [])
      setHasMore(res.pagination?.page < res.pagination?.totalPages)
      setPage(2)                                    // next page to load
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load gallery')
    } finally {
      setLoading(false)
    }
  }

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return

    setLoadingMore(true)
    try {
      const res = await getGallery(page, 12, false)
      const newImages = res.data || []
      setImages(prev => [...prev, ...newImages])
      setHasMore(res.pagination?.page < res.pagination?.totalPages)
      setPage(prev => prev + 1)
    } catch (err) {
      toast.error('Failed to load more images')
    } finally {
      setLoadingMore(false)
    }
  }, [page, hasMore, loadingMore])

  // ---------- EFFECTS ----------
  // Initial load
  useEffect(() => {
    fetchGallery(true)
  }, [])

  // Infinite scroll observer
  useEffect(() => {
    if (loading || loadingMore || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [loading, loadingMore, hasMore, loadMore])

  // ---------- CLIENT‑SIDE FILTERING ----------
  const categories = ['all', ...new Set(images.map(img => img.category))].filter(Boolean)
  
  const filteredImages = images.filter(img => {
    const matchCategory = filter === 'all' || img.category === filter
    const matchSearch = img.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       img.category?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch
  })

  // ---------- LIGHTBOX ----------
  const openLightbox = (index) => {
    setCurrentIndex(index)
    setSelectedImage(filteredImages[index])
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = 'auto'
    setTimeout(() => setSelectedImage(null), 300)
  }

  const navigateLightbox = (direction) => {
    const newIndex = currentIndex + direction
    if (newIndex >= 0 && newIndex < filteredImages.length) {
      setCurrentIndex(newIndex)
      setSelectedImage(filteredImages[newIndex])
    }
  }

  // ---------- INTERACTIONS ----------
  const toggleLike = (imageId) => {
    setLikedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    )
    toast.success(likedImages.includes(imageId) ? 'Removed from favorites' : 'Added to favorites')
  }

  const handleDownload = async (image) => {
    try {
      const imageUrl = image.image.startsWith('http') 
        ? image.image 
        : `${process.env.NEXT_PUBLIC_API_URL || '/api'}${image.image}`
      
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = `${image.title || 'gallery-image'}.webp`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success('Image downloaded successfully')
    } catch (err) {
      toast.error('Failed to download image')
    }
  }

  const handleShare = async (image) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: image.title || "St. Mary's Gallery",
          text: `Check out this image from St. Mary's: ${image.title}`,
          url: image.image.startsWith('http') 
            ? image.image 
            : `${window.location.origin}${image.image}`
        })
      } else {
        const url = image.image.startsWith('http') 
          ? image.image 
          : `${window.location.origin}${image.image}`
        await navigator.clipboard.writeText(url)
        toast.success('Image URL copied to clipboard')
      }
    } catch (err) {
      toast.error('Failed to share image')
    }
  }

  // ---------- UI HELPERS ----------
  const getViewGridClass = () => {
    if (viewMode === 'masonry') {
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    }
    return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
  }

  const getImageHeight = (index) => {
    if (viewMode === 'masonry') {
      const heights = ['h-64', 'h-80', 'h-56', 'h-72', 'h-96', 'h-60', 'h-84', 'h-68']
      return heights[index % heights.length]
    }
    return 'h-64 sm:h-72'
  }

  // Keyboard events for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowRight') navigateLightbox(1)
        if (e.key === 'ArrowLeft') navigateLightbox(-1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, currentIndex, filteredImages.length])

  // ---------- ANIMATION VARIANTS ----------
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  // ---------- LOADING SKELETON ----------
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <section className="relative overflow-hidden bg-maroon-900 h-[30vh] min-h-[220px] max-h-[280px]">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-300 rounded-full translate-y-1/2 -translate-x-1/3" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[80px] md:text-[120px] font-serif font-bold text-white/5 tracking-[0.3em] select-none">GALLERY</span>
          </div>
          <div className="container-custom relative h-full flex items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Camera size={18} className="text-gold-400" />
                <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Memories</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">
                Our <span className="text-gold-400">Gallery</span>
              </h1>
              <p className="text-white/50 text-sm mt-1">Moments captured at St. Mary's</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500/50" />
        </section>
        <section className="section-padding">
          <div className="container-custom">
            <div className="flex justify-center items-center py-20">
              <Loader size={40} className="animate-spin text-maroon-700" />
            </div>
          </div>
        </section>
      </div>
    )
  }

  // ---------- MAIN RENDER ----------
  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-maroon-900 h-[30vh] min-h-[220px] max-h-[280px]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-300 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[80px] md:text-[120px] font-serif font-bold text-white/5 tracking-[0.3em] select-none">GALLERY</span>
        </div>
        <div className="container-custom relative h-full flex items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-2"
            >
              <Camera size={18} className="text-gold-400" />
              <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Memories</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
            >
              Our <span className="text-gold-400">Gallery</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-sm mt-1"
            >
              Moments captured at St. Mary's
            </motion.p>
          </div>
        </div>
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
              <Sparkles size={14} className="text-maroon-700" />
              <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">Moments That Matter</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Explore the vibrant life at St. Mary's through our gallery. From academic events
              to cultural celebrations, every moment tells a story of growth and community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== GALLERY CONTENT ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Filters & Controls */}
          <SectionWrapper>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      filter === cat
                        ? 'bg-maroon-800 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-48">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search images..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex bg-gray-100 rounded-full p-0.5">
                  {[
                    { icon: <Grid3x3 size={15} />, mode: 'grid' },
                    { icon: <LayoutGrid size={15} />, mode: 'masonry' }
                  ].map(({ icon, mode }) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`p-1.5 rounded-full transition-all duration-300 ${
                        viewMode === mode
                          ? 'bg-white text-maroon-800 shadow-sm'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Gallery Grid */}
          {filteredImages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Camera size={40} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No photos found</h3>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`grid ${getViewGridClass()} gap-4`}
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image._id || image.id}
                  variants={itemVariants}
                  className="group relative rounded-xl overflow-hidden cursor-pointer bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-gold-300"
                  onClick={() => openLightbox(index)}
                >
                  <div className={`relative overflow-hidden ${getImageHeight(index)}`}>
                    <img
                      src={image.image.startsWith('http') 
                        ? image.image 
                        : `${process.env.NEXT_PUBLIC_API_URL || '/api'}${image.image}`
                      }
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <h3 className="text-white text-sm font-medium leading-tight">{image.title}</h3>
                      <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDate(image.date)}
                      </p>
                    </div>
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.category || 'General'}
                    </div>
                    <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(image._id || image.id)
                        }}
                        className="p-1.5 bg-white rounded-full shadow-sm hover:shadow transition-all duration-300"
                      >
                        <Heart 
                          size={14} 
                          className={`transition-all duration-300 ${
                            likedImages.includes(image._id || image.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-600 hover:text-red-500'
                          }`}
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownload(image)
                        }}
                        className="p-1.5 bg-white rounded-full shadow-sm hover:shadow transition-all duration-300"
                      >
                        <Download size={14} className="text-gray-600 hover:text-maroon-700" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleShare(image)
                        }}
                        className="p-1.5 bg-white rounded-full shadow-sm hover:shadow transition-all duration-300"
                      >
                        <Share2 size={14} className="text-gray-600 hover:text-maroon-700" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/60 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye size={11} />
                      <span>View</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Infinite scroll sentinel */}
          {!loading && hasMore && filteredImages.length > 0 && (
            <div ref={loaderRef} className="flex justify-center items-center py-6">
              {loadingMore ? (
                <Loader size={28} className="animate-spin text-maroon-700" />
              ) : (
                <span className="text-sm text-gray-400">Scroll for more</span>
              )}
            </div>
          )}

          {!hasMore && filteredImages.length > 0 && (
            <p className="text-center text-sm text-gray-400 mt-4">You've seen all photos 🎉</p>
          )}

          {!loading && filteredImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-6"
            >
              <p className="text-sm text-gray-400">
                Showing {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
                {filter !== 'all' && ` in ${filter}`}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
            >
              <X size={24} className="text-white" />
            </button>
            <button
              onClick={() => navigateLightbox(-1)}
              className="absolute left-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hidden md:flex"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            <button
              onClick={() => navigateLightbox(1)}
              className="absolute right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hidden md:flex"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl max-h-[85vh] mx-4"
            >
              <img
                src={selectedImage.image.startsWith('http') 
                  ? selectedImage.image 
                  : `${process.env.NEXT_PUBLIC_API_URL || '/api'}${selectedImage.image}`
                }
                alt={selectedImage.title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-black/70 rounded-b-lg">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-white font-medium text-lg">{selectedImage.title}</h3>
                    <div className="flex items-center gap-3 mt-0.5 text-white/60 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {formatDate(selectedImage.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Tag size={13} />
                        {selectedImage.category || 'General'}
                      </span>
                    </div>
                  </div>
                  <span className="text-white/40 text-sm">
                    {currentIndex + 1} / {filteredImages.length}
                  </span>
                </div>
              </div>
            </motion.div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10">
              {[
                { icon: <ZoomIn size={18} />, label: 'Zoom In' },
                { icon: <ZoomOut size={18} />, label: 'Zoom Out' },
                { icon: <RotateCw size={18} />, label: 'Rotate' },
                { 
                  icon: <Heart size={18} className={likedImages.includes(selectedImage._id || selectedImage.id) ? 'fill-red-500 text-red-500' : ''} />, 
                  label: 'Like',
                  onClick: () => toggleLike(selectedImage._id || selectedImage.id)
                },
                { icon: <Share2 size={18} />, label: 'Share', onClick: () => handleShare(selectedImage) },
                { icon: <Download size={18} />, label: 'Download', onClick: () => handleDownload(selectedImage) }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-all duration-300 text-white/60 hover:text-white"
                  title={item.label}
                >
                  {item.icon}
                </button>
              ))}
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/40 text-xs md:hidden">
              {currentIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Refresh Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setPage(1)
            setHasMore(true)
            setImages([])
            fetchGallery(true)
          }}
          className="bg-maroon-800 hover:bg-maroon-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          title="Refresh Gallery"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Gallery