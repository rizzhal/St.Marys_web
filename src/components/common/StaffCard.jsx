'use client'

// import React from 'react'
// import { Mail, Phone } from 'lucide-react'
// import Card from './Card.jsx'

// const StaffCard = ({ staff }) => {
//   return (
//     <Card className="text-center p-6">
//       <div className="relative inline-block">
//         <img
//           src={staff.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(staff.name) + '&background=7A0C1E&color=fff&size=120'}
//           alt={staff.name}
//           className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-maroon-100"
//           loading="lazy"
//         />
//       </div>
//       <h4 className="font-serif font-semibold text-lg text-maroon-800 mt-3">
//         {staff.name}
//       </h4>
//       <p className="text-gold-600 font-medium text-sm">{staff.designation}</p>
//       <p className="text-gray-500 text-sm mt-1">{staff.qualification}</p>
//       <p className="text-gray-400 text-xs">Experience: {staff.experience}</p>
//       <div className="flex justify-center gap-3 mt-3">
//         {staff.email && (
//           <a href={`mailto:${staff.email}`} className="text-gray-400 hover:text-maroon-700 transition-colors">
//             <Mail size={16} />
//           </a>
//         )}
//         {staff.phone && (
//           <a href={`tel:${staff.phone}`} className="text-gray-400 hover:text-maroon-700 transition-colors">
//             <Phone size={16} />
//           </a>
//         )}
//       </div>
//     </Card>
//   )
// }

// export default StaffCard



import React from 'react'
import { Mail, Phone } from 'lucide-react'
import Card from './Card.jsx'

const StaffCard = ({ staff }) => {
  // Helper to get full image URL
  const getImageUrl = (path) => {
    if (!path) return null
    if (path.startsWith('http')) return path
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'
    return `${API_URL}${path}`
  }

  return (
    <Card className="text-center p-6">
      <div className="relative inline-block">
        <img
          src={getImageUrl(staff.image) || `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.name)}&background=7A0C1E&color=fff&size=120`}
          alt={staff.name}
          className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-maroon-100"
          loading="lazy"
        />
      </div>
      <h4 className="font-serif font-semibold text-lg text-maroon-800 mt-3">
        {staff.name}
      </h4>
      <p className="text-gold-600 font-medium text-sm">{staff.designation}</p>
      <p className="text-gray-500 text-sm mt-1">{staff.qualification}</p>
      <p className="text-gray-400 text-xs">Experience: {staff.experience}</p>
      <div className="flex justify-center gap-3 mt-3">
        {staff.email && (
          <a href={`mailto:${staff.email}`} className="text-gray-400 hover:text-maroon-700 transition-colors">
            <Mail size={16} />
          </a>
        )}
        {staff.phone && (
          <a href={`tel:${staff.phone}`} className="text-gray-400 hover:text-maroon-700 transition-colors">
            <Phone size={16} />
          </a>
        )}
      </div>
    </Card>
  )
}

export default StaffCard