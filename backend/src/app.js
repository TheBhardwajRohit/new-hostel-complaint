require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('./config/session');
require('./config/database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);
// serve all static files from your frontend/src folder:
app.use(express.static(path.join(__dirname, '../../frontend/src')));

// make “/” return index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/src/index.html'));
  });
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/auth', require('./routes/auth'));

// mount our three role‑based routers
// app.use('/api/student', require('./routes/student'));
// app.use('/api/staff',   require('./routes/staff'));
// app.use('/api/warden',  require('./routes/warden'));


app.use('/api', require('./routes/complaints'));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));