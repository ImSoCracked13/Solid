const express = require('express');
const { uploadFile, getFiles, deleteFile, downloadFile } = require('../controllers/fileController');
const router = express.Router();

router.post('/upload', uploadFile);
router.get('/files', getFiles);
router.delete('/files/:id', deleteFile);
router.get('/files/download/:id', downloadFile);

module.exports = router;