const User = require('../models/User');

const getUserEmailById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user ? user.email : null;
    } catch (error) {
        console.error('Error fetching user email:', error);
        return null;
    }
};

module.exports = { getUserEmailById };
