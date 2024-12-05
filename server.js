const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const caseRoutes = require('./routes/caseRoutes');
const caseController = require('./controllers/caseController'); // Ensure this path is correct
const router = express.Router();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
// Serve static files from the "public" directory
app.use(express.static('public'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);

// Serve the index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Serve the dashboard.html file
app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});

// Serve other HTML pages
app.get('/case_management.html', (req, res) => {
    res.sendFile(__dirname + '/public/case_management.html');
});

app.get('/hearing_schedule.html', (req, res) => {
    res.sendFile(__dirname + '/public/hearing_schedule.html');
});

// Centralized error handling
app.use(errorHandler);

// Import the notification service to schedule the email reminders
require('./services/notificationService'); // This will automatically start the cron job
router.post('/api/cases', caseController.createCase);
module.exports = router;
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
