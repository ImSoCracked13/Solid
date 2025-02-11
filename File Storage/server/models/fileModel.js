const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    size: Number,
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);