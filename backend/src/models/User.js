// This file defines the User model for the hostel complaint system.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['student', 'staff', 'warden'],
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('User', userSchema);