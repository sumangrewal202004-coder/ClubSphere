const db = require('../config/db');
const transporter = require('../config/mailer');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  await db.query(
    `INSERT INTO otp_table (email, otp) VALUES ($1,$2)`,
    [email, otp]
  );

  await transporter.sendMail({
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is ${otp}`
  });

  res.json({ message: 'OTP sent' });
};