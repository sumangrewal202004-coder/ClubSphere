const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createClub,
  getClubs,
  getMyCollegeClubs,
  getClubById
} = require('../controllers/club.controller');
 
// College creates a club (optionally assigns a manager by email)
router.post('/', auth(['college']), createClub);
 
// College views their own clubs with stats
router.get('/mine', auth(['college']), getMyCollegeClubs);
 
// Anyone logged in can browse all clubs
router.get('/', auth(['student', 'college', 'club_manager']), getClubs);
 
// Get single club detail
router.get('/:id', auth(['student', 'college', 'club_manager']), getClubById);
 
module.exports = router;
 