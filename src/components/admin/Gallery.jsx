'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Image as ImageIcon, Upload, FolderPlus, Trash } from 'lucide-react'
import { toast } from 'react-toastify'
import { 
  getGalleryEvents, 
  createGalleryEvent, 
  updateGalleryEvent, 
  deleteGalleryEvent,
  addImagesToEvent,
  deleteImageFromEvent,
  uploadMultipleImages,
  uploadImage,
  getImageUrl
} from '../../services/api.js'

const Gallery = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showImageUploadModal, setShowImageUploadModal] = useState(false)
  const [uploadFiles, setUploadFiles] = useState([])
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    eventDate: new Date().toISOString().split('T')[0],
    isActive: true,
    displayOrder: 0
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const data = await getGalleryEvents(1, 100, true)
      setEvents(data)
    } catch (err) {
      toast.error('Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        eventDate: formData.eventDate,
        isActive: formData.isActive,
        displayOrder: formData.displayOrder
      }

      if (editingId) {
        await updateGalleryEvent(editingId, payload)
        toast.success('Event updated successfully')
      } else {
        await createGalleryEvent(payload)
        toast.success('Event created successfully')
      }

      setShowModal(false)
      resetForm()
      fetchEvents()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteEvent = async (id) => {
    if (!confirm('Delete this event and all its images?')) return

    try {
      await deleteGalleryEvent(id)
      toast.success('Event deleted successfully')
      fetchEvents()
    } catch (err) {
      toast.error('Failed to delete event')
    }
  }

  const handleUploadImages = async (e) => {
    e.preventDefault()
    if (uploadFiles.length === 0) {
      toast.error('Please select at least one image')
      return
    }
    if (uploadFiles.length > 4) {
      toast.error('Maximum 4 images allowed')
      return
    }

    setUploading(true)
    try {
      // Upload images to server
      const uploadedPaths = []
      for (const file of uploadFiles) {
        const result = await uploadImage(file, 'gallery')
        uploadedPaths.push(result.path)
      }

      // Add images to event
      await addImagesToEvent(selectedEvent._id, uploadedPaths)

      toast.success(`${uploadedPaths.length} image(s) uploaded successfully`)
      setShowImageUploadModal(false)
      setUploadFiles([])
      fetchEvents()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async (eventId, imageId) => {
    if (!confirm('Delete this image?')) return
    try {
      await deleteImageFromEvent(eventId, imageId)
      toast.success('Image deleted')
      fetchEvents()
    } catch (err) {
      toast.error('Failed to delete image')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      eventDate: new Date().toISOString().split('T')[0],
      isActive: true,
      displayOrder: 0
    })
    setEditingId(null)
  }

  const openEditModal = (event) => {
    setFormData({
      name: event.name,
      description: event.description || '',
      eventDate: event.eventDate ? new Date(event.eventDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      isActive: event.isActive,
      displayOrder: event.displayOrder || 0
    })
    setEditingId(event._id)
    setShowModal(true)
  }

  const openImageUpload = (event) => {
    setSelectedEvent(event)
    setUploadFiles([])
    setShowImageUploadModal(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-maroon-800">Gallery Events</h2>
          <p className="text-gray-500 text-sm">Manage events and upload up to 4 images per event</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true) }}
          className="flex items-center gap-2 bg-maroon-800 hover:bg-maroon-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FolderPlus size={18} />
          Create Event
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-48"></div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No events created yet</p>
          <button
            onClick={() => { resetForm(); setShowModal(true) }}
            className="mt-3 text-maroon-700 font-medium hover:underline"
          >
            Create your first event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              {/* Cover Image */}
              <div className="relative h-48 bg-gray-100">
                {event.coverImage ? (
                  <img 
                    src={getImageUrl(event.coverImage)} 
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImageIcon size={48} />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {event.images.length} images
                </div>
                {!event.isActive && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Inactive
                  </div>
                )}
              </div>

              {/* Event Info */}
              <div className="p-4">
                <h3 className="font-serif font-bold text-maroon-800 text-lg truncate">{event.name}</h3>
                {event.description && (
                  <p className="text-gray-500 text-sm truncate">{event.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>

                {/* Thumbnails */}
                <div className="flex gap-1 mt-3 overflow-x-auto pb-1">
                  {event.images.slice(0, 4).map((img) => (
                    <div key={img._id} className="relative flex-shrink-0 w-12 h-12 rounded border border-gray-200 overflow-hidden group">
                      <img 
                        src={getImageUrl(img.image)} 
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleDeleteImage(event._id, img._id)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <Trash size={12} className="text-white" />
                      </button>
                    </div>
                  ))}
                  {event.images.length > 4 && (
                    <div className="flex-shrink-0 w-12 h-12 rounded border border-gray-200 flex items-center justify-center text-xs text-gray-400 bg-gray-50">
                      +{event.images.length - 4}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => openImageUpload(event)}
                    className="flex items-center gap-1 text-sm text-maroon-700 hover:text-maroon-900 font-medium"
                  >
                    <Upload size={16} />
                    Upload Images
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(event)}
                      className="p-1.5 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold text-maroon-800">
                {editingId ? 'Edit Event' : 'Create Event'}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                  placeholder="Annual Day 2025"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 resize-none"
                  placeholder="Brief description of the event"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-maroon-700 focus:ring-maroon-500 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">Active</label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-maroon-800 hover:bg-maroon-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Saving...' : editingId ? 'Update Event' : 'Create Event'}
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

      {/* Upload Images Modal */}
      {showImageUploadModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-maroon-800">Upload Images</h3>
                <p className="text-sm text-gray-500">Event: {selectedEvent.name}</p>
              </div>
              <button
                onClick={() => setShowImageUploadModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUploadImages} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Images (up to 4)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setUploadFiles(Array.from(e.target.files))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-maroon-50 file:text-maroon-700 hover:file:bg-maroon-100"
                />
                <p className="text-xs text-gray-400 mt-1">360x360px recommended, will be resized automatically</p>
                <p className="text-xs text-gray-400 mt-1">{uploadFiles.length} file(s) selected</p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={uploading || uploadFiles.length === 0}
                  className="flex-1 bg-maroon-800 hover:bg-maroon-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : `Upload ${uploadFiles.length} Image(s)`}
                </button>
                <button
                  type="button"
                  onClick={() => setShowImageUploadModal(false)}
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

export default Gallery