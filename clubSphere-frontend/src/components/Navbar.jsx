import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!user) return;
    api.get('/notifications').then(res => setUnread(res.data.unread_count)).catch(() => {});
    const interval = setInterval(() => {
      api.get('/notifications').then(res => setUnread(res.data.unread_count)).catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const links = {
    super_admin: [
      { to: '/admin/dashboard', label: 'Dashboard' },
    ],
    college: [
      { to: '/college/dashboard', label: 'Dashboard' },
      { to: '/college/create-club', label: 'Create Club' },
    ],
    club_manager: [
      { to: '/manager/dashboard', label: 'Dashboard' },
      { to: '/manager/events/create', label: 'Create Event' },
    ],
    student: [
      { to: '/student/clubs', label: 'Browse Clubs' },
      { to: '/student/applications', label: 'My Applications' },
      { to: '/student/events', label: 'Events' },
    ],
  };

  const roleLinks = user ? links[user.role] || [] : [];

  return (
    <>
      <style>{`
        .navbar-dark {
          background: rgba(13, 11, 26, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(127, 119, 221, 0.2);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
        }
           .cs-brand-name { font-size:27px;font-weight:700;letter-spacing:-.6px;color:#f0eeff; }
  .cs-brand-name span { color:#7F77DD; }
        .navbar-brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 2.5rem;
          letter-spacing: -0.5px;
          color: #eceaff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .navbar-logo {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #6366f1 0%, #7f77dd 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        }
        .navbar-link {
          color: #b3b3c7;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
          padding: 8px 16px;
          border-radius: 8px;
        }
        .navbar-link:hover {
          color: #6366f1;
          background: rgba(99, 102, 241, 0.1);
        }
        .navbar-btn {
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }
        .navbar-btn-primary {
          background: #6366f1;
          color: white;
        }
        .navbar-btn-primary:hover {
          background: #5855eb;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
        }
        .navbar-btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #b3b3c7;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .navbar-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #eceaff;
        }
        .navbar-notification {
          position: relative;
          padding: 8px;
          border-radius: 50%;
          transition: background 0.2s;
        }
        .navbar-notification:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .navbar-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 18px;
          height: 18px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          font-size: 0.7rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .navbar-role {
          background: rgba(99, 102, 241, 0.2);
          color: #a5b4fc;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: capitalize;
        }
      `}</style>

      <nav className="navbar-dark">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <div className="navbar-logo">
              <svg viewBox="0 0 20 20" fill="none" style={{ width: '24px', height: '24px' }}>
                <path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M10 2v12M3 6l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
          <span className="cs-brand-name">Club<span>Sphere</span></span>
          </Link>

          {/* Nav Links */}
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {roleLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="navbar-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user ? (
              <>
                {/* Notification bell */}
                <Link to="/notifications" className="navbar-notification">
                  <svg style={{ width: '20px', height: '20px', color: '#b3b3c7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unread > 0 && (
                    <span className="navbar-badge">
                      {unread > 9 ? '9+' : unread}
                    </span>
                  )}
                </Link>

                {/* Role badge */}
                <span className="navbar-role">
                  {user.role.replace('_', ' ')}
                </span>

                <button
                  onClick={logout}
                  className="navbar-btn navbar-btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/register" className="navbar-btn navbar-btn-primary">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}