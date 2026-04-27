const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/mailer');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ================= REGISTER =================
exports.register = async (req, res) => {
  const { email, password, role, name } = req.body;

  try {
    if (!email || !role || !name) {
      return res.status(400).json({ error: 'Name, email and role are required' });
    }

    if (role === 'super_admin') {
      return res.status(403).json({ error: 'Cannot register as super_admin' });
    }

    if (role !== 'college' && (!password || password.length < 6)) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existing = await db.query(
      `SELECT id FROM users WHERE email=$1`, [email]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    let collegeId = null;

    if (role === 'student') {
      const domain = email.split('@')[1];

      const college = await db.query(
        `SELECT id, status FROM colleges WHERE domain=$1`, [domain]
      );

      if (!college.rows.length) {
        return res.status(400).json({
          error: `No college registered with domain @${domain}. Use your official college email.`
        });
      }

      // Temporarily commented out for testing
      // if (college.rows[0].status !== 'approved') {
      //   return res.status(400).json({
      //     error: 'Your college is registered but not yet approved by admin.'
      //   });
      // }

      // Get the college user id — join via colleges table to avoid email mismatch
      const collegeUser = await db.query(
        `SELECT u.id FROM users u
         JOIN colleges c ON c.email = u.email
         WHERE c.domain = $1 AND u.role = 'college'
         LIMIT 1`,
        [domain]
      );
      if (!collegeUser.rows.length) {
        return res.status(400).json({
          error: 'College account not set up yet. Please contact your college administrator.'
        });
      }
      collegeId = collegeUser.rows[0].id;
    }

    const hashedPassword = await bcrypt.hash(password || 'placeholder', 10);

    const result = await db.query(
      `INSERT INTO users (email, password_hash, role, name, college_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, role, name`,
      [email, hashedPassword, role, name, collegeId]
    );

    res.json({ message: 'Registration successful', user: result.rows[0] });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
};


// ================= SEND OTP (LOGIN) =================
exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const userResult = await db.query(
      `SELECT id, role, email FROM users WHERE email=$1`, [email]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'No account found with this email' });
    }

    // super_admin: skip all college checks
    if (user.role === 'super_admin') {
      // fall through to OTP generation
    }
    else if (user.role === 'student') {
      const domain = email.split('@')[1];
      const college = await db.query(
        `SELECT status FROM colleges WHERE domain=$1`, [domain]
      );
      if (!college.rows.length) {
        return res.status(403).json({ error: 'Your college is not registered' });
      }
      if (college.rows[0].status !== 'approved') {
        return res.status(403).json({ error: 'Your college is not approved yet' });
      }
    }
    else if (user.role === 'college') {
      const college = await db.query(
        `SELECT status FROM colleges WHERE email=$1`, [email]
      );
      if (!college.rows.length) {
        return res.status(403).json({ error: 'College account not found' });
      }
      if (college.rows[0].status !== 'approved') {
        return res.status(403).json({ error: 'Your college account is pending approval' });
      }
    }

    const otp = generateOTP();

    await db.query(`DELETE FROM otp_table WHERE email=$1`, [email]);

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await db.query(
      `INSERT INTO otp_table (email, otp, expires_at) VALUES ($1, $2, $3)`,
      [email, otp, expiresAt]
    );

    console.log(`\n✅ OTP for ${email}: ${otp}\n`);

    const recipient = process.env.DEV_MODE === 'true'
      ? process.env.DEV_EMAIL
      : email;

    try {
      await transporter.sendMail({
        from: `"ClubSphere" <${process.env.EMAIL_USER}>`,
        to: recipient,
        subject: 'Your ClubSphere Login OTP',
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
            <h2 style="color: #4F46E5; margin-bottom: 8px;">ClubSphere</h2>
            <p style="color: #374151; margin-bottom: 24px;">Your login OTP is:</p>
            <div style="background: #F3F4F6; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
              <h1 style="letter-spacing: 12px; color: #111827; font-size: 36px; margin: 0;">${otp}</h1>
            </div>
            <p style="color: #6B7280; font-size: 14px;">
              This OTP expires in <strong>5 minutes</strong>. Do not share it with anyone.
            </p>
          </div>
        `
      });
      console.log('Email sent to:', recipient);
    } catch (mailErr) {
      console.error('Mail send failed:', mailErr.message);
    }

    res.json({ message: 'OTP sent to your email' });

  } catch (err) {
    console.error('Send OTP error:', err);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};


// ================= VERIFY OTP =================
exports.verifyLoginOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const otpCheck = await db.query(
      `SELECT * FROM otp_table WHERE email=$1 AND otp=$2`,
      [email, otp.toString()]
    );

    if (!otpCheck.rows.length) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    const otpData = otpCheck.rows[0];

    if (new Date() > new Date(otpData.expires_at)) {
      await db.query(`DELETE FROM otp_table WHERE email=$1`, [email]);
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    await db.query(`DELETE FROM otp_table WHERE email=$1`, [email]);

    const userResult = await db.query(
      `SELECT id, role, name, email, college_id FROM users WHERE email=$1`,
      [email]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, college_id: user.college_id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, role: user.role, name: user.name });

  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ error: 'OTP verification failed' });
  }
};

// ================= GET COLLEGES (public) =================
exports.getColleges = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, domain FROM colleges WHERE status='approved' ORDER BY name ASC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
};