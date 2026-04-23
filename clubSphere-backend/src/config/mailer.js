const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection on startup
transporter.verify((err, success) => {
  if (err) {
    console.error('❌ Mailer config error:', err.message);
    console.log('→ Check EMAIL_USER and EMAIL_PASS in your .env');
    console.log('→ Make sure EMAIL_PASS is a Gmail App Password, not your real password');
  } else {
    console.log('✅ Mailer ready');
  }
});

module.exports = transporter;