const path = require('path');
const db = require('../config/db');

// GET all colleges
exports.getColleges = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, email, domain, phone, website, address,
              college_type, reg_number, accreditation, university_affiliation,
              year_established, status, created_at
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

// GET college documents
exports.getCollegeDocuments = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT file_path FROM college_documents WHERE college_id=$1`,
      [id]
    );

    const files = result.rows.map(({ file_path }) => {
      const filename = path.basename(file_path);
      return {
        file_name: filename,
        url: `${req.protocol}://${req.get('host')}/uploads/${encodeURIComponent(filename)}`,
      };
    });

    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

// DELETE college
exports.deleteCollege = async (req, res) => {
  const { id } = req.params;
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const collegeResult = await client.query(`SELECT email FROM colleges WHERE id=$1`, [id]);
    if (collegeResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'College not found' });
    }

    const collegeEmail = collegeResult.rows[0].email;
    const collegeUserResult = await client.query(
      `SELECT id FROM users WHERE email=$1 AND role='college'`,
      [collegeEmail]
    );

    const collegeUserId = collegeUserResult.rows[0]?.id;

    // Remove all related college documents
    await client.query(`DELETE FROM college_documents WHERE college_id=$1`, [id]);

    if (collegeUserId) {
      // Clean up all dependent records for clubs owned by this college user
      await client.query(
        `DELETE FROM event_registrations
         WHERE event_id IN (
           SELECT id FROM events WHERE club_id IN (
             SELECT id FROM clubs WHERE college_id=$1
           )
         )`,
        [collegeUserId]
      );

      await client.query(
        `DELETE FROM applications
         WHERE club_id IN (
           SELECT id FROM clubs WHERE college_id=$1
         )`,
        [collegeUserId]
      );

      await client.query(
        `DELETE FROM events
         WHERE club_id IN (
           SELECT id FROM clubs WHERE college_id=$1
         )`,
        [collegeUserId]
      );

      await client.query(`DELETE FROM clubs WHERE college_id=$1`, [collegeUserId]);

      // Remove users that belong to this college and their dependent records
      await client.query(
        `DELETE FROM event_registrations
         WHERE student_id IN (
           SELECT id FROM users WHERE college_id=$1
         )`,
        [collegeUserId]
      );

      await client.query(
        `DELETE FROM applications
         WHERE student_id IN (
           SELECT id FROM users WHERE college_id=$1
         )`,
        [collegeUserId]
      );

      await client.query(
        `DELETE FROM notifications
         WHERE user_id = $1
            OR user_id IN (
              SELECT id FROM users WHERE college_id=$1
            )`,
        [collegeUserId]
      );

      await client.query(`DELETE FROM users WHERE college_id=$1`, [collegeUserId]);
      await client.query(`DELETE FROM users WHERE id=$1`, [collegeUserId]);
    }

    const result = await client.query(`DELETE FROM colleges WHERE id=$1 RETURNING *`, [id]);

    await client.query('COMMIT');

    res.json({ message: 'College deleted successfully' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Delete college error:', err);
    res.status(500).json({ error: 'Failed to delete college' });
  } finally {
    client.release();
  }
};




