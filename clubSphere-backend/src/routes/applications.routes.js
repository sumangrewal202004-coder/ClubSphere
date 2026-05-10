const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../config/multer');
const {
  applyToClub,
  getMyApplications
} = require('../controllers/applications.controller');
 
// Student submits application with CV
router.post('/', auth(['student', 'club_manager']), upload.single('cv'), applyToClub);
 
// Student views their own application history
router.get('/mine', auth(['student']), getMyApplications);
 
module.exports = router;
 
