const db = require('../config/db');
 
// CREATE CLUB — college provides a manager_email to assign
exports.createClub = async (req, res) => {
  const { name, description, requirements, manager_email } = req.body;
 
  try {
    let managerId = req.user.id; // fallback: college itself
 
    if (manager_email) {
      const manager = await db.query(
        `SELECT id FROM users WHERE email=$1 AND role='club_manager'`,
        [manager_email]
      );
      if (manager.rows.length === 0) {
        return res.status(400).json({ error: 'No club_manager found with that email' });
      }
      managerId = manager.rows[0].id;
    }
 
    const result = await db.query(
      `INSERT INTO clubs (name, description, requirements, college_id, manager_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, requirements, req.user.id, managerId]
    );
 
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create club' });
  }
};
 
// GET ALL CLUBS — for students to browse
exports.getClubs = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        c.id, c.name, c.description, c.requirements, c.created_at,
        u.name AS college_name
       FROM clubs c
       JOIN users u ON c.college_id = u.id
       ORDER BY c.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
};
 
// GET CLUBS BELONGING TO THIS COLLEGE
exports.getMyCollegeClubs = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        c.id, c.name, c.description, c.requirements, c.created_at,
        u.name AS manager_name, u.email AS manager_email,
        COUNT(a.id) AS total_applications,
        COUNT(CASE WHEN a.status='pending' THEN 1 END) AS pending_count
       FROM clubs c
       LEFT JOIN users u ON c.manager_id = u.id
       LEFT JOIN applications a ON a.club_id = c.id
       WHERE c.college_id = $1
       GROUP BY c.id, u.name, u.email
       ORDER BY c.created_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch your clubs' });
  }
};
 
// GET SINGLE CLUB DETAIL
exports.getClubById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `SELECT c.*, u.name AS college_name
       FROM clubs c
       JOIN users u ON c.college_id = u.id
       WHERE c.id = $1`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Club not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch club' });
  }
};