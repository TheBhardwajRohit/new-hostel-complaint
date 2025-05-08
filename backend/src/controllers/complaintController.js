const Complaint = require('../models/Complaint');
const User = require('../models/User');

exports.createComplaint = async (req, res) => {
    try {
        const complaint = new Complaint({
            description: req.body.description,
            category: req.body.category,
            photoPath: req.file?.path,
            raisedBy: req.session.user.id
        });
        await complaint.save();

        // ✅ Respond with JSON (not redirect)
        res.status(200).json({ message: 'Complaint submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create complaint' });
    }
};


exports.listStudentComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ raisedBy: req.session.user.id })
            .populate('assignedTo', 'name');
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
};

exports.listPendingComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ status: 'pending' })
            .populate('raisedBy', 'name');
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pending complaints' });
    }
};



// ─────────────────────────────────────────────────────────────────────────────
// New: WARDEN/ADMIN should see all complaints, regardless of status or user
exports.listAllComplaints = async (req, res) => {
        try {
            // fetch every complaint in the collection
            const complaints = await Complaint.find()
                .populate('raisedBy', 'name')
                .populate('assignedTo', 'name');
            res.json(complaints);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch all complaints' });
        }
    };



exports.resolveComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        complaint.status = 'resolved';
        complaint.proofPhotoPath = req.file?.path;
        complaint.assignedTo = req.session.user.id;
        await complaint.save();
        res.redirect('/staff/dashboard');
    } catch (error) {
        res.status(500).json({ error: 'Failed to resolve complaint' });
    }
};

exports.deleteComplaint = async (req, res) => {
    try {
        await Complaint.findByIdAndDelete(req.params.id);
        res.json({ message: 'Complaint deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete complaint' });
    }
};