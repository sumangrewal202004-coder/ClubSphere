const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
 
const app = express();
const db = require('./src/config/db');
 
app.use(cors({
  origin: [
    'http://localhost:5173',
    process.env.FRONTEND_URL
  ],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 
// ── Routes ──────────────────────────────────────────
const authRoutes         = require('./src/routes/auth.routes');
const clubRoutes         = require('./src/routes/clubs.routes');
const applicationRoutes  = require('./src/routes/applications.routes');
const managerRoutes      = require('./src/routes/manager.routes');
const eventRoutes        = require('./src/routes/Events.routes');
const notificationRoutes = require('./src/routes/Notifications.routes');
const collegeRoutes = require('./src/routes/college.routes');
const adminRoutes = require('./src/routes/admin.routes');
const otpRoutes = require('./src/routes/otp.routes');
app.use('/api/otp', otpRoutes);
app.use('/api/auth',          authRoutes);
app.use('/api/clubs',         clubRoutes);
app.use('/api/applications',  applicationRoutes);
app.use('/api/manager',       managerRoutes);
app.use('/api/events',        eventRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/admin', adminRoutes);
// ── Health checks ────────────────────────────────────
app.get('/', (req, res) => res.send('ClubSphere API Running 🚀'));
 
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('DB Error');
  }
});
 

// ── Start ────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));