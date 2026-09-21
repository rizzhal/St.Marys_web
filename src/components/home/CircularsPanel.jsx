'use client'

import React, { useState, useEffect } from 'react'
import { Bell, Calendar, Clock, Download, ChevronRight, X, FileText } from 'lucide-react'
import { getCirculars, getFileUrl } from '../../services/api.js'
import { formatDate } from '../../utils/helpers.js'

const CircularsPanel = () => {
  const [circulars, setCirculars] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCircular, setSelectedCircular] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchCirculars()
  }, [])

  const fetchCirculars = async () => {
    try {
      const data = await getCirculars()
      setCirculars(Array.isArray(data) ? data.slice(0, 4) : [])
    } catch (err) {
      console.error('Failed to fetch circulars:', err)
      setCirculars([])
    } finally {
      setLoading(false)
    }
  }

  const downloadPDF = (circular) => {
    const element = document.createElement('div')
    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; background: white;">
        <div style="text-align: center; border-bottom: 3px solid #7A0C1E; padding-bottom: 20px; margin-bottom: 20px;">
          <h1 style="color: #7A0C1E; font-size: 28px; margin: 0;">St. Mary's Higher Secondary School</h1>
          <p style="color: #666; margin: 5px 0;">M.C.Road, Chenikuthi, Guwahati - 781003</p>
          <p style="color: #D9A441; font-weight: bold; margin: 5px 0;">NOTICE</p>
        </div>
        <div style="margin-bottom: 20px;">
          <h2 style="color: #7A0C1E; font-size: 22px;">${circular.title}</h2>
          <p style="color: #666; font-size: 14px;">Date: ${formatDate(circular.date)} | Time: ${circular.time || '10:00 AM'}</p>
        </div>
        <div style="line-height: 1.8; color: #333; font-size: 16px;">
          ${circular.content}
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; text-align: center; color: #999; font-size: 12px;">
          <p>This is a system-generated notice from St. Mary's Higher Secondary School</p>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
    `

    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>${circular.title}</title>
          <style>
            body { margin: 0; padding: 20px; background: #f5f5f5; }
          </style>
        </head>
        <body>
          ${element.innerHTML}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print()
                window.close()
              }, 500)
            }
          <\/script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  const openModal = (circular) => {
    setSelectedCircular(circular)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto'
    setTimeout(() => setSelectedCircular(null), 300)
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-maroon-800 p-4 flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Bell size={20} className="text-white" />
          </div>
          <h3 className="text-white font-serif font-semibold text-lg">Latest Notices</h3>
        </div>
        <div className="p-4 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-100 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 h-full">
        {/* Header - Solid Maroon (No Gradient) */}
        <div className="bg-maroon-800 p-4 flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Bell size={20} className="text-white" />
          </div>
          <h3 className="text-white font-serif font-semibold text-lg flex-1">Latest Notices</h3>
          <span className="bg-gold-400 text-maroon-900 text-xs font-bold px-3 py-1 rounded-full">
            {circulars.length} New
          </span>
        </div>

        {/* Circulars List */}
        <div className="divide-y divide-gray-100 max-h-[420px] overflow-y-auto scrollbar-thin">
          {circulars.length === 0 ? (
            <div className="p-8 text-center">
              <Bell size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-400 text-sm">No notices available</p>
            </div>
          ) : (
            circulars.map((circular) => (
              <div
                key={circular._id}
                className="p-4 hover:bg-gray-50/80 transition-all duration-200 cursor-pointer group border-l-4 border-transparent hover:border-gold-400"
                onClick={() => openModal(circular)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-10 h-10 rounded-full bg-maroon-50 group-hover:bg-maroon-100 transition-colors duration-200 flex items-center justify-center">
                      <FileText size={16} className="text-maroon-700 group-hover:text-maroon-900 transition-colors" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 group-hover:text-maroon-800 transition-colors duration-200 line-clamp-1">
                      {circular.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 group-hover:text-gray-600 transition-colors">
                      {circular.content}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-gold-500" />
                        {formatDate(circular.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-gold-500" />
                        {circular.time || '10:00 AM'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ChevronRight size={18} className="text-gold-500" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50/80 border-t border-gray-100 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-maroon-700 hover:text-maroon-900 transition-colors group"
          >
            <span>View All Notices</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {isModalOpen && selectedCircular && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Solid Maroon (No Gradient) */}
            <div className="bg-maroon-800 px-6 py-5 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <FileText size={20} className="text-gold-400" />
                </div>
                <div>
                  <h2 className="text-white font-serif font-bold text-xl leading-tight">
                    {selectedCircular.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gold-300/80">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {formatDate(selectedCircular.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {selectedCircular.time || '10:00 AM'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all duration-200"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedCircular.content}
              </div>
              <div className="my-5 border-t border-gray-100" />
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>Published</span>
                  </span>
                  {selectedCircular.createdAt && (
                    <span>
                      Posted: {formatDate(selectedCircular.createdAt)}
                    </span>
                  )}
                </div>
                {selectedCircular.fileUrl && (
                  <a
                    href={getFileUrl(selectedCircular.fileUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-maroon-700 hover:text-maroon-900 font-medium transition-colors"
                  >
                    <Download size={14} />
                    Download PDF
                  </a>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => downloadPDF(selectedCircular)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-maroon-800 hover:bg-maroon-700 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Download size={16} />
                Download Notice
              </button>
              <button
                onClick={closeModal}
                className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-600 text-sm font-medium transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 9999px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}

export default CircularsPanel