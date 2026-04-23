const db = require('../config/db');

exports.registerCollege = async (req, res) => {
  const { name, domain, email, phone } = req.body;

  try {
    const college = await db.query(
      `INSERT INTO colleges (name, domain, email, phone)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [name, domain, email, phone]
    );

    const collegeId = college.rows[0].id;

    // Save documents
    for (let file of req.files) {
      await db.query(
        `INSERT INTO college_documents (college_id, file_path)
         VALUES ($1,$2)`,
        [collegeId, file.path]
      );
    }

    res.json({ message: 'College submitted for approval' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register college' });
  }
};