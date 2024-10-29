// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

router.get('/hello', (req, res) => {
    res.json("hello world product");
})

// Route for creating a product
router.post('/', createProduct);

// Route for getting all products
router.get('/', getAllProducts);

// Route for getting a single product by ID
router.get('/:id', getProductById);

// Route for updating a product by ID
router.put('/:id', updateProduct);

// Route for deleting a product by ID
router.delete('/:id', deleteProduct);

module.exports = router;
