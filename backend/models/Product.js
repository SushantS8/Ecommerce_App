const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    category: { type: String, default: '', trim: true },
    brand: { type: String, default: '', trim: true },
    countInStock: { type: Number, required: true, min: 0 },
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
