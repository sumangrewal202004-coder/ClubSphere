const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getNotifications,
  markAsRead,
  markAllAsRead
} = require('../controllers/notifications.controller');
 
// Any logged-in user can get their notifications
router.get('/', auth(['student', 'club_manager', 'college']), getNotifications);
 
// Mark one notification as read
router.patch('/:id/read', auth(['student', 'club_manager', 'college']), markAsRead);
 
// Mark all as read
router.patch('/read-all', auth(['student', 'club_manager', 'college']), markAllAsRead);
 
module.exports = router;