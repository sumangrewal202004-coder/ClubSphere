const db = require('../config/db');

// ================= GET APPLICATIONS FOR A CLUB =================
// Only the manager of the club can view applications
exports.getApplications = async (req, res) => {
  const { clubId } = req.params;

  try {
    // 🔒 Verify manager owns this club
    const club = await db.query(
      `SELECT id FROM clubs WHERE id=$1 AND manager_id=$2`,
      [clubId, req.user.id]
    );

    if (club.rows.length === 0) {
      return res.status(403).json({ error: 'You are not the manager of this club' });
    }

    // ✅ Fetch applications
    const result = await db.query(
      `SELECT 
        a.id,
        u.name,
        u.email,
        a.ai_score,
        a.ai_feedback,
        a.status,
        a.applied_at
       FROM applications a
       JOIN users u ON a.student_id = u.id
       WHERE a.club_id = $1
       ORDER BY a.ai_score DESC NULLS LAST`,
      [clubId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};



// ================= UPDATE APPLICATION STATUS =================
// Only the manager of the club can approve/reject
exports.updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Use approved or rejected' });
    }

    // 🔒 Get application + verify ownership
    const appInfo = await db.query(
      `SELECT 
        a.student_id, 
        c.name AS club_name, 
        c.manager_id
       FROM applications a
       JOIN clubs c ON a.club_id = c.id
       WHERE a.id = $1`,
      [id]
    );

    if (appInfo.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const { student_id, club_name, manager_id } = appInfo.rows[0];

    // 🔒 Ownership check
    if (manager_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this application' });
    }

    // ✅ Update status
    const result = await db.query(
      `UPDATE applications 
       SET status=$1 
       WHERE id=$2 
       RETURNING *`,
      [status, id]
    );

    // 🔔 Notify student
    const message =
      status === 'approved'
        ? `Congratulations! Your application to ${club_name} has been approved. 🎉`
        : `Your application to ${club_name} was not selected this time.`;

    await db.query(
      `INSERT INTO notifications (user_id, message) VALUES ($1, $2)`,
      [student_id, message]
    );

    res.json({
      message: `Application ${status}`,
      data: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update status' });
  }
};



// ================= GET CLUBS MANAGED BY THIS MANAGER =================
exports.getMyClubs = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        c.id, 
        c.name, 
        c.description, 
        c.requirements,
        COUNT(a.id) AS total_applications,
        COUNT(CASE WHEN a.status='pending' THEN 1 END) AS pending_count,
        COUNT(CASE WHEN a.status='approved' THEN 1 END) AS approved_count
       FROM clubs c
       LEFT JOIN applications a ON a.club_id = c.id
       WHERE c.manager_id = $1
       GROUP BY c.id
       ORDER BY c.created_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch your clubs' });
  }
};