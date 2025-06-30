const express = require('express');
const router = express.Router();
const { storage } = require('../utils/cloudinary');
const multer = require('multer');

const upload = multer({ storage });  // use CloudinaryStorage here

router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // multer with CloudinaryStorage attaches the uploaded file info on req.file
    res.json({ url: req.file.path }); // Cloudinary URL here

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

