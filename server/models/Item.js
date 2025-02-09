const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }], // Store Cloudinary URLs
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);