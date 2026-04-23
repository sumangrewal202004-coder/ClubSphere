const express = require('express');
const router = express.Router();

const upload = require('../middleware/uploadDocuments');
const { registerCollege } = require('../controllers/college.controller');

// register college with documents
router.post('/register', upload.array('documents', 5), registerCollege);

module.exports = router;
