'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar, Clock, X, FileText } from 'lucide-react'
import { toast } from 'react-toastify'
import { getCirculars, createCircular, updateCircular, deleteCircular, uploadPDF, getFileUrl } from '../../services/api.js'

const Circulars = () => {
  const [circulars, setCirculars] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    file: null,
    isPublished: true
  })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchCirculars()
  }, [])

  const fetchCirculars = async () => {
    try {
      setLoading(true)
      const data = await getCirculars(true)
      setCirculars(data)
    } catch (err) {
      console.error('Fetch circulars error:', err)
      toast.error(err?.response?.data?.message || 'Failed to fetch circulars')
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
        const uploadResult = await uploadPDF(formData.file)
        fileUrl = uploadResult.path
      }

      const payload = {
        title: formData.title,
        content: formData.content,
        date: formData.date,
        time: formData.time,
        fileUrl: fileUrl,
        isPublished: formData.isPublished
      }

      if (editingId) {
        await updateCircular(editingId, payload)
        toast.success('Circular updated successfully')
      } else {
        await createCircular(payload)
        toast.success('Circular created successfully')
      }

      setShowModal(false)
      resetForm()
      await fetchCirculars()
    } catch (err) {
      console.error('Submit error:', err)
      toast.error(err?.response?.data?.message || 'Operation failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this circular?')) return

    try {
      await deleteCircular(id)
      toast.success('Circular deleted successfully')
      await fetchCirculars()
    } catch (err) {
      console.error('Delete error:', err)
      toast.error(err?.response?.data?.message || 'Failed to delete circular')
    }
  }

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      await updateCircular(id, { isPublished: !currentStatus })
      toast.success(`Circular ${!currentStatus ? 'published' : 'unpublished'}`)
      await fetchCirculars()
    } catch (err) {
      console.error('Toggle publish error:', err)
      toast.error(err?.response?.data?.message || 'Failed to update status')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      file: null,
      isPublished: true
    })
    setEditingId(null)
  }

  const openEditModal = (circular) => {
    setFormData({
      title: circular.title,
      content: circular.content,
      date: circular.date ? new Date(circular.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      time: circular.time || '10:00 AM',
      file: null,
      isPublished: circular.isPublished !== undefined ? circular.isPublished : true
    })
    setEditingId(circular._id)
    setShowModal(true)
  }

  const openCreateModal = () => {
    resetForm()
    setShowModal(true)
  }

  // Helper to format date safely
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-maroon-800">Circulars</h2>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-maroon-800 hover:bg-maroon-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          Add Circular
        </button>
      </div>

      {/* Circulars List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse p-4 border-b border-gray-100">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2 mt-2"></div>
            </div>
          ))
        ) : circulars.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No circulars added yet</p>
            <button
              onClick={openCreateModal}
              className="mt-3 text-maroon-700 font-medium hover:underline"
            >
              Create your first circular
            </button>
          </div>
        ) : (
          circulars.map((circular) => (
            <div key={circular._id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-gray-800 truncate">{circular.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${circular.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {circular.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{circular.content}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(circular.date)}
                    </span>
                    {circular.time && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {circular.time}
                      </span>
                    )}
                    {circular.fileUrl && (
                      <a 
                        href={getFileUrl(circular.fileUrl)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-maroon-700 hover:underline"
                      >
                        Download PDF
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-4 shrink-0">
                  <button
                    onClick={() => handleTogglePublish(circular._id, circular.isPublished)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    title={circular.isPublished ? 'Unpublish' : 'Publish'}
                  >
                    {circular.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => openEditModal(circular)}
                    className="p-1.5 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(circular._id)}
                    className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <h3 className="text-xl font-serif font-bold text-maroon-800">
                {editingId ? 'Edit Circular' : 'Create New Circular'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                  placeholder="Circular title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 resize-none"
                  placeholder="Circular content..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF (Optional)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-maroon-50 file:text-maroon-700 hover:file:bg-maroon-100"
                />
                {editingId && !formData.file && (
                  <p className="text-xs text-gray-400 mt-1">Leave empty to keep existing file</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-maroon-700 focus:ring-maroon-500 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">Publish immediately</label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-maroon-800 hover:bg-maroon-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Saving...' : editingId ? 'Update Circular' : 'Create Circular'}
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

export default Circulars