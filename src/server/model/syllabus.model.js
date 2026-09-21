import mongoose, { Schema, model } from 'mongoose'

const syllabusSchema = new Schema({
    academicYear: {
        type: String,
        required: true,
        trim: true
    },
    class: {
        type: String,
        required: true,
        enum: ['KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    stream: {
        type: String,
        enum: ['arts', 'science', 'commerce', 'general'],
        default: 'general'
    },
    fileUrl: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        trim: true
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    }
}, { timestamps: true })

syllabusSchema.index({ academicYear: 1, class: 1, subject: 1 })

const SyllabusModel = mongoose.models.Syllabus || model('Syllabus', syllabusSchema)
export default SyllabusModel
