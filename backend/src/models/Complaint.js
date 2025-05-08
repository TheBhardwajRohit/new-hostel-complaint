const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Electrician', 'Carpenter', 'Plumber', 'Other'],
        required: true
    },
    photoPath: String,
    proofPhotoPath: String,
    status: {
        type: String,
        enum: ['pending', 'active', 'resolved'],
        default: 'pending'
    },
    raisedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);