const express = require('express');
const multer = require('multer');
const path = require('path');

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Multer setup to save images to 'uploads' folder
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/', getAllProducts);

router.post('/', protect, admin, upload.single('image'), createProduct);

router.put('/:id', protect, admin, updateProduct);

router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
