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

router.get('/colleges/:id/documents', auth(['super_admin']), admin.getCollegeDocuments);

router.delete('/colleges/:id', auth(['super_admin']), admin.deleteCollege);

module.exports = router;