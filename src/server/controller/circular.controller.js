// import CircularModel from "../model/circular.model.js"
// import { CatchError, TryError } from "../util/error.js"
// import fs from 'fs'
// import path from 'path'

// // Helper function to delete a file given its stored path
// const deleteFileIfExists = (filePath) => {
//     if (!filePath) return false
    
//     // Remove leading slash if present to get a relative path
//     const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath
//     const fullPath = path.join(process.cwd(), cleanPath)
    
//     if (fs.existsSync(fullPath)) {
//         fs.unlinkSync(fullPath)
//         return true
//     }
//     return false
// }

// export const createCircular = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const { title, content, date, time, isPublished, fileUrl } = req.body

//         if (!title || !content) {
//             throw TryError("Title and content are required", 400)
//         }

//         const circular = await CircularModel.create({
//             title,
//             content,
//             date: date || new Date(),
//             time: time || '10:00 AM',
//             fileUrl: fileUrl || null,
//             isPublished: isPublished !== undefined ? isPublished : true,
//             createdBy: req.session.id
//         })

//         res.status(201).json({ message: "Circular created successfully", circular })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to create circular")
//     }
// }

// export const getCirculars = async (req, res) => {
//     try {
//         const { all } = req.query
        
//         let filter = {}
//         if (all !== 'true') {
//             filter.isPublished = true
//         }

//         const circulars = await CircularModel.find(filter)
//             .populate('createdBy', 'fullname email')
//             .sort({ date: -1, createdAt: -1 })

//         res.json(circulars)
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to fetch circulars")
//     }
// }

// export const getCircularById = async (req, res) => {
//     try {
//         const circular = await CircularModel.findById(req.params.id)
//             .populate('createdBy', 'fullname email')

//         if (!circular) {
//             throw TryError("Circular not found", 404)
//         }

//         res.json(circular)
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to fetch circular")
//     }
// }

// export const updateCircular = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const circular = await CircularModel.findById(req.params.id)

//         if (!circular) {
//             throw TryError("Circular not found", 404)
//         }

//         const { title, content, date, time, isPublished, fileUrl } = req.body

//         // If file is being replaced, delete old file
//         if (fileUrl && circular.fileUrl && fileUrl !== circular.fileUrl) {
//             deleteFileIfExists(circular.fileUrl)
//         }

//         const updated = await CircularModel.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set: {
//                     title: title || circular.title,
//                     content: content || circular.content,
//                     date: date || circular.date,
//                     time: time || circular.time,
//                     fileUrl: fileUrl || circular.fileUrl,
//                     isPublished: isPublished !== undefined ? isPublished : circular.isPublished
//                 }
//             },
//             { new: true }
//         )

//         res.json({ message: "Circular updated successfully", circular: updated })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to update circular")
//     }
// }

// export const deleteCircular = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const circular = await CircularModel.findById(req.params.id)

//         if (!circular) {
//             throw TryError("Circular not found", 404)
//         }

//         // Delete associated file
//         if (circular.fileUrl) {
//             deleteFileIfExists(circular.fileUrl)
//         }

//         await CircularModel.findByIdAndDelete(req.params.id)

//         res.json({ message: "Circular deleted successfully" })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to delete circular")
//     }
// }




import CircularModel from "../model/circular.model.js"
import { CatchError, TryError } from "../util/error.js"
import { deleteFileFromSupabase } from "../util/imageProcessor.js"

export const createCircular = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const { title, content, date, time, isPublished, fileUrl } = req.body

        if (!title || !content) {
            throw TryError("Title and content are required", 400)
        }

        const circular = await CircularModel.create({
            title,
            content,
            date: date || new Date(),
            time: time || '10:00 AM',
            fileUrl: fileUrl || null,
            isPublished: isPublished !== undefined ? isPublished : true,
            createdBy: req.session.id
        })

        res.status(201).json({ message: "Circular created successfully", circular })
    }
    catch (err) {
        CatchError(err, res, "Failed to create circular")
    }
}

export const getCirculars = async (req, res) => {
    try {
        const { all } = req.query
        
        let filter = {}
        if (all !== 'true') {
            filter.isPublished = true
        }

        const circulars = await CircularModel.find(filter)
            .populate('createdBy', 'fullname email')
            .sort({ date: -1, createdAt: -1 })

        res.json(circulars)
    }
    catch (err) {
        CatchError(err, res, "Failed to fetch circulars")
    }
}

export const getCircularById = async (req, res) => {
    try {
        const circular = await CircularModel.findById(req.params.id)
            .populate('createdBy', 'fullname email')

        if (!circular) {
            throw TryError("Circular not found", 404)
        }

        res.json(circular)
    }
    catch (err) {
        CatchError(err, res, "Failed to fetch circular")
    }
}

export const updateCircular = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const circular = await CircularModel.findById(req.params.id)

        if (!circular) {
            throw TryError("Circular not found", 404)
        }

        const { title, content, date, time, isPublished, fileUrl } = req.body

        // If file is being replaced, delete old file from Supabase
        if (fileUrl && circular.fileUrl && fileUrl !== circular.fileUrl) {
            await deleteFileFromSupabase(circular.fileUrl)
        }

        const updated = await CircularModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: title || circular.title,
                    content: content || circular.content,
                    date: date || circular.date,
                    time: time || circular.time,
                    fileUrl: fileUrl || circular.fileUrl,
                    isPublished: isPublished !== undefined ? isPublished : circular.isPublished
                }
            },
            { new: true }
        )

        res.json({ message: "Circular updated successfully", circular: updated })
    }
    catch (err) {
        CatchError(err, res, "Failed to update circular")
    }
}

export const deleteCircular = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const circular = await CircularModel.findById(req.params.id)

        if (!circular) {
            throw TryError("Circular not found", 404)
        }

        // Delete associated file from Supabase
        if (circular.fileUrl) {
            await deleteFileFromSupabase(circular.fileUrl)
        }

        await CircularModel.findByIdAndDelete(req.params.id)

        res.json({ message: "Circular deleted successfully" })
    }
    catch (err) {
        CatchError(err, res, "Failed to delete circular")
    }
}