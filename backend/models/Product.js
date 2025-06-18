const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: String,
    description: String,
    category: String,
    brand: String,
    countInStock: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);