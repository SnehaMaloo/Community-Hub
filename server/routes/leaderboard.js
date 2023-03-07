const express = require('express');
const router = express.Router();
const {/*addSubmission,*/getSubmission} = require('../controllers/leaderboardController');

// Route to add a new event
// router.post('/',addSubmission);

// Route to get all events
router.get('/', getSubmission);

module.exports = router;