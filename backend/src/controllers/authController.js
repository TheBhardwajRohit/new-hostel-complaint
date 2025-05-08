const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getLogin = (req, res) => {
    res.sendFile('index.html', { root: './frontend/src' });
};

exports.postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role,
            name: user.name
        };

        const dashboards = {
            student: '/student-dashboard.html',
            staff: '/staff-dashboard.html',
            warden: '/warden-dashboard.html'
        };

        res.redirect(dashboards[user.role]);
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};