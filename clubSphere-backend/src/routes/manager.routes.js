const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getApplications,
  updateApplicationStatus,
  getMyClubs
} = require('../controllers/manager.controller');
 
// Manager sees which clubs they manage
router.get('/clubs', auth(['club_manager']), getMyClubs);
 
// Manager views applications for a club
router.get('/:clubId/applications', auth(['club_manager']), getApplications);
 
// Manager approves or rejects an application
router.patch('/applications/:id/status', auth(['club_manager']), updateApplicationStatus);
 
module.exports = router;
 