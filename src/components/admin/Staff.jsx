'use client'

// import React, { useState, useEffect } from 'react'
// import { Plus, Edit, Trash2, X } from 'lucide-react'
// import { toast } from 'react-toastify'
// import { getStaff, createStaff, updateStaff, deleteStaff, uploadImage } from '../../services/api.js'
// import StaffCard from '../common/StaffCard.jsx'

// const Staff = () => {
//   const [staff, setStaff] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [showModal, setShowModal] = useState(false)
//   const [editingId, setEditingId] = useState(null)
//   const [filterCategory, setFilterCategory] = useState('all')
//   const [uploading, setUploading] = useState(false)
//   const [formData, setFormData] = useState({
//     name: '',
//     designation: '',
//     category: 'management',
//     subject: '',
//     qualification: '',
//     experience: '',
//     email: '',
//     phone: '',
//     image: null,
//     isActive: true
//   })

//   const categories = [
//     'management',
//     'primary',
//     'middle',
//     'high',
//     'higher-secondary',
//     'non-teaching'
//   ]

//   const subjectOptions = [
//     'Mathematics',
//     'Science',
//     'English',
//     'Hindi',
//     'Assamese',
//     'Social Studies',
//     'Computer Science',
//     'Physics',
//     'Chemistry',
//     'Biology',
//     'Economics',
//     'Accountancy',
//     'Business Studies',
//     'Physical Education',
//     'Art & Craft',
//     'Music'
//   ]

//   useEffect(() => {
//     fetchStaff()
//   }, [filterCategory])

//   const fetchStaff = async () => {
//     try {
//       const data = await getStaff(filterCategory === 'all' ? null : filterCategory, true)
//       setStaff(data)
//     } catch (err) {
//       toast.error('Failed to fetch staff')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setUploading(true)

//     try {
//       let imagePath = null

//       if (formData.image) {
//         const uploadResult = await uploadImage(formData.image)
//         imagePath = uploadResult.path
//       }

//       const payload = {
//         ...formData,
//         image: imagePath
//       }

//       if (editingId) {
//         await updateStaff(editingId, payload)
//         toast.success('Staff updated successfully')
//       } else {
//         await createStaff(payload)
//         toast.success('Staff added successfully')
//       }

//       setShowModal(false)
//       resetForm()
//       fetchStaff()
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Operation failed')
//     } finally {
//       setUploading(false)
//     }
//   }

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this staff member?')) return

//     try {
//       await deleteStaff(id)
//       toast.success('Staff deleted successfully')
//       fetchStaff()
//     } catch (err) {
//       toast.error('Failed to delete staff')
//     }
//   }

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       designation: '',
//       category: 'management',
//       subject: '',
//       qualification: '',
//       experience: '',
//       email: '',
//       phone: '',
//       image: null,
//       isActive: true
//     })
//     setEditingId(null)
//   }

//   const openEditModal = (item) => {
//     setFormData({
//       name: item.name,
//       designation: item.designation,
//       category: item.category,
//       subject: item.subject || '',
//       qualification: item.qualification,
//       experience: item.experience,
//       email: item.email || '',
//       phone: item.phone || '',
//       image: null,
//       isActive: item.isActive
//     })
//     setEditingId(item._id)
//     setShowModal(true)
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-2xl font-serif font-bold text-maroon-800">Staff</h2>
//           <p className="text-gray-500 text-sm">Manage your teaching and non-teaching staff</p>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 bg-maroon-800 hover:bg-maroon-700 text-white px-4 py-2 rounded-lg transition-colors"
//         >
//           <Plus size={18} />
//           Add Staff
//         </button>
//       </div>

//       {/* Category Filter */}
//       <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
//         <button
//           onClick={() => setFilterCategory('all')}
//           className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
//             filterCategory === 'all'
//               ? 'bg-maroon-800 text-white'
//               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//           }`}
//         >
//           All
//         </button>
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setFilterCategory(cat)}
//             className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap capitalize ${
//               filterCategory === cat
//                 ? 'bg-maroon-800 text-white'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             {cat.replace('-', ' ')}
//           </button>
//         ))}
//       </div>

//       {/* Staff Grid */}
//       {loading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//               <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto"></div>
//               <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto mt-3"></div>
//               <div className="h-4 bg-gray-100 rounded w-1/3 mx-auto mt-1"></div>
//             </div>
//           ))}
//         </div>
//       ) : staff.length === 0 ? (
//         <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
//           <Users size={48} className="mx-auto text-gray-300 mb-3" />
//           <p className="text-gray-500">No staff members found</p>
//           <button
//             onClick={() => setShowModal(true)}
//             className="mt-3 text-maroon-700 font-medium hover:underline"
//           >
//             Add your first staff member
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {staff.map((member) => (
//             <div key={member._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200">
//               <div className="relative">
//                 {member.image ? (
//                   <img
//                     src={`http://localhost:8080${member.image}`}
//                     alt={member.name}
//                     className="w-20 h-20 rounded-full object-cover mx-auto"
//                   />
//                 ) : (
//                   <div className="w-20 h-20 rounded-full bg-maroon-100 flex items-center justify-center mx-auto text-maroon-800 text-2xl font-bold">
//                     {member.name.charAt(0).toUpperCase()}
//                   </div>
//                 )}
//               </div>
//               <div className="text-center mt-3">
//                 <h3 className="font-serif font-semibold text-maroon-800">{member.name}</h3>
//                 <p className="text-gold-600 text-sm font-medium">{member.designation}</p>
//                 {member.subject && (
//                   <p className="text-gray-500 text-xs">Subject: {member.subject}</p>
//                 )}
//                 <p className="text-gray-400 text-xs mt-1 capitalize">{member.category.replace('-', ' ')}</p>
//                 <div className="flex justify-center gap-2 mt-3">
//                   <button
//                     onClick={() => openEditModal(member)}
//                     className="p-1.5 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
//                   >
//                     <Edit size={16} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(member._id)}
//                     className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
//               <h3 className="text-xl font-serif font-bold text-maroon-800">
//                 {editingId ? 'Edit Staff' : 'Add New Staff'}
//               </h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     required
//                     className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
//                   <input
//                     type="text"
//                     value={formData.designation}
//                     onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
//                     required
//                     className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
//                     placeholder="Head Teacher"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//                   <select
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                     required
//                     className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
//                   >
//                     {categories.map((cat) => (
//                       <option key={cat} value={cat}>{cat.replace('-', ' ').toUpperCase()}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Subject (Optional)</label>
//                   <select
//                     value={formData.subject}
//                     onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
//                   >
//                     <option value="">No Subject</option>
//                     {subjectOptions.map((sub) => (
//                       <option key={sub} value={sub}>{sub}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Qualification *</label>
//                   <input
//                     type="text"
//                     value={formData.qualification}
//                     onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
//                     required
//                     className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
//                     placeholder="B.Sc., M.Ed."
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label>
//                   <input
//                     type="text"
//                     value={formData.experience}
//                     onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
//                     required
//                     className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
//                     placeholder="10 years"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
//                     placeholder="email@example.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                   <input
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
//                     placeholder="+91-XXXXX-XXXXX"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image (360x360)</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
//                   className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-maroon-50 file:text-maroon-700 hover:file:bg-maroon-100"
//                 />
//                 {editingId && !formData.image && (
//                   <p className="text-xs text-gray-400 mt-1">Leave empty to keep existing image</p>
//                 )}
//                 <p className="text-xs text-gray-400 mt-1">Recommended: 360x360 pixels, will be resized automatically</p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.isActive}
//                   onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
//                   className="w-4 h-4 text-maroon-700 focus:ring-maroon-500 border-gray-300 rounded"
//                 />
//                 <label className="text-sm text-gray-700">Active</label>
//               </div>

//               <div className="flex gap-3 pt-4 border-t border-gray-100">
//                 <button
//                   type="submit"
//                   disabled={uploading}
//                   className="flex-1 bg-maroon-800 hover:bg-maroon-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
//                 >
//                   {uploading ? 'Saving...' : editingId ? 'Update Staff' : 'Add Staff'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Staff















import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Users } from 'lucide-react'
import { toast } from 'react-toastify'
import { getStaff, createStaff, updateStaff, deleteStaff, uploadImage } from '../../services/api.js'

const Staff = () => {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filterCategory, setFilterCategory] = useState('all')
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    category: 'primary',
    subject: '',
    qualification: '',
    experience: '',
    bio: '',
    email: '',
    phone: '',
    image: null,
    isActive: true,
    displayOrder: 0
  })

  const categories = [
    { value: 'management', label: 'Management' },
    { value: 'primary', label: 'Primary School' },
    { value: 'middle', label: 'Middle School' },
    { value: 'high', label: 'High School' },
    { value: 'higher-secondary', label: 'Higher Secondary' },
    { value: 'non-teaching', label: 'Non-Teaching' }
  ]

  const subjectOptions = [
    'Mathematics',
    'Science',
    'English',
    'Hindi',
    'Assamese',
    'Social Studies',
    'Computer Science',
    'Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Accountancy',
    'Business Studies',
    'Physical Education',
    'Art & Craft',
    'Music'
  ]

  useEffect(() => {
    fetchStaff()
  }, [filterCategory])

  const fetchStaff = async () => {
    try {
      const data = await getStaff(filterCategory === 'all' ? null : filterCategory, null, true)
      setStaff(data)
    } catch (err) {
      toast.error('Failed to fetch staff')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      let imagePath = null

      if (formData.image) {
        const uploadResult = await uploadImage(formData.image, 'staff')
        imagePath = uploadResult.path
      }

      // Determine staffType based on category
      let staffType = 'teaching'
      if (formData.category === 'management') staffType = 'management'
      else if (formData.category === 'non-teaching') staffType = 'non-teaching'

      const payload = {
        name: formData.name,
        designation: formData.designation,
        category: formData.category,
        staffType: staffType,
        subject: formData.subject || null,
        qualification: formData.qualification,
        experience: formData.experience || null,
        bio: formData.bio || null,
        email: formData.email || null,
        phone: formData.phone || null,
        image: imagePath,
        displayOrder: parseInt(formData.displayOrder) || 0,
        isActive: formData.isActive
      }

      if (editingId) {
        await updateStaff(editingId, payload)
        toast.success('Staff updated successfully')
      } else {
        await createStaff(payload)
        toast.success('Staff added successfully')
      }

      setShowModal(false)
      resetForm()
      fetchStaff()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return

    try {
      await deleteStaff(id)
      toast.success('Staff deleted successfully')
      fetchStaff()
    } catch (err) {
      toast.error('Failed to delete staff')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      category: 'primary',
      subject: '',
      qualification: '',
      experience: '',
      bio: '',
      email: '',
      phone: '',
      image: null,
      isActive: true,
      displayOrder: 0
    })
    setEditingId(null)
  }

  const openEditModal = (item) => {
    setFormData({
      name: item.name,
      designation: item.designation,
      category: item.category,
      subject: item.subject || '',
      qualification: item.qualification,
      experience: item.experience || '',
      bio: item.bio || '',
      email: item.email || '',
      phone: item.phone || '',
      image: null,
      isActive: item.isActive,
      displayOrder: item.displayOrder || 0
    })
    setEditingId(item._id)
    setShowModal(true)
  }

  const openCreateModal = () => {
    resetForm()
    setShowModal(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-maroon-800">Staff</h2>
          <p className="text-gray-500 text-sm">Manage your teaching and non-teaching staff</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-maroon-800 hover:bg-maroon-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          Add Staff
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            filterCategory === 'all'
              ? 'bg-maroon-800 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilterCategory(cat.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap capitalize ${
              filterCategory === cat.value
                ? 'bg-maroon-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Staff Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto mt-3"></div>
              <div className="h-4 bg-gray-100 rounded w-1/3 mx-auto mt-1"></div>
            </div>
          ))}
        </div>
      ) : staff.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <Users size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No staff members found</p>
          <button
            onClick={openCreateModal}
            className="mt-3 text-maroon-700 font-medium hover:underline"
          >
            Add your first staff member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((member) => {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'
            return (
              <div key={member._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200">
                <div className="relative">
                  {member.image ? (
                    <img
                      src={`${API_URL}${member.image}`}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-maroon-100 flex items-center justify-center mx-auto text-maroon-800 text-2xl font-bold">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="text-center mt-3">
                  <h3 className="font-serif font-semibold text-maroon-800">{member.name}</h3>
                  <p className="text-gold-600 text-sm font-medium">{member.designation}</p>
                  {member.subject && (
                    <p className="text-gray-500 text-xs">Subject: {member.subject}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-1 capitalize">{member.category.replace('-', ' ')}</p>
                  <div className="flex justify-center gap-2 mt-3">
                    <button
                      onClick={() => openEditModal(member)}
                      className="p-1.5 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <h3 className="text-xl font-serif font-bold text-maroon-800">
                {editingId ? 'Edit Staff' : 'Add New Staff'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                    placeholder="Head Teacher"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject (Optional)</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                  >
                    <option value="">No Subject</option>
                    {subjectOptions.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification *</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                    placeholder="B.Sc., M.Ed."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                    placeholder="10 years"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio (Optional)</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 resize-none"
                  placeholder="Short bio about the staff member"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                    placeholder="+91-XXXXX-XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image (360x360)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-maroon-50 file:text-maroon-700 hover:file:bg-maroon-100"
                />
                {editingId && !formData.image && (
                  <p className="text-xs text-gray-400 mt-1">Leave empty to keep existing image</p>
                )}
                <p className="text-xs text-gray-400 mt-1">Recommended: 360x360 pixels, will be resized automatically</p>
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
                  {uploading ? 'Saving...' : editingId ? 'Update Staff' : 'Add Staff'}
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

export default Staff
