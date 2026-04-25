// const db = require('../config/db');
// const bcrypt = require('bcryptjs');

// exports.registerCollege = async (req, res) => {
//   const { name, domain, email, phone } = req.body;

//   try {
//     if (!name || !domain || !email) {
//       return res.status(400).json({ error: 'Name, domain, and email are required' });
//     }

//     // Strip leading '@' if user typed it e.g. "@gmail.com" → "gmail.com"
//     const cleanDomain = domain.startsWith('@') ? domain.slice(1) : domain;

//     const existingDomain = await db.query(
//       `SELECT id FROM colleges WHERE domain=$1`, [cleanDomain]
//     );
//     if (existingDomain.rows.length > 0) {
//       return res.status(400).json({ error: 'A college with this domain is already registered' });
//     }

//     const existingUser = await db.query(
//       `SELECT id FROM users WHERE email=$1`, [email]
//     );
//     if (existingUser.rows.length > 0) {
//       return res.status(400).json({ error: 'This email is already registered' });
//     }

//     // Insert into colleges (status = 'pending' by default)
//     const college = await db.query(
//       `INSERT INTO colleges (name, domain, email, phone)
//        VALUES ($1, $2, $3, $4)
//        RETURNING *`,
//       [name, cleanDomain, email, phone]
//     );

//     const collegeData = college.rows[0];

//     // Save uploaded documents
//     if (req.files && req.files.length > 0) {
//       for (let file of req.files) {
//         await db.query(
//           `INSERT INTO college_documents (college_id, file_path)
//            VALUES ($1, $2)`,
//           [collegeData.id, file.path]
//         );
//       }
//     }

//     // Create users row so college can log in after approval
//     const placeholderHash = await bcrypt.hash('placeholder_not_used', 10);
//     await db.query(
//       `INSERT INTO users (email, password_hash, role, name, college_id)
//        VALUES ($1, $2, 'college', $3, $4)`,
//       [email, placeholderHash, name, collegeData.id]
//     );

//     res.json({
//       message: 'College application submitted for approval. You will be able to log in once approved.',
//       college: {
//         id: collegeData.id,
//         name: collegeData.name,
//         domain: collegeData.domain,
//         status: collegeData.status
//       }
//     });

//   } catch (err) {
//     console.error('College registration error:', err);
//     res.status(500).json({ error: 'Failed to register college' });
//   }
// };

const db = require('../config/db');

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

  // ── Basic validation ──────────────────────────────────────────────
  if (!name || !domain || !email || !phone) {
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
      [domain]
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
        domain,
        email,
        phone,
        website        || null,
        address        || null,
        collegeType    || null,
        regNumber      || null,
        accreditation  || null,
        university     || null,
        year           || null,
      ]
    );

    const collegeId = result.rows[0].id;

    // ── Save uploaded documents ────────────────────────────────────
    // Temporarily commented out for testing
    // for (const file of req.files) {
    //   await db.query(
    //     `INSERT INTO college_documents (college_id, file_path)
    //      VALUES ($1, $2)`,
    //     [collegeId, file.path]
    //   );
    // }

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