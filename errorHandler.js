// middleware/errorHandler.js

// Custom error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Logs error stack to the console for debugging

    // Set the status code from the error, or default to 500 if not specified
    const statusCode = err.statusCode || 500;

    // Send the error response
    res.status(statusCode).json({
        success: false,
        message: err.message || 'An unexpected error occurred.',
        // Optionally include error stack trace for development purposes
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

module.exports = errorHandler;
