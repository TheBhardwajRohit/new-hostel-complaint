// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./src/models/User');

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({});

    const users = [
        { username: 'student001', password: 'rru', role: 'student', name: 'Student One' },
        { username: 'staff01', password: 'rru', role: 'staff', name: 'Staff One' },
        { username: 'admin', password: 'rru', role: 'warden', name: 'Admin' }
    ];

    for (let user of users) {
        user.password = await bcrypt.hash(user.password, 10);
        await User.create(user);
    }

    console.log('Seed completed');
    process.exit(0);
}

seed().catch(console.error);
