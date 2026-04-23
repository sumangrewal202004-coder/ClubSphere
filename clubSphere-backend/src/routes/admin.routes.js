const router = require('express').Router();
const admin = require('../controllers/admin.controller');
const auth = require('../middleware/auth');

// only super_admin allowed
router.get('/colleges', auth(['super_admin']), admin.getColleges);

router.patch(
  '/colleges/:id/status',
  auth(['super_admin']),
  admin.updateCollegeStatus
);

module.exports = router;