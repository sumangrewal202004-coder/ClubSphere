const express = require('express');
const router = express.Router();

const upload = require('../middleware/uploadDocuments');
const { registerCollege } = require('../controllers/college.controller');

// Register college — accept up to 10 documents
router.post('/register', upload.array('documents', 10), registerCollege);

module.exports = router;