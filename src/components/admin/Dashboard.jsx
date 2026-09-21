'use client'

import React, { useState, useEffect } from 'react'
import { FileText, Users, Image, BookOpen, ShieldCheck, Plus, ArrowUp, ArrowDown } from 'lucide-react'
import Link from 'next/link'
import { getCirculars, getStaff, getGallery, getSyllabus } from '../../services/api.js'

const Dashboard = () => {
  const [stats, setStats] = useState({
    circulars: 0,
    staff: 0,
    gallery: 0,
    syllabus: 0,
  })
  const [recentCirculars, setRecentCirculars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {      
      const results = await Promise.allSettled([
        getCirculars(true),                         // all=true
        getStaff(null, null, true),                 // category=null, staffType=null, all=true
        getGallery(1, 100, true),                   // page=1, limit=100, all=true – returns { data, pagination }
        getSyllabus(null, null, null, true),        // classNum=null, academicYear=null, stream=null, all=true                      // all=true
      ])

      const getValue = (result, fallback) =>
        result.status === 'fulfilled' ? result.value : fallback

      const circulars = getValue(results[0], [])
      const staff = getValue(results[1], [])
      const galleryResponse = getValue(results[2], { data: [] })
      const syllabus = getValue(results[3], [])

      setStats({
        circulars: circulars.length || 0,
        staff: staff.length || 0,
        gallery: galleryResponse.data?.length || 0,
        syllabus: syllabus.length || 0
      })

      setRecentCirculars(circulars.slice(0, 5))
    } catch (err) {
      console.error('Dashboard fetch error:', err)
      // Set default values so dashboard doesn't break
      setStats({
        circulars: 0,
        staff: 0,
        gallery: 0,
        syllabus: 0
      })
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { title: 'Circulars', value: stats.circulars, icon: <FileText size={24} />, path: '/admin/circulars', color: 'bg-blue-50 text-blue-700' },
    { title: 'Staff Members', value: stats.staff, icon: <Users size={24} />, path: '/admin/staff', color: 'bg-green-50 text-green-700' },
    { title: 'Gallery Images', value: stats.gallery, icon: <Image size={24} />, path: '/admin/gallery', color: 'bg-purple-50 text-purple-700' },
    { title: 'Syllabus', value: stats.syllabus, icon: <BookOpen size={24} />, path: '/admin/syllabus', color: 'bg-orange-50 text-orange-700' }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-maroon-800">Dashboard</h2>
        <span className="text-sm text-gray-500">Welcome back, Admin</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.path}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-maroon-200 group"
          >
            <div className={`inline-flex p-2 rounded-lg ${stat.color} mb-2`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </Link>
        ))}
      </div>

      {/* Recent Circulars */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-semibold text-lg text-maroon-800">Recent Circulars</h3>
          <Link href="/admin/circulars" className="text-sm text-maroon-700 hover:text-maroon-900 font-medium">
            View All →
          </Link>
        </div>

        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse py-3 border-b border-gray-100">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2 mt-2"></div>
            </div>
          ))
        ) : recentCirculars.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <FileText size={40} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No circulars yet</p>
            <Link href="/admin/circulars" className="text-maroon-700 text-sm font-medium hover:underline">
              Create your first circular →
            </Link>
          </div>
        ) : (
          recentCirculars.map((circular) => (
            <div key={circular._id} className="py-3 border-b border-gray-100 last:border-0">
              <Link href="/admin/circulars" className="block hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors">
                <p className="font-medium text-gray-800">{circular.title}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                  <span>{new Date(circular.date).toLocaleDateString()}</span>
                  <span className={`px-2 py-0.5 rounded-full ${circular.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {circular.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard