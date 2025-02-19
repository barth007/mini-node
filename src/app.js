require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/profiles', profileRoutes);

module.exports = app;