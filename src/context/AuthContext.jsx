'use client'

// import React, { createContext, useState, useContext, useEffect } from 'react'
// import { login as apiLogin, logout as apiLogout, getSession } from '../services/api.js'

// const AuthContext = createContext()

// export const useAuth = () => useContext(AuthContext)

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     checkSession()
//   }, [])

//   const checkSession = async () => {
//     try {
//       const data = await getSession()
//       setUser(data)
//     } catch {
//       setUser(null)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const login = async (email, password) => {
//     const data = await apiLogin(email, password)
//     setUser(data.user)
//     return data
//   }

//   const logout = async () => {
//     try {
//       await apiLogout()
//     } catch {
//       // Silently handle logout errors
//     } finally {
//       setUser(null)
//       window.location.href = '/login'
//     }
//   }

//   return (
//     <AuthContext.Provider value={{
//       user,
//       loading,
//       login,
//       logout,
//       isAuthenticated: !!user,
//       isAdmin: user?.role === 'admin' || user?.role === 'super-admin'
//     }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }





// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import { login as apiLogin, logout as apiLogout, getSession } from '../services/api.js'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const data = await getSession()
      setUser(data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const data = await apiLogin(email, password)
    setUser(data.user)
    return data
  }

  const logout = async () => {
    try {
      await apiLogout()
    } catch {
      // Silent
    } finally {
      setUser(null)
      window.location.href = '/login'
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin' || user?.role === 'super-admin'
    }}>
      {children}
    </AuthContext.Provider>
  )
}