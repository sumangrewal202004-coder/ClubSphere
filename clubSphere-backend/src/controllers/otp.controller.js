// const db = require('../config/db');
// const transporter = require('../config/mailer');

// const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// exports.sendOTP = async (req, res) => {
//   const { email } = req.body;
//   const otp = generateOTP();

//   await db.query(
//     `INSERT INTO otp_table (email, otp) VALUES ($1,$2)`,
//     [email, otp]
//   );

//   await transporter.sendMail({
//     to: email,
//     subject: 'OTP Verification',
//     text: `Your OTP is ${otp}`
//   });

//   res.json({ message: 'OTP sent' });
// };

const db = require('../config/db');
const transporter = require('../config/mailer'); // uses sendMail(), not resend.emails.send()

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const otp = generateOTP();
    await db.query(`DELETE FROM otp_table WHERE email=$1`, [email]);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await db.query(
      `INSERT INTO otp_table (email, otp, expires_at) VALUES ($1, $2, $3)`,
      [email, otp, expiresAt]
    );
    console.log(`\n✅ OTP for ${email}: ${otp}\n`);

    await transporter.sendMail({
      from: `ClubSphere <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'OTP Verification',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #4F46E5;">ClubSphere</h2>
          <p>Your OTP is:</p>
          <div style="background: #F3F4F6; border-radius: 12px; padding: 24px; text-align: center;">
            <h1 style="letter-spacing: 12px; color: #111827; font-size: 36px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #6B7280; font-size: 14px;">Expires in <strong>5 minutes</strong>. Do not share it.</p>
        </div>
      `
    });

    res.json({ message: 'OTP sent' });
  } catch (err) {
    console.error('sendOTP error:', err.message);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};