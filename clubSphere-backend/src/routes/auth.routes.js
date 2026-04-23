const express = require('express');
const router = express.Router();
const {
  register,
  sendOtp,
  verifyLoginOTP,
  getColleges
} = require('../controllers/auth.controller');

// Register new user (student or club_manager)
router.post('/register', register);

// Login step 1 — send OTP to email
router.post('/send-otp', sendOtp);

// Login step 2 — verify OTP, receive JWT token
router.post('/verify-otp', verifyLoginOTP);

// Public — get list of approved colleges (for register page dropdown)
router.get('/colleges', getColleges);

module.exports = router;