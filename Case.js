const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
    name: { // Updated field for name
        type: String,
        required: true
    },
    subject: { // Updated field for subject of the case
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    courtName: { // Updated field for court name
        type: String,
        required: true
    },
    lawyerName: { // Updated field for lawyer's name
        type: String,
        required: true
    },
    dateToProceed: { // Updated field for date to proceed
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Case', CaseSchema);
