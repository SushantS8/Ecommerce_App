const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products); 
};

// Create a new product
exports.createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(400).json({ message: 'Product not found' });
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

        if(!deleted) {
            return res.status(404).json({ message: 'Product not found '});
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product' });
    }
};
