// import StaffModel from "../model/staff.model.js"
// import { CatchError, TryError } from "../util/error.js"
// import { deleteImage } from "../util/imageProcessor.js"
// import fs from 'fs'
// import path from 'path'

// export const createStaff = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const { name, designation, category, staffType, subject, qualification, experience, bio, email, phone, displayOrder, isActive } = req.body

//         if (!name || !designation || !category || !staffType || !qualification) {
//             throw TryError("Name, designation, category, staff type, and qualification are required", 400)
//         }

//         // Validate category based on staffType
//         if (staffType === 'teaching' && !['primary', 'middle', 'high', 'higher-secondary'].includes(category)) {
//             throw TryError("Teaching staff must be assigned to a school section (primary, middle, high, higher-secondary)", 400)
//         }

//         if (staffType === 'management' && category !== 'management') {
//             throw TryError("Management staff must have category 'management'", 400)
//         }

//         if (staffType === 'non-teaching' && category !== 'non-teaching') {
//             throw TryError("Non-teaching staff must have category 'non-teaching'", 400)
//         }

//         const staff = await StaffModel.create({
//             name,
//             designation,
//             category,
//             staffType,
//             subject: subject || null,
//             qualification,
//             experience: experience || null,
//             bio: bio || null,
//             email: email || null,
//             phone: phone || null,
//             image: req.body.image || null,
//             displayOrder: displayOrder || 0,
//             isActive: isActive !== undefined ? isActive : true
//         })

//         res.status(201).json({ message: "Staff added successfully", staff })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to add staff")
//     }
// }

// export const getStaff = async (req, res) => {
//     try {
//         const { category, staffType, all } = req.query

//         let filter = {}
//         if (category) filter.category = category
//         if (staffType) filter.staffType = staffType
//         if (all !== 'true') filter.isActive = true

//         const staff = await StaffModel.find(filter)
//             .sort({ staffType: 1, category: 1, displayOrder: 1, name: 1 })

//         res.json(staff)
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to fetch staff")
//     }
// }

// export const getStaffById = async (req, res) => {
//     try {
//         const staff = await StaffModel.findById(req.params.id)

//         if (!staff) {
//             throw TryError("Staff not found", 404)
//         }

//         res.json(staff)
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to fetch staff")
//     }
// }

// export const updateStaff = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const staff = await StaffModel.findById(req.params.id)

//         if (!staff) {
//             throw TryError("Staff not found", 404)
//         }

//         const { name, designation, category, staffType, subject, qualification, experience, bio, email, phone, displayOrder, isActive } = req.body

//         // Validate category based on staffType
//         if (staffType === 'teaching' && !['primary', 'middle', 'high', 'higher-secondary'].includes(category)) {
//             throw TryError("Teaching staff must be assigned to a school section (primary, middle, high, higher-secondary)", 400)
//         }

//         if (staffType === 'management' && category !== 'management') {
//             throw TryError("Management staff must have category 'management'", 400)
//         }

//         if (staffType === 'non-teaching' && category !== 'non-teaching') {
//             throw TryError("Non-teaching staff must have category 'non-teaching'", 400)
//         }

//         // Handle image update - delete old image if new image is provided
//         let image = staff.image
//         if (req.body.image && req.body.image !== staff.image) {
//             if (staff.image) {
//                 deleteImage(staff.image)
//             }
//             image = req.body.image
//         }

//         const updated = await StaffModel.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set: {
//                     name: name || staff.name,
//                     designation: designation || staff.designation,
//                     category: category || staff.category,
//                     staffType: staffType || staff.staffType,
//                     subject: subject !== undefined ? subject : staff.subject,
//                     qualification: qualification || staff.qualification,
//                     experience: experience !== undefined ? experience : staff.experience,
//                     bio: bio !== undefined ? bio : staff.bio,
//                     email: email !== undefined ? email : staff.email,
//                     phone: phone !== undefined ? phone : staff.phone,
//                     image,
//                     displayOrder: displayOrder !== undefined ? displayOrder : staff.displayOrder,
//                     isActive: isActive !== undefined ? isActive : staff.isActive
//                 }
//             },
//             { new: true }
//         )

//         res.json({ message: "Staff updated successfully", staff: updated })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to update staff")
//     }
// }

// export const deleteStaff = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const staff = await StaffModel.findById(req.params.id)

//         if (!staff) {
//             throw TryError("Staff not found", 404)
//         }

//         // Delete associated image
//         if (staff.image) {
//             deleteImage(staff.image)
//         }

//         await StaffModel.findByIdAndDelete(req.params.id)

//         res.json({ message: "Staff deleted successfully" })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to delete staff")
//     }
// }

import StaffModel from "../model/staff.model.js"
import { CatchError, TryError } from "../util/error.js"
import { deleteFileFromSupabase } from "../util/imageProcessor.js"

export const createStaff = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const { name, designation, category, staffType, subject, qualification, experience, bio, email, phone, displayOrder, isActive } = req.body

        if (!name || !designation || !category || !staffType || !qualification) {
            throw TryError("Name, designation, category, staff type, and qualification are required", 400)
        }

        // Validate category based on staffType
        if (staffType === 'teaching' && !['primary', 'middle', 'high', 'higher-secondary'].includes(category)) {
            throw TryError("Teaching staff must be assigned to a school section (primary, middle, high, higher-secondary)", 400)
        }

        if (staffType === 'management' && category !== 'management') {
            throw TryError("Management staff must have category 'management'", 400)
        }

        if (staffType === 'non-teaching' && category !== 'non-teaching') {
            throw TryError("Non-teaching staff must have category 'non-teaching'", 400)
        }

        const staff = await StaffModel.create({
            name,
            designation,
            category,
            staffType,
            subject: subject || null,
            qualification,
            experience: experience || null,
            bio: bio || null,
            email: email || null,
            phone: phone || null,
            image: req.body.image || null,
            displayOrder: displayOrder || 0,
            isActive: isActive !== undefined ? isActive : true
        })

        res.status(201).json({ message: "Staff added successfully", staff })
    }
    catch (err) {
        CatchError(err, res, "Failed to add staff")
    }
}

export const getStaff = async (req, res) => {
    try {
        const { category, staffType, all } = req.query

        let filter = {}
        if (category) filter.category = category
        if (staffType) filter.staffType = staffType
        if (all !== 'true') filter.isActive = true

        const staff = await StaffModel.find(filter)
            .sort({ staffType: 1, category: 1, displayOrder: 1, name: 1 })

        res.json(staff)
    }
    catch (err) {
        CatchError(err, res, "Failed to fetch staff")
    }
}

export const getStaffById = async (req, res) => {
    try {
        const staff = await StaffModel.findById(req.params.id)

        if (!staff) {
            throw TryError("Staff not found", 404)
        }

        res.json(staff)
    }
    catch (err) {
        CatchError(err, res, "Failed to fetch staff")
    }
}

export const updateStaff = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const staff = await StaffModel.findById(req.params.id)

        if (!staff) {
            throw TryError("Staff not found", 404)
        }

        const { name, designation, category, staffType, subject, qualification, experience, bio, email, phone, displayOrder, isActive } = req.body

        // Validate category based on staffType
        if (staffType === 'teaching' && !['primary', 'middle', 'high', 'higher-secondary'].includes(category)) {
            throw TryError("Teaching staff must be assigned to a school section (primary, middle, high, higher-secondary)", 400)
        }

        if (staffType === 'management' && category !== 'management') {
            throw TryError("Management staff must have category 'management'", 400)
        }

        if (staffType === 'non-teaching' && category !== 'non-teaching') {
            throw TryError("Non-teaching staff must have category 'non-teaching'", 400)
        }

        // Handle image update - delete old image from Supabase if new image is provided
        let image = staff.image
        if (req.body.image && req.body.image !== staff.image) {
            if (staff.image) {
                await deleteFileFromSupabase(staff.image)
            }
            image = req.body.image
        }

        const updated = await StaffModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: name || staff.name,
                    designation: designation || staff.designation,
                    category: category || staff.category,
                    staffType: staffType || staff.staffType,
                    subject: subject !== undefined ? subject : staff.subject,
                    qualification: qualification || staff.qualification,
                    experience: experience !== undefined ? experience : staff.experience,
                    bio: bio !== undefined ? bio : staff.bio,
                    email: email !== undefined ? email : staff.email,
                    phone: phone !== undefined ? phone : staff.phone,
                    image,
                    displayOrder: displayOrder !== undefined ? displayOrder : staff.displayOrder,
                    isActive: isActive !== undefined ? isActive : staff.isActive
                }
            },
            { new: true }
        )

        res.json({ message: "Staff updated successfully", staff: updated })
    }
    catch (err) {
        CatchError(err, res, "Failed to update staff")
    }
}

export const deleteStaff = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const staff = await StaffModel.findById(req.params.id)

        if (!staff) {
            throw TryError("Staff not found", 404)
        }

        // Delete associated image from Supabase
        if (staff.image) {
            await deleteFileFromSupabase(staff.image)
        }

        await StaffModel.findByIdAndDelete(req.params.id)

        res.json({ message: "Staff deleted successfully" })
    }
    catch (err) {
        CatchError(err, res, "Failed to delete staff")
    }
}
