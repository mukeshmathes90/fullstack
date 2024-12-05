const Case = require('../models/Case');
const sendEmail = require('../utils/emailService');
const { getUserEmailById } = require('../services/userService');

// Create a new case
const createCase = async (caseData) => {
    try {
        const { name, subject, description, courtName, lawyerName, dateToProceed, user } = caseData;

        if (!name || !subject || !description || !courtName || !lawyerName || !dateToProceed) {
            throw new Error('All fields are required.');
        }

        const date = new Date(dateToProceed);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format. Use YYYY-MM-DD.');
        }

        const newCase = new Case({
            name,
            subject,
            description,
            courtName,
            lawyerName,
            dateToProceed,
            user
        });

        await newCase.save();

        // Get user email and send notification immediately
        const userEmail = await getUserEmailById(user);
        if (userEmail) {
            await sendEmail(
                userEmail,
                'New Case Created',
                `Your case "${newCase.name}" has been successfully created and is scheduled for ${newCase.dateToProceed.toISOString()}.`
            );
        }

        return newCase;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get all cases for a specific user
const getCases = async (userId) => {
    try {
        const cases = await Case.find({ user: userId });
        return cases;
    } catch (error) {
        throw new Error('Failed to retrieve cases.');
    }
};

module.exports = { createCase, getCases };
