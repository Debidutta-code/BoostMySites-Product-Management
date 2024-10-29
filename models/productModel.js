// models/productModel.js
const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Remove whitespace from the beginning and end
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Price should be a positive number
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
