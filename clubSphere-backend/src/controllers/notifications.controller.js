const db = require('../config/db');
 
// GET MY NOTIFICATIONS
exports.getNotifications = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, message, is_read, created_at
       FROM notifications
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 50`,
      [req.user.id]
    );
 
    const unreadCount = result.rows.filter(n => !n.is_read).length;
 
    res.json({
      unread_count: unreadCount,
      notifications: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};
 
// MARK ONE AS READ
exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      `UPDATE notifications SET is_read=true WHERE id=$1 AND user_id=$2`,
      [id, req.user.id]
    );
    res.json({ message: 'Marked as read' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update notification' });
  }
};
 
// MARK ALL AS READ
exports.markAllAsRead = async (req, res) => {
  try {
    await db.query(
      `UPDATE notifications SET is_read=true WHERE user_id=$1`,
      [req.user.id]
    );
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update notifications' });
  }
};