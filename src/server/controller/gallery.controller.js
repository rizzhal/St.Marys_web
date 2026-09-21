// import GalleryModel from "../model/gallery.model.js"
// import { CatchError, TryError } from "../util/error.js"
// import { deleteImage, deleteMultipleImages } from "../util/imageProcessor.js"
// import fs from 'fs'
// import path from 'path'
// import { v4 as uuid } from 'uuid'

// const generateSlug = (name) => {
//     return name
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, '-')
//         .replace(/^-+|-+$/g, '')
// }

// export const createEvent = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const { name, description, eventDate, isActive, displayOrder } = req.body

//         if (!name) {
//             throw TryError("Event name is required", 400)
//         }

//         const slug = generateSlug(name)

//         const existing = await GalleryModel.findOne({ slug })
//         if (existing) {
//             throw TryError("An event with this name already exists", 400)
//         }

//         const event = await GalleryModel.create({
//             name,
//             slug,
//             description: description || null,
//             eventDate: eventDate || new Date(),
//             isActive: isActive !== undefined ? isActive : true,
//             displayOrder: displayOrder || 0,
//             createdBy: req.session.id
//         })

//         res.status(201).json({ message: "Event created successfully", event })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to create event")
//     }
// }

// export const getEvents = async (req, res) => {
//     try {
//         const { all, flat, page = 1, limit = 12 } = req.query

//         // Convert to integers
//         const pageNum = parseInt(page, 10) || 1
//         const limitNum = parseInt(limit, 10) || 12
//         const skip = (pageNum - 1) * limitNum

//         // Build filter
//         let filter = {}
//         if (all !== 'true') filter.isActive = true

//         // Get total count for pagination metadata
//         const total = await GalleryModel.countDocuments(filter)

//         // Fetch paginated events
//         let events = await GalleryModel.find(filter)
//             .sort({ displayOrder: 1, eventDate: -1 })
//             .skip(skip)
//             .limit(limitNum)

//         // If flat=true, return flattened list of images from these events
//         if (flat === 'true') {
//             const images = []
//             events.forEach(event => {
//                 event.images.forEach(img => {
//                     images.push({
//                         _id: img._id,
//                         image: img.image,
//                         title: img.title || event.name,
//                         category: event.name,
//                         date: img.uploadedAt || event.eventDate,
//                         eventId: event._id,
//                         eventName: event.name,
//                         isActive: event.isActive
//                     })
//                 })
//             })

//             return res.json({
//                 data: images,
//                 pagination: {
//                     page: pageNum,
//                     limit: limitNum,
//                     total: total,          // total events (not images)
//                     totalPages: Math.ceil(total / limitNum)
//                 }
//             })
//         }

//         // Non-flat: return events with their images
//         res.json({
//             data: events,
//             pagination: {
//                 page: pageNum,
//                 limit: limitNum,
//                 total,
//                 totalPages: Math.ceil(total / limitNum)
//             }
//         })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to fetch events")
//     }
// }

// export const getEventById = async (req, res) => {
//     try {
//         const event = await GalleryModel.findById(req.params.id)

//         if (!event) {
//             throw TryError("Event not found", 404)
//         }

//         res.json(event)
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to fetch event")
//     }
// }

// export const getEventBySlug = async (req, res) => {
//     try {
//         const event = await GalleryModel.findOne({ slug: req.params.slug })

//         if (!event) {
//             throw TryError("Event not found", 404)
//         }

//         res.json(event)
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to fetch event")
//     }
// }

// export const updateEvent = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const event = await GalleryModel.findById(req.params.id)

//         if (!event) {
//             throw TryError("Event not found", 404)
//         }

//         const { name, description, eventDate, isActive, displayOrder } = req.body

//         let slug = event.slug
//         if (name && name !== event.name) {
//             slug = generateSlug(name)
//             const existing = await GalleryModel.findOne({ slug, _id: { $ne: event._id } })
//             if (existing) {
//                 throw TryError("An event with this name already exists", 400)
//             }
//         }

//         const updated = await GalleryModel.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set: {
//                     name: name || event.name,
//                     slug,
//                     description: description !== undefined ? description : event.description,
//                     eventDate: eventDate || event.eventDate,
//                     isActive: isActive !== undefined ? isActive : event.isActive,
//                     displayOrder: displayOrder !== undefined ? displayOrder : event.displayOrder
//                 }
//             },
//             { new: true }
//         )

//         res.json({ message: "Event updated successfully", event: updated })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to update event")
//     }
// }

// export const deleteEvent = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const event = await GalleryModel.findById(req.params.id)

//         if (!event) {
//             throw TryError("Event not found", 404)
//         }

//         const imagePaths = event.images.map(img => img.image)
//         deleteMultipleImages(imagePaths)

//         if (event.coverImage) {
//             deleteImage(event.coverImage)
//         }

//         await GalleryModel.findByIdAndDelete(req.params.id)

//         res.json({ message: "Event deleted successfully" })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to delete event")
//     }
// }

// export const addImagesToEvent = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const event = await GalleryModel.findById(req.params.id)

//         if (!event) {
//             throw TryError("Event not found", 404)
//         }

//         const { images } = req.body

//         if (!images || !Array.isArray(images) || images.length === 0) {
//             throw TryError("At least one image is required", 400)
//         }

//         if (images.length > 4) {
//             throw TryError("Maximum 4 images can be added at once", 400)
//         }

//         const newImages = images.map(img => ({
//             image: img,
//             title: null,
//             uploadedAt: new Date()
//         }))

//         event.images.push(...newImages)
        
//         if (!event.coverImage && event.images.length > 0) {
//             event.coverImage = event.images[0].image
//         }

//         await event.save()

//         res.json({ 
//             message: `${images.length} image(s) added successfully`, 
//             event,
//             addedCount: images.length
//         })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to add images")
//     }
// }

// export const deleteImageFromEvent = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const { eventId, imageId } = req.params

//         const event = await GalleryModel.findById(eventId)

//         if (!event) {
//             throw TryError("Event not found", 404)
//         }

//         const imageIndex = event.images.findIndex(img => img._id.toString() === imageId)

//         if (imageIndex === -1) {
//             throw TryError("Image not found", 404)
//         }

//         const imageToDelete = event.images[imageIndex]

//         deleteImage(imageToDelete.image)

//         event.images.splice(imageIndex, 1)

//         if (event.coverImage === imageToDelete.image) {
//             event.coverImage = event.images.length > 0 ? event.images[0].image : null
//         }

//         await event.save()

//         res.json({ message: "Image deleted successfully", event })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to delete image")
//     }
// }

// export const updateImageTitle = async (req, res) => {
//     try {
//         if (!req.session) {
//             throw TryError("Unauthorized", 401)
//         }

//         const { eventId, imageId } = req.params
//         const { title } = req.body

//         const event = await GalleryModel.findById(eventId)

//         if (!event) {
//             throw TryError("Event not found", 404)
//         }

//         const image = event.images.id(imageId)

//         if (!image) {
//             throw TryError("Image not found", 404)
//         }

//         image.title = title || null
//         await event.save()

//         res.json({ message: "Image title updated successfully", event })
//     }
//     catch (err) {
//         CatchError(err, res, "Failed to update image title")
//     }
// }






import GalleryModel from "../model/gallery.model.js"
import { CatchError, TryError } from "../util/error.js"
import { deleteFileFromSupabase, deleteMultipleImages } from "../util/imageProcessor.js"

const generateSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export const createEvent = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const { name, description, eventDate, isActive, displayOrder } = req.body

        if (!name) {
            throw TryError("Event name is required", 400)
        }

        const slug = generateSlug(name)

        const existing = await GalleryModel.findOne({ slug })
        if (existing) {
            throw TryError("An event with this name already exists", 400)
        }

        const event = await GalleryModel.create({
            name,
            slug,
            description: description || null,
            eventDate: eventDate || new Date(),
            isActive: isActive !== undefined ? isActive : true,
            displayOrder: displayOrder || 0,
            createdBy: req.session.id
        })

        res.status(201).json({ message: "Event created successfully", event })
    }
    catch (err) {
        CatchError(err, res, "Failed to create event")
    }
}

export const getEvents = async (req, res) => {
    try {
        const { all, flat, page = 1, limit = 12 } = req.query

        const pageNum = parseInt(page, 10) || 1
        const limitNum = parseInt(limit, 10) || 12
        const skip = (pageNum - 1) * limitNum

        let filter = {}
        if (all !== 'true') filter.isActive = true

        const total = await GalleryModel.countDocuments(filter)

        let events = await GalleryModel.find(filter)
            .sort({ displayOrder: 1, eventDate: -1 })
            .skip(skip)
            .limit(limitNum)

        if (flat === 'true') {
            const images = []
            events.forEach(event => {
                event.images.forEach(img => {
                    images.push({
                        _id: img._id,
                        image: img.image,
                        title: img.title || event.name,
                        category: event.name,
                        date: img.uploadedAt || event.eventDate,
                        eventId: event._id,
                        eventName: event.name,
                        isActive: event.isActive
                    })
                })
            })

            return res.json({
                data: images,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total: total,
                    totalPages: Math.ceil(total / limitNum)
                }
            })
        }

        res.json({
            data: events,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum)
            }
        })
    }
    catch (err) {
        CatchError(err, res, "Failed to fetch events")
    }
}

export const getEventById = async (req, res) => {
    try {
        const event = await GalleryModel.findById(req.params.id)

        if (!event) {
            throw TryError("Event not found", 404)
        }

        res.json(event)
    }
    catch (err) {
        CatchError(err, res, "Failed to fetch event")
    }
}

export const getEventBySlug = async (req, res) => {
    try {
        const event = await GalleryModel.findOne({ slug: req.params.slug })

        if (!event) {
            throw TryError("Event not found", 404)
        }

        res.json(event)
    }
    catch (err) {
        CatchError(err, res, "Failed to fetch event")
    }
}

export const updateEvent = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const event = await GalleryModel.findById(req.params.id)

        if (!event) {
            throw TryError("Event not found", 404)
        }

        const { name, description, eventDate, isActive, displayOrder } = req.body

        let slug = event.slug
        if (name && name !== event.name) {
            slug = generateSlug(name)
            const existing = await GalleryModel.findOne({ slug, _id: { $ne: event._id } })
            if (existing) {
                throw TryError("An event with this name already exists", 400)
            }
        }

        const updated = await GalleryModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: name || event.name,
                    slug,
                    description: description !== undefined ? description : event.description,
                    eventDate: eventDate || event.eventDate,
                    isActive: isActive !== undefined ? isActive : event.isActive,
                    displayOrder: displayOrder !== undefined ? displayOrder : event.displayOrder
                }
            },
            { new: true }
        )

        res.json({ message: "Event updated successfully", event: updated })
    }
    catch (err) {
        CatchError(err, res, "Failed to update event")
    }
}

export const deleteEvent = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const event = await GalleryModel.findById(req.params.id)

        if (!event) {
            throw TryError("Event not found", 404)
        }

        const imagePaths = event.images.map(img => img.image)
        await deleteMultipleImages(imagePaths)

        if (event.coverImage) {
            await deleteFileFromSupabase(event.coverImage)
        }

        await GalleryModel.findByIdAndDelete(req.params.id)

        res.json({ message: "Event deleted successfully" })
    }
    catch (err) {
        CatchError(err, res, "Failed to delete event")
    }
}

export const addImagesToEvent = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const event = await GalleryModel.findById(req.params.id)

        if (!event) {
            throw TryError("Event not found", 404)
        }

        const { images } = req.body

        if (!images || !Array.isArray(images) || images.length === 0) {
            throw TryError("At least one image is required", 400)
        }

        if (images.length > 4) {
            throw TryError("Maximum 4 images can be added at once", 400)
        }

        const newImages = images.map(img => ({
            image: img,
            title: null,
            uploadedAt: new Date()
        }))

        event.images.push(...newImages)

        if (!event.coverImage && event.images.length > 0) {
            event.coverImage = event.images[0].image
        }

        await event.save()

        res.json({
            message: `${images.length} image(s) added successfully`,
            event,
            addedCount: images.length
        })
    }
    catch (err) {
        CatchError(err, res, "Failed to add images")
    }
}

export const deleteImageFromEvent = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const { eventId, imageId } = req.params

        const event = await GalleryModel.findById(eventId)

        if (!event) {
            throw TryError("Event not found", 404)
        }

        const imageIndex = event.images.findIndex(img => img._id.toString() === imageId)

        if (imageIndex === -1) {
            throw TryError("Image not found", 404)
        }

        const imageToDelete = event.images[imageIndex]

        await deleteFileFromSupabase(imageToDelete.image)

        event.images.splice(imageIndex, 1)

        if (event.coverImage === imageToDelete.image) {
            event.coverImage = event.images.length > 0 ? event.images[0].image : null
        }

        await event.save()

        res.json({ message: "Image deleted successfully", event })
    }
    catch (err) {
        CatchError(err, res, "Failed to delete image")
    }
}

export const updateImageTitle = async (req, res) => {
    try {
        if (!req.session) {
            throw TryError("Unauthorized", 401)
        }

        const { eventId, imageId } = req.params
        const { title } = req.body

        const event = await GalleryModel.findById(eventId)

        if (!event) {
            throw TryError("Event not found", 404)
        }

        const image = event.images.id(imageId)

        if (!image) {
            throw TryError("Image not found", 404)
        }

        image.title = title || null
        await event.save()

        res.json({ message: "Image title updated successfully", event })
    }
    catch (err) {
        CatchError(err, res, "Failed to update image title")
    }
}