// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Default to 500 if not set
    res.status(statusCode).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Don't expose stack trace in production
    });
  };
  
  module.exports = errorHandler;
  