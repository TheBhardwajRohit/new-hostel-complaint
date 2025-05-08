const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

const studentOnly = (req, res, next) => {
    if (req.session.user?.role !== 'student') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

const staffOnly = (req, res, next) => {
    if (req.session.user?.role !== 'staff') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

const wardenOnly = (req, res, next) => {
    if (req.session.user?.role !== 'warden') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

module.exports = {
    isAuthenticated,
    studentOnly,
    staffOnly,
    wardenOnly
};