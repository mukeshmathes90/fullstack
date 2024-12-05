const express = require('express');
const router = express.Router(); // Initialize the router first
const { registerUser, loginUser } = require('../controllers/authController');
const { validateRegisterInput } = require('../middleware/validationMiddleware'); // Import the middleware

// Define your routes
router.post('/register', validateRegisterInput, registerUser);
router.post('/login', loginUser);

module.exports = router; // Export the router after defining the routes
