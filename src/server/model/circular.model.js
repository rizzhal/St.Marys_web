import mongoose, { Schema, model } from 'mongoose'

const circularSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    time: {
        type: String,
        default: '10:00 AM'
    },
    fileUrl: {
        type: String,
        default: null
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    }
}, { timestamps: true })

const CircularModel = mongoose.models.Circular || model('Circular', circularSchema)
export default CircularModel
