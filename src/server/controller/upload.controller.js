// import { CatchError, TryError } from "../util/error.js"
// import { processAndSaveImage } from "../util/imageProcessor.js"
// import fs from 'fs'
// import path from 'path'
// import { v4 as uuid } from 'uuid'

// export const uploadImage = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         if (!req.file) {
//             throw TryError("No image file provided", 400)
//         }

//         const folder = req.query.folder || 'gallery'
//         const imagePath = await processAndSaveImage(req.file, folder)

//         res.json({
//             message: "Image uploaded successfully",
//             path: imagePath
//         })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to upload image")
//     }
// }

// export const uploadMultipleImages = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         if (!req.files || req.files.length === 0) {
//             throw TryError("No images provided", 400)
//         }

//         if (req.files.length > 4) {
//             throw TryError("Maximum 4 images can be uploaded at once", 400)
//         }

//         const folder = req.query.folder || 'gallery'
//         const results = []

//         for (const file of req.files) {
//             const imagePath = await processAndSaveImage(file, folder)
//             results.push(imagePath)
//         }

//         res.json({
//             message: `${results.length} images uploaded successfully`,
//             images: results
//         })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to upload images")
//     }
// }

// export const uploadPDF = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         if (!req.file) {
//             throw TryError("No PDF file provided", 400)
//         }

//         const folder = req.query.folder || 'syllabus'
//         const uploadDir = path.join(process.cwd(), 'uploads', folder)
        
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true })
//         }

//         const ext = path.extname(req.file.originalname)
//         const filename = `${uuid()}${ext}`
//         const filePath = path.join(uploadDir, filename)

//         // Move file to destination
//         fs.renameSync(req.file.path, filePath)

//         const url = `/uploads/${folder}/${filename}`

//         res.json({
//             message: "PDF uploaded successfully",
//             path: url,
//             filename: req.file.originalname
//         })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to upload PDF")
//     }
// }

// export const deleteFile = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const { filePath } = req.body

//         if (!filePath) {
//             throw TryError("File path is required", 400)
//         }

//         const fullPath = path.join(process.cwd(), filePath)
        
//         if (fs.existsSync(fullPath)) {
//             fs.unlinkSync(fullPath)
//             res.json({ message: "File deleted successfully" })
//         } else {
//             throw TryError("File not found", 404)
//         }
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to delete file")
//     }
// }




import { CatchError, TryError } from "../util/error.js"
import {
  processAndSaveImage,
  uploadPDFToSupabase,
  deleteFileFromSupabase
} from "../util/imageProcessor.js"

export const uploadImage = async (req, res) => {
  try {
    if (!req.session) throw TryError("Unauthorized", 401)
    if (!req.file) throw TryError("No image file provided", 400)

    const folder = req.query.folder || 'gallery'
    const imagePath = await processAndSaveImage(req.file, folder)

    res.json({
      message: "Image uploaded successfully",
      path: imagePath
    })
  } catch (err) {
    CatchError(err, res, "Failed to upload image")
  }
}

export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.session) throw TryError("Unauthorized", 401)
    if (!req.files || req.files.length === 0) throw TryError("No images provided", 400)
    if (req.files.length > 4) throw TryError("Maximum 4 images can be uploaded at once", 400)

    const folder = req.query.folder || 'gallery'
    const results = []
    for (const file of req.files) {
      const imagePath = await processAndSaveImage(file, folder)
      results.push(imagePath)
    }

    res.json({
      message: `${results.length} images uploaded successfully`,
      images: results
    })
  } catch (err) {
    CatchError(err, res, "Failed to upload images")
  }
}

export const uploadPDF = async (req, res) => {
  try {
    if (!req.session) throw TryError("Unauthorized", 401)
    if (!req.file) throw TryError("No PDF file provided", 400)

    const folder = req.query.folder || 'syllabus'
    const pdfUrl = await uploadPDFToSupabase(req.file, folder)

    res.json({
      message: "PDF uploaded successfully",
      path: pdfUrl,
      filename: req.file.originalname
    })
  } catch (err) {
    CatchError(err, res, "Failed to upload PDF")
  }
}

export const deleteFile = async (req, res) => {
  try {
    if (!req.session) throw TryError("Unauthorized", 401)
    const { filePath } = req.body
    if (!filePath) throw TryError("File path is required", 400)

    const deleted = await deleteFileFromSupabase(filePath)
    if (deleted) {
      res.json({ message: "File deleted successfully" })
    } else {
      throw TryError("File not found or could not be deleted", 404)
    }
  } catch (err) {
    CatchError(err, res, "Failed to delete file")
  }
}