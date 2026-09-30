// models/Staff.js
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    name: {
        type: String,
        default: 'New User',
        trim: true
    },
    department: {
        type: String,
        default: 'Unassigned'
    },
    role: {
        type: String,
        // Enforce strict roles: admin, instructor, student
        enum: {
            values: ['admin', 'instructor', 'student'],
            message: '{VALUE} is not a valid role'
        },
        default: 'student' // Least privilege principle
    },
    checkedIn: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);