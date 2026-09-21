'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, BookOpen, FileText } from 'lucide-react'
import { toast } from 'react-toastify'
import { getSyllabus, createSyllabus, updateSyllabus, deleteSyllabus, uploadPDF, getFileUrl } from '../../services/api.js'

const Syllabus = () => {
  const [syllabus, setSyllabus] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [academicYears, setAcademicYears] = useState(['2025-26'])
  
  const classOptions = ['KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  const streamOptions = [
    { value: 'arts', label: 'Arts' },
    { value: 'science', label: 'Science' },
    { value: 'commerce', label: 'Commerce' }
  ]

  const [formData, setFormData] = useState({
    class: '5',
    stream: 'general',
    academicYear: '2025-26',
    file: null,
    isPublished: true
  })

  useEffect(() => {
    fetchSyllabus()
  }, [])

  const fetchSyllabus = async () => {
    try {
      const data = await getSyllabus(null, null, null, true)
      setSyllabus(data)
      const years = [...new Set(data.map(s => s.academicYear))]
      if (years.length > 0) setAcademicYears(years)
    } catch (err) {
      toast.error('Failed to fetch syllabus')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      let fileUrl = null

      if (formData.file) {
        const uploadResult = await uploadPDF(formData.file, 'syllabus')
        fileUrl = uploadResult.path
      }

      const payload = {
        class: formData.class,
        stream: formData.stream,
        academicYear: formData.academicYear,
        fileUrl: fileUrl,
        isPublished: formData.isPublished
      }

      if (editingId) {
        await updateSyllabus(editingId, payload)
        toast.success('Syllabus updated successfully')
      } else {
        await createSyllabus(payload)
        toast.success('Syllabus added successfully')
      }

      setShowModal(false)
      resetForm()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this syllabus entry?')) return

    try {
      await deleteSyllabus(id)
      toast.success('Syllabus deleted successfully')
      fetchSyllabus()
    } catch (err) {
      toast.error('Failed to delete syllabus')
    }
  }

  const resetForm = () => {
    setFormData({
      class: '5',
      stream: 'general',
      academicYear: '2025-26',
      file: null,
      isPublished: true
    })
    setEditingId(null)
  }

  const openEditModal = (item) => {
    setFormData({
      class: item.class,
      stream: item.stream || 'general',
      academicYear: item.academicYear,
      file: null,
      isPublished: item.isPublished
    })
    setEditingId(item._id)
    setShowModal(true)
  }

  const openCreateModal = () => {
    resetForm()
    setShowModal(true)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return 'Invalid Date'
    }
  }

  const isStreamRequired = ['11', '12'].includes(formData.class)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-maroon-800">Syllabus</h2>
          <p className="text-gray-500 text-sm">Manage class-wise syllabus PDFs</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-maroon-800 hover:bg-maroon-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          Add Syllabus
        </button>
      </div>

      {loading ? (
        [...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/3 mt-2"></div>
          </div>
        ))
      ) : syllabus.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No syllabus entries</p>
          <button
            onClick={openCreateModal}
            className="mt-3 text-maroon-700 font-medium hover:underline"
          >
            Add your first syllabus entry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {syllabus.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-maroon-100 text-maroon-800 text-xs px-2 py-0.5 rounded-full font-medium">
                      Class {item.class}
                    </span>
                    {item.stream && item.stream !== 'general' && (
                      <span className="bg-gold-100 text-gold-700 text-xs px-2 py-0.5 rounded-full font-medium capitalize">
                        {item.stream}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">{item.academicYear}</span>
                  </div>
                  <div className="mt-2">
                    {item.fileUrl && (
                      <a 
                        href={getFileUrl(item.fileUrl)}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs text-maroon-700 hover:underline"
                      >
                        <FileText size={14} />
                        View PDF
                      </a>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    {item.isPublished ? 'Published' : 'Draft'}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <h3 className="text-xl font-serif font-bold text-maroon-800">
                {editingId ? 'Edit Syllabus' : 'Add Syllabus'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Academic Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  required
                  placeholder="2025-26"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                />
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                >
                  {classOptions.map((c) => (
                    <option key={c} value={c}>Class {c}</option>
                  ))}
                </select>
              </div>

              {/* Stream - Only for Class 11 & 12 */}
              {isStreamRequired && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stream *</label>
                  <select
                    value={formData.stream}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                  >
                    <option value="">Select Stream</option>
                    {streamOptions.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Stream is required for Class 11 and 12</p>
                </div>
              )}

              {/* PDF Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF *</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                  required={!editingId}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-maroon-50 file:text-maroon-700 hover:file:bg-maroon-100"
                />
                {editingId && !formData.file && (
                  <p className="text-xs text-gray-400 mt-1">Leave empty to keep existing file</p>
                )}
                <p className="text-xs text-gray-400 mt-1">Only PDF files are allowed (Max 10MB)</p>
              </div>

              {/* Publish */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-maroon-700 focus:ring-maroon-500 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">Publish immediately</label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-maroon-800 hover:bg-maroon-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Saving...' : editingId ? 'Update Syllabus' : 'Add Syllabus'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Syllabus