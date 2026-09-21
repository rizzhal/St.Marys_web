import mongoose, { Schema, model } from 'mongoose'

const galleryImageSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        trim: true,
        default: null
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
})

const galleryEventSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        trim: true,
        default: null
    },
    images: [galleryImageSchema],
    coverImage: {
        type: String,
        default: null
    },
    eventDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    }
}, { timestamps: true })

galleryEventSchema.index({ slug: 1, isActive: 1 })

const GalleryModel = mongoose.models.Gallery || model('Gallery', galleryEventSchema)
export default GalleryModel
