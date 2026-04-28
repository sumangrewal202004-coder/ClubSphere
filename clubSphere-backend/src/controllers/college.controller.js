const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.registerCollege = async (req, res) => {
  const {
    name,
    domain,
    email,
    phone,
    // new fields
    website,
    address,
    collegeType,
    regNumber,
    accreditation,
    university,
    yearEstablished,
  } = req.body;

  const rawDomain = domain ? domain.trim() : '';
  const cleanDomain = rawDomain.replace(/^@+/, '').toLowerCase();

  // ── Basic validation ────────────────────────────────────
  if (!name || !cleanDomain || !email || !phone) {
    return res.status(400).json({ error: 'Name, domain, email and phone are required.' });
  }

  // Temporarily commented out for testing
  // if (!req.files || req.files.length === 0) {
  //   return res.status(400).json({ error: 'At least one verification document is required.' });
  // }

  // Year sanity check
  const year = yearEstablished ? parseInt(yearEstablished, 10) : null;
  if (year && (year < 1800 || year > new Date().getFullYear())) {
    return res.status(400).json({ error: 'Please enter a valid year of establishment.' });
  }

  try {
    // ── Check if college with this domain already exists ──────────────────────────────────────────────
    const existingCollege = await db.query(
      `SELECT id, status, email FROM colleges WHERE domain=$1`,
      [cleanDomain]
    );

    if (existingCollege.rows.length > 0) {
      const existing = existingCollege.rows[0];
      if (existing.status === 'rejected') {
        // Delete the rejected college and its associated user/documents
        await db.query(`DELETE FROM college_documents WHERE college_id=$1`, [existing.id]);
        await db.query(`DELETE FROM users WHERE college_id=$1`, [existing.id]);
        await db.query(`DELETE FROM colleges WHERE id=$1`, [existing.id]);
      } else {
        // Pending or approved - cannot register again
        return res.status(409).json({ error: 'A college with this email domain is already registered.' });
      }
    }

    // ── Insert college record ──────────────────────────────────────
    const result = await db.query(
      `INSERT INTO colleges
         (name, domain, email, phone,
          website, address, college_type, reg_number,
          accreditation, university_affiliation, year_established)
       VALUES
         ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [
        name,
        cleanDomain,
        email,
        phone,
        website        ? website.trim()       : null,
        address        ? address.trim()       : null,
        collegeType    ? collegeType.trim()   : null,  // must be government/private/autonomous or null
        regNumber      ? regNumber.trim()     : null,
        accreditation  ? accreditation.trim() : null,
        university     ? university.trim()    : null,
        year           || null,
      ]
    );

    const collegeId = result.rows[0].id;

    // ── Save uploaded documents ────────────────────────────────────
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await db.query(
          `INSERT INTO college_documents (college_id, file_path)
           VALUES ($1, $2)`,
          [collegeId, file.path]
        );
      }
    }

    // ── Create the college user account ────────────────────────────────────
    const placeholderHash = await bcrypt.hash('placeholder_not_used', 10);
    await db.query(
      `INSERT INTO users (email, password_hash, role, name, college_id)
       VALUES ($1, $2, 'college', $3, NULL)`,
      [email, placeholderHash, name]
    );

    res.status(201).json({
      message: 'College registration submitted for approval.',
      collegeId,
    });

  } catch (err) {
    console.error('[registerCollege]', err);

    res.status(500).json({ error: 'Failed to register college. Please try again.' });
  }
};