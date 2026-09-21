// import SyllabusModel from "../model/syllabus.model.js"
// import { CatchError, TryError } from "../util/error.js"
// import fs from 'fs'
// import path from 'path'

// export const createSyllabus = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const { academicYear, class: classNum, stream, fileUrl, fileName, isPublished, displayOrder } = req.body

//         if (!academicYear || !classNum || !fileUrl) {
//             throw TryError("Academic year, class, and file are required", 400)
//         }

//         // Stream is required for class 11 and 12
//         if (['11', '12'].includes(classNum) && !stream) {
//             throw TryError("Stream is required for class 11 and 12", 400)
//         }

//         const syllabus = await SyllabusModel.create({
//             academicYear,
//             class: classNum,
//             stream: stream || 'general',
//             fileUrl,
//             fileName: fileName || null,
//             isPublished: isPublished !== undefined ? isPublished : true,
//             displayOrder: displayOrder || 0,
//             uploadedBy: req.session.id
//         })

//         res.status(201).json({ message: "Syllabus added successfully", syllabus })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to add syllabus")
//     }
// }

// export const getSyllabus = async (req, res) => {
//     try {
//         const { class: classNum, academicYear, stream, all } = req.query

//         let filter = {}
//         if (classNum) filter.class = classNum
//         if (academicYear) filter.academicYear = academicYear
//         if (stream) filter.stream = stream
//         if (all !== 'true') filter.isPublished = true

//         const syllabus = await SyllabusModel.find(filter)
//             .populate('uploadedBy', 'fullname email')
//             .sort({ academicYear: -1, class: 1, displayOrder: 1 })

//         res.json(syllabus)
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to fetch syllabus")
//     }
// }

// export const getSyllabusById = async (req, res) => {
//     try {
//         const syllabus = await SyllabusModel.findById(req.params.id)
//             .populate('uploadedBy', 'fullname email')

//         if (!syllabus) {
//             throw TryError("Syllabus not found", 404)
//         }

//         res.json(syllabus)
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to fetch syllabus")
//     }
// }

// export const getAcademicYears = async (req, res) => {
//     try {
//         const years = await SyllabusModel.distinct('academicYear')
//             .sort({ academicYear: -1 })
//         res.json(years)
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to fetch academic years")
//     }
// }

// export const getClasses = async (req, res) => {
//     try {
//         const { academicYear } = req.query
        
//         let filter = {}
//         if (academicYear) filter.academicYear = academicYear
        
//         const classes = await SyllabusModel.distinct('class', filter)
//             .sort({ class: 1 })
        
//         // Custom sort: KG first, then 1-12
//         const sorted = classes.sort((a, b) => {
//             if (a === 'KG') return -1
//             if (b === 'KG') return 1
//             return parseInt(a) - parseInt(b)
//         })
        
//         res.json(sorted)
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to fetch classes")
//     }
// }

// export const getStreams = async (req, res) => {
//     try {
//         const { class: classNum } = req.query
        
//         let filter = {}
//         if (classNum) filter.class = classNum
        
//         const streams = await SyllabusModel.distinct('stream', filter)
//         res.json(streams.filter(s => s !== 'general'))
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to fetch streams")
//     }
// }

// export const updateSyllabus = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const syllabus = await SyllabusModel.findById(req.params.id)

//         if (!syllabus) {
//             throw TryError("Syllabus not found", 404)
//         }

//         const { academicYear, class: classNum, stream, fileUrl, fileName, isPublished, displayOrder } = req.body

//         // Stream is required for class 11 and 12
//         if (['11', '12'].includes(classNum || syllabus.class) && !stream) {
//             throw TryError("Stream is required for class 11 and 12", 400)
//         }

//         // If file is being replaced, delete old file
//         if (fileUrl && syllabus.fileUrl && fileUrl !== syllabus.fileUrl) {
//             const oldFilePath = path.join(process.cwd(), syllabus.fileUrl)
//             if (fs.existsSync(oldFilePath)) {
//                 fs.unlinkSync(oldFilePath)
//             }
//         }

//         const updated = await SyllabusModel.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set: {
//                     academicYear: academicYear || syllabus.academicYear,
//                     class: classNum || syllabus.class,
//                     stream: stream || syllabus.stream || 'general',
//                     fileUrl: fileUrl || syllabus.fileUrl,
//                     fileName: fileName !== undefined ? fileName : syllabus.fileName,
//                     isPublished: isPublished !== undefined ? isPublished : syllabus.isPublished,
//                     displayOrder: displayOrder !== undefined ? displayOrder : syllabus.displayOrder
//                 }
//             },
//             { new: true }
//         )

//         res.json({ message: "Syllabus updated successfully", syllabus: updated })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to update syllabus")
//     }
// }

// export const deleteSyllabus = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const syllabus = await SyllabusModel.findById(req.params.id)

//         if (!syllabus) {
//             throw TryError("Syllabus not found", 404)
//         }

//         // Delete associated file
//         if (syllabus.fileUrl) {
//             const filePath = path.join(process.cwd(), syllabus.fileUrl)
//             if (fs.existsSync(filePath)) {
//                 fs.unlinkSync(filePath)
//             }
//         }

//         await SyllabusModel.findByIdAndDelete(req.params.id)

//         res.json({ message: "Syllabus deleted successfully" })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to delete syllabus")
//     }
// }






import SyllabusModel from "../model/syllabus.model.js"
import { CatchError, TryError } from "../util/error.js"
import { deleteFileFromSupabase } from "../util/imageProcessor.js"

export const createSyllabus = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const { academicYear, class: classNum, stream, fileUrl, fileName, isPublished, displayOrder } = req.body

        if (!academicYear || !classNum || !fileUrl) {
            throw TryError("Academic year, class, and file are required", 400)
        }

        // Stream is required for class 11 and 12
        if (['11', '12'].includes(classNum) && !stream) {
            throw TryError("Stream is required for class 11 and 12", 400)
        }

        const syllabus = await SyllabusModel.create({
            academicYear,
            class: classNum,
            stream: stream || 'general',
            fileUrl,
            fileName: fileName || null,
            isPublished: isPublished !== undefined ? isPublished : true,
            displayOrder: displayOrder || 0,
            uploadedBy: req.session.id
        })

        res.status(201).json({ message: "Syllabus added successfully", syllabus })
    }
    catch (err) {
        CatchError(err, res, "Failed to add syllabus")
    }
}

export const getSyllabus = async (req, res) => {
    try {
        const { class: classNum, academicYear, stream, all } = req.query

        let filter = {}
        if (classNum) filter.class = classNum
        if (academicYear) filter.academicYear = academicYear
        if (stream) filter.stream = stream
        if (all !== 'true') filter.isPublished = true

        const syllabus = await SyllabusModel.find(filter)
            .populate('uploadedBy', 'fullname email')
            .sort({ academicYear: -1, class: 1, displayOrder: 1 })

        res.json(syllabus)
    }
    catch (err) {
        CatchError(err, res, "Failed to fetch syllabus")
    }
}

export const getSyllabusById = async (req, res) => {
    try {
        const syllabus = await SyllabusModel.findById(req.params.id)
            .populate('uploadedBy', 'fullname email')

        if (!syllabus) {
            throw TryError("Syllabus not found", 404)
        }

        res.json(syllabus)
    }
    catch (err) {
        CatchError(err, res, "Failed to fetch syllabus")
    }
}

export const getAcademicYears = async (req, res) => {
    try {
        const years = await SyllabusModel.distinct('academicYear')
            .sort({ academicYear: -1 })
        res.json(years)
    }
    catch (err) {
        CatchError(err, res, "Failed to fetch academic years")
    }
}

export const getClasses = async (req, res) => {
    try {
        const { academicYear } = req.query
        
        let filter = {}
        if (academicYear) filter.academicYear = academicYear
        
        const classes = await SyllabusModel.distinct('class', filter)
            .sort({ class: 1 })
        
        // Custom sort: KG first, then 1-12
        const sorted = classes.sort((a, b) => {
            if (a === 'KG') return -1
            if (b === 'KG') return 1
            return parseInt(a) - parseInt(b)
        })
        
        res.json(sorted)
    }
    catch (err) {
        CatchError(err, res, "Failed to fetch classes")
    }
}

export const getStreams = async (req, res) => {
    try {
        const { class: classNum } = req.query
        
        let filter = {}
        if (classNum) filter.class = classNum
        
        const streams = await SyllabusModel.distinct('stream', filter)
        res.json(streams.filter(s => s !== 'general'))
    }
    catch (err) {
        CatchError(err, res, "Failed to fetch streams")
    }
}

export const updateSyllabus = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const syllabus = await SyllabusModel.findById(req.params.id)

        if (!syllabus) {
            throw TryError("Syllabus not found", 404)
        }

        const { academicYear, class: classNum, stream, fileUrl, fileName, isPublished, displayOrder } = req.body

        // Stream is required for class 11 and 12
        if (['11', '12'].includes(classNum || syllabus.class) && !stream) {
            throw TryError("Stream is required for class 11 and 12", 400)
        }

        // If file is being replaced, delete old file from Supabase
        if (fileUrl && syllabus.fileUrl && fileUrl !== syllabus.fileUrl) {
            await deleteFileFromSupabase(syllabus.fileUrl)
        }

        const updated = await SyllabusModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    academicYear: academicYear || syllabus.academicYear,
                    class: classNum || syllabus.class,
                    stream: stream || syllabus.stream || 'general',
                    fileUrl: fileUrl || syllabus.fileUrl,
                    fileName: fileName !== undefined ? fileName : syllabus.fileName,
                    isPublished: isPublished !== undefined ? isPublished : syllabus.isPublished,
                    displayOrder: displayOrder !== undefined ? displayOrder : syllabus.displayOrder
                }
            },
            { new: true }
        )

        res.json({ message: "Syllabus updated successfully", syllabus: updated })
    }
    catch (err) {
        CatchError(err, res, "Failed to update syllabus")
    }
}

export const deleteSyllabus = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const syllabus = await SyllabusModel.findById(req.params.id)

        if (!syllabus) {
            throw TryError("Syllabus not found", 404)
        }

        // Delete associated file from Supabase
        if (syllabus.fileUrl) {
            await deleteFileFromSupabase(syllabus.fileUrl)
        }

        await SyllabusModel.findByIdAndDelete(req.params.id)

        res.json({ message: "Syllabus deleted successfully" })
    }
    catch (err) {
        CatchError(err, res, "Failed to delete syllabus")
    }
}