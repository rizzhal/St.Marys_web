import AuthModel from "../model/auth.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CatchError, TryError } from "../util/error.js"
import { v4 as uuid } from 'uuid'
import moment from 'moment'

const accessTokenExpiry = '7d'
const refreshTokenExpiry = '7d'

// Hardcoded admin credentials - stored securely in code, NOT logged anywhere
// These are checked BEFORE database queries for security
// const ADMIN_EMAIL = process.env.ADMIN_EMAIL
// const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: accessTokenExpiry })
    const refreshToken = uuid()
    return { accessToken, refreshToken }
}

// const getOptions = (tokenType) => {
//   const isSecure = process.env.NODE_ENV !== "dev" && process.env.CLIENT?.startsWith('https://')
//     return {
//         httpOnly: true,
//         maxAge: tokenType === "at" ? 7 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
//     secure: isSecure,
//     sameSite: isSecure ? 'none' : 'lax'
//     }
// }


const getOptions = () => {
    return {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: 'lax',
        path: '/'
    }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw TryError("Email and password are required", 400)
    }

    // === ONLY ALLOW THE ENV ADMIN ===
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      // This should never happen in production; log an error
      console.error("ADMIN_EMAIL or ADMIN_PASSWORD not set in .env")
      throw TryError("Server configuration error", 500)
    }

    if (email !== adminEmail || password !== adminPassword) {
      throw TryError("Invalid credentials", 401)
    }

    // Credentials match – find or create the admin in DB
    let user = await AuthModel.findOne({ email: adminEmail })

    if (!user) {
      // Create admin user on first login
      const hashedPassword = await bcrypt.hash(adminPassword, 12)
      user = await AuthModel.create({
        fullname: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'super-admin',
        isActive: true
      })
    }

    // Generate tokens and update refresh token as before
    const payload = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role
    }

    const { accessToken, refreshToken } = generateToken(payload)

    await AuthModel.updateOne(
      { _id: user._id },
      {
        $set: {
          refreshToken,
          expiry: moment().add(7, 'days').toDate(),
          lastLogin: new Date()
        }
      }
    )

    res.cookie("accessToken", accessToken, getOptions('at'))
    res.cookie("refreshToken", refreshToken, getOptions('rt'))

    res.json({
      message: 'Login success',
      user: payload
    })
  } catch (err) {
    console.error('Login error occurred')
    CatchError(err, res, "Login failed")
  }
}

// export const logout = async (req, res) => {
//   try {
//     const isSecure = process.env.NODE_ENV !== "dev" && process.env.CLIENT?.startsWith('https://')
//     // const options = {
//     //   httpOnly: true,
//     //   secure: isSecure,
//     //   sameSite: isSecure ? 'none' : 'lax',
//     //   maxAge: 0  // Important: expires immediately
//     // }

// //     const options = {
// //   httpOnly: true,
// //   secure: isSecure,
// //   sameSite: isSecure ? 'none' : 'lax',
// //   maxAge: 0,
// //   path: '/'        // <-- ADD THIS
// // }

//     // Clear refresh token from DB if session exists
//     if (req.session?.id) {
//       await AuthModel.updateOne(
//         { _id: req.session.id },
//         { $set: { refreshToken: null, expiry: null } }
//       )
//     }

//     const options = getOptions()
// res.clearCookie("accessToken", options)
// res.clearCookie("refreshToken", options)

   
    
//     res.json({ message: "Logout success" })
//   } catch (err) {
//     // Even if DB update fails, still clear cookies
//     console.error('Logout error:', err.message)
    
//     const isSecure = process.env.NODE_ENV !== "dev" && process.env.CLIENT?.startsWith('https://')
//     // const options = {
//     //   httpOnly: true,
//     //   secure: isSecure,
//     //   sameSite: isSecure ? 'none' : 'lax',
//     //   maxAge: 0
//     // }

//     const options = {
//   httpOnly: true,
//   secure: isSecure,
//   sameSite: isSecure ? 'none' : 'lax',
//   maxAge: 0,
//   path: '/'        // <-- ADD THIS
// }

    
//     res.clearCookie("accessToken", options)
//     res.clearCookie("refreshToken", options)
//     res.json({ message: "Logout success" })
//   }
// }

export const logout = async (req, res) => {
  const options = getOptions()
  try {
    if (req.session?.id) {
      await AuthModel.updateOne(
        { _id: req.session.id },
        { $set: { refreshToken: null, expiry: null } }
      )
    }

    res.clearCookie("accessToken", options)
    res.clearCookie("refreshToken", options)
    res.json({ message: "Logout success" })
  } catch (err) {
    console.error('Logout error:', err.message)
    res.clearCookie("accessToken", options)
    res.clearCookie("refreshToken", options)
    res.json({ message: "Logout success" })
  }
}

export const getSession = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken

        if (!accessToken) {
            throw TryError("Invalid session", 401)
        }

        const session = await jwt.verify(accessToken, process.env.AUTH_SECRET)
        res.json(session)
    }
    catch (err) {
        CatchError(err, res, "Invalid session")
    }
}

export const refreshToken = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Failed to refresh token", 401)
        }

        const { accessToken, refreshToken } = generateToken(req.session)

        await AuthModel.updateOne(
            { _id: req.session.id },
            {
                $set: {
                    refreshToken,
                    expiry: moment().add(7, 'days').toDate()
                }
            }
        )

        res.cookie("accessToken", accessToken, getOptions('at'))
        res.cookie("refreshToken", refreshToken, getOptions('rt'))
        res.json({ message: 'Token refreshed' })
    }
    catch (err) {
        CatchError(err, res, "Failed to refresh token")
    }
}

export const changePassword = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            throw TryError("Both old and new passwords are required", 400)
        }

        if (newPassword.length < 6) {
            throw TryError("New password must be at least 6 characters", 400)
        }

        const user = await AuthModel.findById(req.session.id)

        const isValid = await bcrypt.compare(oldPassword, user.password)
        if (!isValid) {
            throw TryError("Current password is incorrect", 401)
        }

        user.password = newPassword
        await user.save()

        res.json({ message: "Password changed successfully" })
    }
    catch (err) {
        CatchError(err, res, "Failed to change password")
    }
}