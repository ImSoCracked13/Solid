const File = require('../models/File');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage }).single('file');

exports.uploadFile = (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ message: 'File upload failed' });
        
        const newFile = new File({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
        });
        await newFile.save();
        res.status(200).json({ message: 'File uploaded', file: newFile });
    });
};

exports.getFiles = async (req, res) => {
    const files = await File.find();
    res.status(200).json(files);
};

exports.deleteFile = async (req, res) => {
    const { id } = req.params;
    try {
        const file = await File.findById(id);
        if (!file) return res.status(404).json({ message: 'File not found' });
        
        await fs.unlink(file.path);
        await File.findByIdAndDelete(id);
        res.status(200).json({ message: 'File deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Deletion failed' });
    }
};

exports.downloadFile = async (req, res) => {
    const { id } = req.params;
    try {
        const file = await File.findById(id);
        if (!file) return res.status(404).json({ message: 'File not found' });

        res.download(file.path, file.filename);
    } catch (err) {
        res.status(500).json({ message: 'Download failed' });
    }
};