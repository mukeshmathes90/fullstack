const cron = require('node-cron');
const Case = require('../models/Case');
const { sendEmail } = require('../utils/emailService');
const { getUserEmailById } = require('./userService');

// Function to check for upcoming cases and send email notifications
const checkUpcomingCases = async () => {
    try {
        const now = new Date();
        const oneDayAhead = new Date(now);
        oneDayAhead.setDate(now.getDate() + 1);

        // Find cases with a hearing date between now and one day ahead
        const upcomingCases = await Case.find({
            dateToProceed: {
                $gte: now.toISOString().split('T')[0], // Start from today's date
                $lte: oneDayAhead.toISOString().split('T')[0] // Up to tomorrow's date
            }
        });

        // Send notification emails for each upcoming case
        for (const upcomingCase of upcomingCases) {
            const userEmail = await getUserEmailById(upcomingCase.user); // Fetch the user's email
            if (userEmail) {
                await sendEmail(
                    userEmail,
                    'Upcoming Case Hearing Reminder',
                    `Your case "${upcomingCase.name}" is scheduled for tomorrow at ${upcomingCase.dateToProceed.toISOString().split('T')[0]}.`
                );
            }
        }
    } catch (error) {
        console.error('Error checking for upcoming cases:', error);
    }
};

// Schedule the task to run daily at midnight
cron.schedule('0 0 * * *', checkUpcomingCases); // Runs every day at midnight
