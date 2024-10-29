// controllers/productController.js
const Product = require('../models/productModel');
const responseHandler = require('../utils/responseHandler');
const mongoose = require('mongoose');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        // Check if all required fields are provided
        if (!name || !description || !price || !category) {
            return responseHandler.error(res, 400, 'All fields are required.');
        }

        // Check if price is a number
        if (typeof price !== 'number') {
            return responseHandler.error(res, 400, 'Price must be a number.');
        }

        // Optional: Check for duplicate product by name
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return responseHandler.error(res, 400, 'Product with this name already exists.');
        }

        const newProduct = new Product({ name, description, price, category });
        await newProduct.save();

        return responseHandler.success(res, 201, 'Product created successfully.', newProduct);
    } catch (error) {
        return responseHandler.error(res, 500, error.message);
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (products.length === 0) {
            return responseHandler.success(res, 200, 'No products found.', []);
        }

        return responseHandler.success(res, 200, 'Products retrieved successfully.', products);
    } catch (error) {
        return responseHandler.error(res, 500, error.message);
    }
};


// Get a single product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
        return responseHandler.error(res, 400, 'Invalid product ID format.');
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return responseHandler.error(res, 404, 'Product not found.');
        }
        return responseHandler.success(res, 200, 'Product retrieved successfully.', product);
    } catch (error) {
        return responseHandler.error(res, 500, error.message);
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    const { id } = req.params; // Get the product ID from the URL
    const { name, description, price, category } = req.body; // Get the updated data from the request body

    // Check if the ID is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
        return responseHandler.error(res, 400, 'Invalid product ID format.');
    }

    // Check if at least one field is provided
    if (!name && !description && !price && !category) {
        return responseHandler.error(res, 400, 'At least one field is required to update.');
    }

    // Create an update object and include only provided fields
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (category) updateData.category = category;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true }); // { new: true } returns the updated document

        if (!updatedProduct) {
            return responseHandler.error(res, 404, 'Product not found.');
        }
        
        return responseHandler.success(res, 200, 'Product updated successfully.', updatedProduct);
    } catch (error) {
        return responseHandler.error(res, 500, error.message);
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    const { id } = req.params; // Get the product ID from the URL

    // Check if the ID is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
        return responseHandler.error(res, 400, 'Invalid product ID format.');
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return responseHandler.error(res, 404, 'Product not found.');
        }
        
        return responseHandler.success(res, 200, 'Product deleted successfully.');
    } catch (error) {
        return responseHandler.error(res, 500, 'Error deleting product: ' + error.message);
    }
};