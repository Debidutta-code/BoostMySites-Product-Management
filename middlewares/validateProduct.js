// middlewares/validateProduct.js
const responseHandler = require('../utils/responseHandler');

const validateProduct = (req, res, next) => {
  const { name, description, price, category } = req.body;

  // Check for required fields
  if (!name || !description || !price || !category) {
    return responseHandler.error(res, 400, 'All fields are required.');
  }

  // Check if price is a number
  if (typeof price !== 'number' || price <= 0) {
    return responseHandler.error(res, 400, 'Price must be a positive number.');
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = validateProduct;
