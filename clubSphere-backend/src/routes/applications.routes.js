const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../config/multer');
const {
  applyToClub,
  getMyApplications
} = require('../controllers/applications.controller');
 
router.get('/mine', auth(['student', 'club_manager']), getMyApplications);
router.post('/', auth(['student', 'club_manager']), upload.single('cv'), applyToClub);
module.exports = router;
 
