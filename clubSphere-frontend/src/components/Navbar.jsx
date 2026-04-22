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
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600 tracking-tight">
          Club<span className="text-gray-800">Sphere</span>
        </Link>

        {/* Nav Links */}
        {user && (
          <div className="hidden md:flex items-center gap-6">
            {roleLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Notification bell */}
              <Link to="/notifications" className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unread > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {unread > 9 ? '9+' : unread}
                  </span>
                )}
              </Link>

              {/* Role badge */}
              <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-medium capitalize">
                {user.role.replace('_', ' ')}
              </span>

              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-600 hover:text-indigo-600 font-medium">Login</Link>
              <Link to="/register" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}