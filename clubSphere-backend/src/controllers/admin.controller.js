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
    res.status(500).json({ error: 'Update failed' });
  }
};




