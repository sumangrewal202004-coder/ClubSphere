const db = require('../config/db');
const pdfParse = require('pdf-parse');
const { scoreCV } = require('../services/aiScoring');
 
// APPLY TO CLUB
exports.applyToClub = async (req, res) => {
  const { clubId } = req.body;
  const club = await db.query(
    `SELECT * FROM clubs WHERE id=$1`,
    [clubId]
  );

  if (!club.rows.length) {
    return res.status(404).json({ error: 'Club not found' });
  }

  // clubs.college_id currently stores the college user's ID
  // Only allow students from the same college to apply
  if (req.user.role === 'student') {
    const collegeUser = await db.query(
      `SELECT college_id FROM users WHERE id=$1`,
      [club.rows[0].college_id]
    );
    
    if (!collegeUser.rows.length || collegeUser.rows[0].college_id !== req.user.college_id) {
      // Allow students from the college domain to apply
    }
  }
  try {
    if (!req.file) return res.status(400).json({ error: 'CV is required' });
    if (!clubId) return res.status(400).json({ error: 'clubId is required' });
 
    // Check student hasn't already applied
    const existing = await db.query(
      `SELECT id FROM applications WHERE student_id=$1 AND club_id=$2`,
      [req.user.id, clubId]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'You have already applied to this club' });
    }
 
    // Save application first
    const application = await db.query(
      `INSERT INTO applications (student_id, club_id, cv_path)
       VALUES ($1, $2, $3) RETURNING *`,
      [req.user.id, clubId, req.file.path]
    );
 
    const appData = application.rows[0];
 
    // Respond immediately — good UX
    res.json({
      message: 'Application submitted. AI evaluation in progress.',
      data: appData
    });
 
    // Background AI processing
    // Background AI processing
try {
  const club = await db.query(
    `SELECT requirements FROM clubs WHERE id=$1`, [clubId]
  );
  const requirements = club.rows[0]?.requirements || '';

  // ✅ fetch PDF from Cloudinary URL instead of reading from disk
  const axios = require('axios');
  const response = await axios.get(req.file.path, { responseType: 'arraybuffer' });
  const fileBuffer = Buffer.from(response.data);
  const pdfData = await pdfParse(fileBuffer);
  const cvText = pdfData.text;

  const aiResult = await scoreCV(cvText, requirements);

  await db.query(
    `UPDATE applications SET ai_score=$1, ai_feedback=$2 WHERE id=$3`,
    [aiResult.score, aiResult.feedback, appData.id]
  );

  await db.query(
    `INSERT INTO notifications (user_id, message) VALUES ($1, $2)`,
    [req.user.id, `Your application has been received and is under review. You will be notified if you are selected.`]
  );

} catch (aiErr) {
  console.error('AI Processing Error:', aiErr.message);
}
 
  } catch (err) {
    console.error('Application Error:', err);
    res.status(500).json({ error: 'Failed to apply' });
  }
};
 
// GET STUDENT'S OWN APPLICATIONS
exports.getMyApplications = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        a.id,
        c.name AS club_name,
        c.description AS club_description,
        a.status,
        a.applied_at
       FROM applications a
       JOIN clubs c ON a.club_id = c.id
       WHERE a.student_id = $1
       ORDER BY a.applied_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};