const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up storage to always use 'ecommerce' folder
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'ecommerce', // All images go to this folder
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }], // optional: resize or adjust images
  },
});

module.exports = { cloudinary, storage };
