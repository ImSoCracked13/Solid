const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/api', fileRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Locally'))
    .catch(err => console.log('MongoDB Connection Failed:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, 'localhost', () => console.log(`Server running locally on http://localhost:${PORT}`));