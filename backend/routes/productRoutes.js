const express = require('express');
const multer = require('multer');
const { storage } = require('../utils/cloudinary');

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Multer with Cloudinary storage
const upload = multer({ storage });

router.get('/', getAllProducts);

// Product creation with image upload to Cloudinary
router.post('/', protect, admin, upload.single('image'), createProduct);

// Product update — optional image upload
router.put('/:id', protect, admin, upload.single('image'), updateProduct);

router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;

