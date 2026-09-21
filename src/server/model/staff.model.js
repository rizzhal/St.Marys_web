import mongoose, { Schema, model } from 'mongoose'

const staffSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['management', 'primary', 'middle', 'high', 'higher-secondary', 'non-teaching']
    },
    staffType: {
        type: String,
        required: true,
        enum: ['management', 'teaching', 'non-teaching']
    },
    subject: {
        type: String,
        trim: true,
        default: null
    },
    qualification: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: String,
        trim: true,
        default: null
    },
    bio: {
        type: String,
        trim: true,
        default: null
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
    },
    phone: {
        type: String,
        trim: true,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

staffSchema.index({ category: 1, staffType: 1, displayOrder: 1 })

const StaffModel = mongoose.models.Staff || model('Staff', staffSchema)
export default StaffModel
