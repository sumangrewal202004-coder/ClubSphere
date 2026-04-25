const db = require('../config/db');

// GET all colleges
exports.getColleges = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, email, domain, phone, status, created_at
       FROM colleges
       ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
};


// APPROVE / REJECT
exports.updateCollegeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const college = await db.query(
      `SELECT * FROM colleges WHERE id=$1`,
      [id]
    );

    if (!college.rows.length) {
      return res.status(404).json({ error: 'College not found' });
    }

    const collegeData = college.rows[0];

    // If approving, create a user account for the college
    if (status === 'approved') {
      try {
        const existingUser = await db.query(
          `SELECT id FROM users WHERE email=$1`,
          [collegeData.email]
        );

        if (!existingUser.rows.length) {
          const bcrypt = require('bcryptjs');
          const placeholderHash = await bcrypt.hash('college_otp_only', 10);
          // Note: college_id field has wrong schema constraint, so set to NULL for college users
          // The college can be looked up by email from colleges table
          await db.query(
            `INSERT INTO users (email, password_hash, role, name, college_id)
             VALUES ($1, $2, 'college', $3, $4)`,
            [collegeData.email, placeholderHash, collegeData.name, null]
          );
          console.log(`✅ User account created for college: ${collegeData.email}`);
        }
      } catch (userErr) {
        console.error('Error creating user account:', userErr.message);
        // Don't fail the entire operation if user creation fails
        // The college can still be approved
      }
    }

    const result = await db.query(
      `UPDATE colleges
       SET status=$1
       WHERE id=$2
       RETURNING *`,
      [status, id]
    );

    res.json({
      message: `College ${status}`,
      data: result.rows[0]
    });

  } catch (err) {
    console.error('Update college status error:', err);
    res.status(500).json({ error: 'Update failed: ' + err.message });
  }
};




