// import sharp from 'sharp'
// import path from 'path'
// import fs from 'fs'
// import { v4 as uuid } from 'uuid'

// const TARGET_SIZE = 360
// const QUALITY = 80

// export const processAndSaveImage = async (file, folder = 'gallery') => {
//     try {
//         // Validate input
//         if (!file) {
//             throw new Error('No file provided')
//         }

//         // Determine the source path
//         const sourcePath = file.path || file.buffer
//         if (!sourcePath) {
//             throw new Error('No file path or buffer found')
//         }

//         // Ensure the upload directory exists
//         const uploadDir = path.join(process.cwd(), 'uploads', folder)
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true })
//         }

//         // Generate a unique filename with .webp extension
//         const filename = `${uuid()}.webp`
//         const outputPath = path.join(uploadDir, filename)

//         // Process image with sharp
//         const image = sharp(sourcePath)
//         const metadata = await image.metadata()

//         // Resize only if larger than target size
//         let resizeOptions = {}
//         if (metadata.width > TARGET_SIZE || metadata.height > TARGET_SIZE) {
//             resizeOptions = {
//                 width: TARGET_SIZE,
//                 height: TARGET_SIZE,
//                 fit: 'cover',
//                 position: 'center'
//             }
//         }

//         // Save as WebP with compression
//         await image
//             .resize(resizeOptions)
//             .webp({ quality: QUALITY })
//             .toFile(outputPath)

//         // Clean up the temporary multer file (if it exists)
//         if (file.path && fs.existsSync(file.path)) {
//             fs.unlinkSync(file.path)
//         }

//         // Return the public URL path
//         return `/uploads/${folder}/${filename}`
//     } catch (err) {
//         console.error('Image processing error:', err.message)
//         // If a temp file exists, try to clean it up
//         if (file?.path && fs.existsSync(file.path)) {
//             try { fs.unlinkSync(file.path) } catch (e) {}
//         }
//         throw err
//     }
// }

// export const deleteImage = (imagePath) => {
//     try {
//         if (!imagePath) return false
//         // Remove leading slash if present
//         const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath
//         const fullPath = path.join(process.cwd(), cleanPath)
//         if (fs.existsSync(fullPath)) {
//             fs.unlinkSync(fullPath)
//             return true
//         }
//         return false
//     } catch (err) {
//         console.error('Error deleting image:', err.message)
//         return false
//     }
// }

// export const deleteMultipleImages = (imagePaths) => {
//     let deleted = 0
//     for (const imgPath of imagePaths) {
//         if (deleteImage(imgPath)) deleted++
//     }
//     return deleted
// }













import sharp from 'sharp'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { supabase, BUCKET } from './supabase.js'

const TARGET_SIZE = 360
const QUALITY = 80

/**
 * Process image and upload to Supabase Storage
 */
export const processAndSaveImage = async (file, folder = 'gallery') => {
  try {
    if (!file || !file.buffer) {
      throw new Error('No file buffer provided')
    }

    // Process image with sharp
    const image = sharp(file.buffer)
    const metadata = await image.metadata()

    // Resize if larger than target
    let resizeOptions = {}
    if (metadata.width > TARGET_SIZE || metadata.height > TARGET_SIZE) {
      resizeOptions = {
        width: TARGET_SIZE,
        height: TARGET_SIZE,
        fit: 'cover',
        position: 'center'
      }
    }

    const processedBuffer = await image
      .resize(resizeOptions)
      .webp({ quality: QUALITY })
      .toBuffer()

    const filename = `${uuid()}.webp`
    const storagePath = `${folder}/${filename}`

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, processedBuffer, {
        contentType: 'image/webp',
        cacheControl: '3600'
      })

    if (error) {
      console.error('Supabase upload error:', error)
      throw new Error('Failed to upload image')
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath)

    return urlData.publicUrl
  } catch (err) {
    console.error('Image processing error:', err.message)
    throw err
  }
}

/**
 * Upload PDF to Supabase
 */
export const uploadPDFToSupabase = async (file, folder = 'syllabus') => {
  try {
    if (!file || !file.buffer) throw new Error('No PDF buffer provided')

    const ext = file.originalname ? path.extname(file.originalname) : '.pdf'
    const filename = `${uuid()}${ext}`
    const storagePath = `${folder}/${filename}`

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, file.buffer, {
        contentType: 'application/pdf',
        cacheControl: '3600'
      })

    if (error) {
      console.error('PDF upload error:', error)
      throw new Error('Failed to upload PDF')
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath)

    return urlData.publicUrl
  } catch (err) {
    console.error('PDF upload error:', err.message)
    throw err
  }
}

/**
 * Delete a file from Supabase by its public URL
 */
export const deleteFileFromSupabase = async (fileUrl) => {
  if (!fileUrl) return false
  try {
    const url = new URL(fileUrl)
    const pathParts = url.pathname.split('/')
    const bucketIndex = pathParts.indexOf('public') + 1
    const bucket = pathParts[bucketIndex]
    const filePath = pathParts.slice(bucketIndex + 1).join('/')

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      return false
    }
    return true
  } catch (err) {
    console.error('Error deleting file:', err.message)
    return false
  }
}

/**
 * Delete multiple images (utility for gallery)
 */
export const deleteMultipleImages = async (imagePaths) => {
  let deleted = 0
  for (const imgPath of imagePaths) {
    if (await deleteFileFromSupabase(imgPath)) deleted++
  }
  return deleted
}