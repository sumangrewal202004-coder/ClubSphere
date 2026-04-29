const db = require('../config/db');
 
// CREATE EVENT — club manager posts an event
exports.createEvent = async (req, res) => {
  const { clubId, title, description, venue, event_date } = req.body;
 
  try {
    if (!clubId || !title || !event_date || !venue) {
      return res.status(400).json({ error: 'clubId, title, venue and event_date are required' });
    }
 
    // Verify this manager owns the club
    const club = await db.query(
      `SELECT id, name FROM clubs WHERE id=$1 AND manager_id=$2`,
      [clubId, req.user.id]
    );
    if (club.rows.length === 0) {
      return res.status(403).json({ error: 'You are not the manager of this club' });
    }
 
    const clubName = club.rows[0].name;
 
    // Insert event
    const event = await db.query(
      `INSERT INTO events (club_id, title, description, venue, event_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [clubId, title, description, venue, event_date]
    );
 
    const eventData = event.rows[0];
 
    res.json({ message: 'Event created', data: eventData });
 
    // Notify all approved members of this club
    try {
      const members = await db.query(
        `SELECT student_id FROM applications
         WHERE club_id=$1 AND status='approved'`,
        [clubId]
      );
 
      if (members.rows.length > 0) {
        const values = members.rows.map((m, i) =>
          `($${i * 2 + 1}, $${i * 2 + 2})`
        ).join(',');
 
        const params = members.rows.flatMap(m => [
          m.student_id,
          `New event in ${clubName}: "${title}" on ${new Date(event_date).toDateString()} at ${venue}`
        ]);
 
        await db.query(
          `INSERT INTO notifications (user_id, message) VALUES ${values}`,
          params
        );
      }
    } catch (notifErr) {
      console.error('Notification error:', notifErr.message);
    }
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create event' });
  }
};
 
// GET ALL EVENTS — public listing for students
exports.getAllEvents = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        e.id, e.title, e.description, e.venue, e.event_date, e.created_at,
        c.name AS club_name,
        u.name AS college_name
       FROM events e
       JOIN clubs c ON e.club_id = c.id
       JOIN users u ON c.college_id = u.id
       WHERE e.event_date >= NOW()
       ORDER BY e.event_date ASC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};
 
// GET EVENTS FOR A SPECIFIC CLUB
exports.getClubEvents = async (req, res) => {
  const { clubId } = req.params;
  try {
    const result = await db.query(
      `SELECT * FROM events WHERE club_id=$1 ORDER BY event_date ASC`,
      [clubId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch club events' });
  }
};
 
// REGISTER FOR EVENT — student
exports.registerForEvent = async (req, res) => {
  const { eventId } = req.body;
 
  try {
    if (!eventId) return res.status(400).json({ error: 'eventId is required' });
 
    // Check event exists and is upcoming
    const event = await db.query(
      `SELECT id, title, event_date FROM events WHERE id=$1`,
      [eventId]
    );
    if (event.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    if (new Date(event.rows[0].event_date) < new Date()) {
      return res.status(400).json({ error: 'Cannot register for a past event' });
    }
 
    await db.query(
      `INSERT INTO event_registrations (event_id, student_id) VALUES ($1, $2)`,
      [eventId, req.user.id]
    );
 
    // Confirm notification to student
    await db.query(
      `INSERT INTO notifications (user_id, message) VALUES ($1, $2)`,
      [req.user.id, `You have registered for "${event.rows[0].title}" on ${new Date(event.rows[0].event_date).toDateString()}`]
    );
 
    res.json({ message: 'Successfully registered for event' });
  } catch (err) {
    if (err.code === '23505') { // unique violation
      return res.status(400).json({ error: 'You are already registered for this event' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to register' });
  }
};
 
// GET EVENTS STUDENT HAS REGISTERED FOR
exports.getMyRegisteredEvents = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        e.id, e.title, e.description, e.venue, e.event_date,
        c.name AS club_name,
        er.registered_at
       FROM event_registrations er
       JOIN events e ON er.event_id = e.id
       JOIN clubs c ON e.club_id = c.id
       WHERE er.student_id = $1
       ORDER BY e.event_date ASC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch registered events' });
  }
};
 
// GET REGISTRATIONS FOR AN EVENT — manager view
exports.getEventRegistrations = async (req, res) => {
  const { eventId } = req.params;
  try {
    // Verify manager owns the club this event belongs to
    const check = await db.query(
      `SELECT e.id FROM events e
       JOIN clubs c ON e.club_id = c.id
       WHERE e.id=$1 AND c.manager_id=$2`,
      [eventId, req.user.id]
    );
    if (check.rows.length === 0) {
      return res.status(403).json({ error: 'Not authorized' });
    }
 
    const result = await db.query(
      `SELECT u.name, u.email, er.registered_at
       FROM event_registrations er
       JOIN users u ON er.student_id = u.id
       WHERE er.event_id = $1
       ORDER BY er.registered_at ASC`,
      [eventId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
};