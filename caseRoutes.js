const express = require('express');
const router = express.Router();
const { getCases, createCase } = require('../controllers/caseController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for getting all cases for a specific user
router.get('/case-data', authMiddleware, async (req, res) => {
    try {
        const cases = await getCases(req.user.id); // Pass user ID to getCases function
        res.json({ success: true, cases: Array.isArray(cases) ? cases : [] }); // Ensure cases is always an array
    } catch (error) {
        console.error('Error fetching cases:', error); // Log detailed error
        res.status(500).json({ success: false, message: 'Failed to fetch cases' });
    }
});

// Route for creating a new case
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, subject, description, courtName, lawyerName, dateToProceed } = req.body;
        if (!name || !subject || !description || !courtName || !lawyerName || !dateToProceed) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Create a new case object
        const newCase = { name, subject, description, courtName, lawyerName, dateToProceed, user: req.user.id };
        
        // Create the case and return response
        const createdCase = await createCase(newCase); // Pass case data to createCase
        res.status(201).json({ success: true, message: 'Case registered successfully!', case: createdCase });
    } catch (error) {
        console.error('Error creating case:', error); // Log detailed error
        res.status(500).json({ success: false, message: 'Failed to create case.' });
    }
});

module.exports = router;
