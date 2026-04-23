const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.registerCollege = async (req, res) => {
  const { name, domain, email, phone } = req.body;

  try {
    if (!name || !domain || !email) {
      return res.status(400).json({ error: 'Name, domain, and email are required' });
    }

    // Strip leading '@' if user typed it e.g. "@gmail.com" → "gmail.com"
    const cleanDomain = domain.startsWith('@') ? domain.slice(1) : domain;

    const existingDomain = await db.query(
      `SELECT id FROM colleges WHERE domain=$1`, [cleanDomain]
    );
    if (existingDomain.rows.length > 0) {
      return res.status(400).json({ error: 'A college with this domain is already registered' });
    }

    const existingUser = await db.query(
      `SELECT id FROM users WHERE email=$1`, [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'This email is already registered' });
    }

    // Insert into colleges (status = 'pending' by default)
    const college = await db.query(
      `INSERT INTO colleges (name, domain, email, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, cleanDomain, email, phone]
    );

    const collegeData = college.rows[0];

    // Save uploaded documents
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        await db.query(
          `INSERT INTO college_documents (college_id, file_path)
           VALUES ($1, $2)`,
          [collegeData.id, file.path]
        );
      }
    }

    // Create users row so college can log in after approval
    const placeholderHash = await bcrypt.hash('placeholder_not_used', 10);
    await db.query(
      `INSERT INTO users (email, password_hash, role, name, college_id)
       VALUES ($1, $2, 'college', $3, $4)`,
      [email, placeholderHash, name, collegeData.id]
    );

    res.json({
      message: 'College application submitted for approval. You will be able to log in once approved.',
      college: {
        id: collegeData.id,
        name: collegeData.name,
        domain: collegeData.domain,
        status: collegeData.status
      }
    });

  } catch (err) {
    console.error('College registration error:', err);
    res.status(500).json({ error: 'Failed to register college' });
  }
};