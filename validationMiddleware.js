const validateRegisterInput = (req, res, next) => {
    const { email, password, username } = req.body;

    // Validate required fields
    if (!email || !password || !username) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check for valid email format (basic regex)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check password length (for example, at least 6 characters)
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    next(); // Proceed to the next middleware or controller
};

module.exports = { validateRegisterInput };
