// const express = require('express');
// const router = express.Router();
// const { getAllProducts,
//         createProduct,
//         updateProduct,
//         deleteProduct
//      } = require('../controllers/productController');
// const { protect, admin } = require('../middleware/authMiddleware');

// router.get('/', getAllProducts);
// router.post('/', protect, admin, createProduct);
// router.put('/:id', protect, admin, updateProduct);
// router.delete('/:id', deleteProduct);

// module.exports = router;


// backend/routes/productRoutes.js
const express = require('express');
const multer = require('multer');
const Product = require('../models/productModel');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Setup multer for file upload
const storage = multer.memoryStorage(); // or use diskStorage if storing to disk
const upload = multer({ storage });

// Route to handle product creation
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, brand, category, countInStock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    // You might want to store image as buffer, or save to disk/cloud storage
    const imageBuffer = req.file?.buffer;
    const imageName = req.file?.originalname;

    const product = new Product({
      name,
      price,
      description,
      image: imageName || 'no-image.jpg',
      brand,
      category,
      countInStock,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
