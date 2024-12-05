const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID from token to request object
        req.user = { id: decoded.userId }; // Ensure this matches the structure of your token

        next();
    } catch (ex) {
        // Provide a more specific error message based on the error type
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
