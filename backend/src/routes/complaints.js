const express = require('express');
const router = express.Router();
const { isAuthenticated, studentOnly, staffOnly, wardenOnly } = require('../middleware/auth');
const { complaintPhoto, proofPhoto } = require('../middleware/upload');
const complaintController = require('../controllers/complaintController');

// Student routes
router.post('/student/complaints', isAuthenticated, studentOnly, complaintPhoto, 
    complaintController.createComplaint);
router.get('/student/complaints', isAuthenticated, studentOnly, 
    complaintController.listStudentComplaints);

// Staff routes
router.get('/staff/complaints', isAuthenticated, staffOnly, 
    complaintController.listPendingComplaints);
router.post('/staff/complaints/:id/resolve', isAuthenticated, staffOnly, proofPhoto,
    complaintController.resolveComplaint);

// Warden routes
router.delete('/warden/complaints/:id', isAuthenticated, wardenOnly,
    complaintController.deleteComplaint);

// New: Warden can list all complaints
router.get('/warden/complaints', isAuthenticated, wardenOnly,
        complaintController.listAllComplaints);

module.exports = router;