const express = require('express');
const router = express.Router();
const { sendOTP } = require('../controllers/otp.controller');

router.post('/send', sendOTP);

module.exports = router;