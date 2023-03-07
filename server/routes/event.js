const express = require('express');
const router = express.Router();
const {addEvent,getEvents} = require('../controllers/EventController');

// Route to add a new event
router.post('/', addEvent);

// Route to get all events
router.get('/', getEvents);

module.exports = router;
