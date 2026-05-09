const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createEvent,
  getAllEvents,
  getClubEvents,
  registerForEvent,
  getMyRegisteredEvents,
  getEventRegistrations
} = require('../controllers/events.controller');
 
// Manager creates an event
router.post('/', auth(['club_manager']), createEvent);
 
// All logged-in users see upcoming events
router.get('/', auth(['student', 'club_manager', 'college']), getAllEvents);
 
// Events for a specific club
router.get('/club/:clubId', auth(['student', 'club_manager', 'college']), getClubEvents);
 
// Student registers for an event
router.post('/register', auth(['student', 'club_manager']), registerForEvent);
 
// Student sees events they registered for
router.get('/mine', auth(['student', 'club_manager']), getMyRegisteredEvents);
 
// Manager sees who registered for their event
router.get('/:eventId/registrations', auth(['club_manager']), getEventRegistrations);
 
module.exports = router;
 