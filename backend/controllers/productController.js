const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, brand, category, countInStock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    // Get Cloudinary image URL
    const image = req.file ? req.file.path : '';

    const newProduct = new Product({
      name,
      price,
      description,
      brand,
      category,
      countInStock,
      image,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.path; // Cloudinary URL
    }

    const updated = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};


