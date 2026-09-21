import mongoose, { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const authSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['super-admin', 'admin'],
        default: 'admin'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    },
    expiry: {
        type: Date,
        default: null
    }
}, { timestamps: true })

authSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

const AuthModel = mongoose.models.Auth || model('Auth', authSchema)
export default AuthModel
