// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useEffect, useState } from 'react';
// import api from '../api/axios';

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [unread, setUnread] = useState(0);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     if (!user) return;

//     const fetchNotifications = async () => {
//       try {
//         const res = await api.get('/notifications');
//         setUnread(res.data.unread_count || 0);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchNotifications();

//     const interval = setInterval(fetchNotifications, 30000);
//     return () => clearInterval(interval);
//   }, [user]);

//   const links = {
//     super_admin: [
//       { to: '/admin/dashboard', label: 'Dashboard' },
//     ],
//     college: [
//       { to: '/college/dashboard', label: 'Dashboard' },
//       { to: '/college/create-club', label: 'Create Club' },
//     ],
//     club_manager: [
//       { to: '/manager/dashboard', label: 'Dashboard' },
//       { to: '/manager/events/create', label: 'Create Event' },
//     ],
//     student: [
//       { to: '/student/clubs', label: 'Browse Clubs' },
//       { to: '/student/applications', label: 'My Applications' },
//       { to: '/student/events', label: 'Events' },
//     ],
//   };

//   const effectiveRole = user?.sessionRole || user?.role;
//   const roleLinks = user ? links[effectiveRole] || [] : [];

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

//         .navbar-dark {
//           background: rgba(13, 11, 26, 0.96);
//           backdrop-filter: blur(20px);
//           -webkit-backdrop-filter: blur(20px);
//           border-bottom: 1px solid rgba(127, 119, 221, 0.2);
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
//           position: sticky;
//           top: 0;
//           z-index: 1000;
//         }

//         .navbar-container {
//           max-width: 1280px;
//           margin: 0 auto;
//           padding: 0 20px;
//           height: 72px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .navbar-brand {
//           font-family: 'Syne', sans-serif;
//           font-weight: 800;
//           font-size: clamp(1.5rem, 5vw, 2.1rem);
//           letter-spacing: -0.6px;
//           color: #eceaff;
//           text-decoration: none;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .navbar-logo {
//           width: 42px;
//           height: 42px;
//           background: linear-gradient(135deg, #6366f1 0%, #7f77dd 100%);
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 0 20px rgba(99, 102, 241, 0.35);
//           flex-shrink: 0;
//         }

//         .cs-brand-name { 
//           font-size: 27px; 
//           font-weight: 700; 
//           letter-spacing: -0.6px; 
//           color: #f0eeff; 
//         }
//         .cs-brand-name span { color: #7F77DD; }

//         .nav-links {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .navbar-link {
//           color: #b3b3c7;
//           text-decoration: none;
//           font-weight: 500;
//           font-size: 0.95rem;
//           padding: 8px 16px;
//           border-radius: 8px;
//           transition: all 0.2s ease;
//           white-space: nowrap;
//         }

//         .navbar-link:hover {
//           color: #6366f1;
//           background: rgba(99, 102, 241, 0.1);
//         }

//         .navbar-right {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .navbar-btn {
//           padding: 9px 18px;
//           border-radius: 10px;
//           font-weight: 600;
//           font-size: 0.9rem;
//           cursor: pointer;
//           transition: all 0.2s;
//           border: none;
//           white-space: nowrap;
//         }

//         .navbar-btn-primary {
//           background: #6366f1;
//           color: white;
//         }
//         .navbar-btn-primary:hover {
//           background: #4f52e8;
//           box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
//         }

//         .navbar-btn-secondary {
//           background: rgba(255, 255, 255, 0.08);
//           color: #b3b3c7;
//           border: 1px solid rgba(255, 255, 255, 0.12);
//         }
//         .navbar-btn-secondary:hover {
//           background: rgba(255, 255, 255, 0.15);
//           color: #eceaff;
//         }

//         .navbar-notification {
//           position: relative;
//           padding: 10px;
//           border-radius: 50%;
//           transition: background 0.2s;
//         }

//         .navbar-notification:hover {
//           background: rgba(255, 255, 255, 0.08);
//         }

//         .navbar-badge {
//           position: absolute;
//           top: 6px;
//           right: 6px;
//           width: 18px;
//           height: 18px;
//           background: #ef4444;
//           color: white;
//           border-radius: 50%;
//           font-size: 0.68rem;
//           font-weight: bold;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border: 2px solid rgba(13, 11, 26, 0.95);
//         }

//         .navbar-role {
//           background: rgba(99, 102, 241, 0.2);
//           color: #a5b4fc;
//           padding: 5px 12px;
//           border-radius: 9999px;
//           font-size: 0.8rem;
//           font-weight: 600;
//           text-transform: capitalize;
//           white-space: nowrap;
//         }

//         /* Mobile Menu */
//         .mobile-menu {
//           display: none;
//           position: absolute;
//           top: 72px;
//           left: 0;
//           right: 0;
//           background: rgba(13, 11, 26, 0.98);
//           backdrop-filter: blur(20px);
//           border-top: 1px solid rgba(127, 119, 221, 0.15);
//           padding: 20px;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
//         }

//         .mobile-menu.open {
//           display: block;
//         }

//         .mobile-link {
//           display: block;
//           padding: 14px 16px;
//           color: #b3b3c7;
//           text-decoration: none;
//           font-size: 1.05rem;
//           border-radius: 10px;
//           margin-bottom: 6px;
//         }

//         .mobile-link:hover {
//           background: rgba(99, 102, 241, 0.1);
//           color: #6366f1;
//         }

//         /* Hamburger */
//         .hamburger {
//           display: none;
//           flex-direction: column;
//           gap: 4px;
//           cursor: pointer;
//           padding: 8px;
//         }

//         .hamburger span {
//           width: 26px;
//           height: 2.5px;
//           background: #c4c4d8;
//           border-radius: 2px;
//           transition: all 0.3s ease;
//         }

//         /* Responsive Breakpoints */
//         @media (max-width: 992px) {
//           .nav-links {
//             display: none;
//           }
//           .hamburger {
//             display: flex;
//           }
//         }

//         @media (max-width: 576px) {
//           .navbar-container {
//             padding: 0 16px;
//             height: 68px;
//           }
//           .navbar-brand {
//             font-size: 1.65rem;
//           }
//           .navbar-logo {
//             width: 38px;
//             height: 38px;
//           }
//         }
//       `}</style>

//       <nav className="navbar-dark">
//         <div className="navbar-container">
//           {/* Logo */}
//           <Link to="/" className="navbar-brand">
//             <div className="navbar-logo">
//               <svg viewBox="0 0 20 20" fill="none" style={{ width: '24px', height: '24px' }}>
//                 <path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
//                 <path d="M10 2v12M3 6l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
//               </svg>
//             </div>
//             <span className="cs-brand-name">Club<span>Sphere</span></span>
//           </Link>

//           {/* Desktop Navigation Links */}
//           {user && (
//             <div className="nav-links">
//               {roleLinks.map((link) => (
//                 <Link
//                   key={link.to}
//                   to={link.to}
//                   className="navbar-link"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </div>
//           )}

//           {/* Right Side */}
//           <div className="navbar-right">
//             {user ? (
//               <>
//                 <Link to="/notifications" className="navbar-notification">
//                   <svg style={{ width: '22px', height: '22px', color: '#b3b3c7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                       d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                   </svg>
//                   {unread > 0 && (
//                     <span className="navbar-badge">{unread > 9 ? '9+' : unread}</span>
//                   )}
//                 </Link>

//                 <span className="navbar-role">
//                   {(user.sessionRole || user.role).replace('_', ' ')}
//                 </span>

//                 {user?.availableRoles?.length > 1 && (
//                   <button
//                     onClick={() => navigate('/choose-role')}
//                     className="navbar-btn"
//                     style={{ 
//                       background: 'rgba(127,119,221,0.15)', 
//                       color: '#7F77DD', 
//                       border: '1px solid rgba(127,119,221,0.3)',
//                       fontSize: '0.82rem',
//                       padding: '8px 14px'
//                     }}
//                   >
//                     Switch
//                   </button>
//                 )}

//                 <button
//                   onClick={logout}
//                   className="navbar-btn navbar-btn-secondary"
//                 >
//                   Logout
//                 </button>

//                 {/* Hamburger Menu Button */}
//                 <div className="hamburger" onClick={toggleMenu}>
//                   <span style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
//                   <span style={{ opacity: isMenuOpen ? '0' : '1' }}></span>
//                   <span style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></span>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="navbar-link">Login</Link>
//                 <Link to="/register" className="navbar-btn navbar-btn-primary">Get Started</Link>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {user && (
//           <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
//             {roleLinks.map((link) => (
//               <Link
//                 key={link.to}
//                 to={link.to}
//                 className="mobile-link"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [unread, setUnread] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!user) return;
    const fetchNotifications = async () => {
      try {
        const res = await api.get('/notifications');
        setUnread(res.data.unread_count || 0);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const links = {
    super_admin: [{ to: '/admin/dashboard', label: 'Dashboard', icon: '⬡' }],
    college: [
      { to: '/college/dashboard', label: 'Dashboard', icon: '⬡' },
      { to: '/college/create-club', label: 'Create Club', icon: '+' },
    ],
    club_manager: [
      { to: '/manager/dashboard', label: 'Dashboard', icon: '⬡' },
      { to: '/manager/events/create', label: 'Create Event', icon: '+' },
    ],
    student: [
      { to: '/student/clubs', label: 'Browse Clubs', icon: '◈' },
      { to: '/student/applications', label: 'My Applications', icon: '◎' },
      { to: '/student/events', label: 'Events', icon: '◷' },
    ],
  };

  const effectiveRole = user?.sessionRole || user?.role;
  const roleLinks = user ? links[effectiveRole] || [] : [];
  const roleLabel = effectiveRole?.replace(/_/g, ' ') || '';

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + '/');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        :root {
          --nav-bg: rgba(8, 6, 20, 0.92);
          --nav-border: rgba(120, 113, 255, 0.15);
          --nav-h: 68px;
          --accent: #7C6FFF;
          --accent-dim: rgba(124, 111, 255, 0.15);
          --accent-glow: rgba(124, 111, 255, 0.35);
          --text-primary: #EDEAFF;
          --text-muted: #8A87A8;
          --text-dim: #5A5778;
          --surface: rgba(255, 255, 255, 0.04);
          --surface-hover: rgba(255, 255, 255, 0.08);
          --border: rgba(255, 255, 255, 0.07);
          --red: #FF4E6A;
          --green: #34D399;
        }

        /* ── Base ── */
        .nb {
          position: sticky;
          top: 0;
          z-index: 1000;
          font-family: 'Outfit', system-ui, sans-serif;
          transition: box-shadow 0.35s ease, border-color 0.35s ease;
        }

        /* Thin iridescent top line */
        .nb::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), #a78bfa, var(--accent), transparent);
          opacity: 0.6;
        }

        .nb-inner {
          background: var(--nav-bg);
          border-bottom: 1px solid var(--nav-border);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          transition: box-shadow 0.3s ease;
        }

        .nb.scrolled .nb-inner {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
          border-bottom-color: rgba(120, 113, 255, 0.25);
        }

        .nb-wrap {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 24px;
          height: var(--nav-h);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Logo ── */
        .nb-logo {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          margin-right: 8px;
        }

        .nb-logo-icon {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #6F67FF 0%, #9D77FF 100%);
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 18px var(--accent-glow);
          transition: box-shadow 0.3s, transform 0.3s;
        }

        .nb-logo:hover .nb-logo-icon {
          box-shadow: 0 0 28px var(--accent-glow);
          transform: rotate(-6deg) scale(1.05);
        }

        .nb-logo-text {
          font-size: 1.45rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: var(--text-primary);
          line-height: 1;
        }

        .nb-logo-text em {
          font-style: normal;
          color: var(--accent);
        }

        /* ── Desktop nav links ── */
        .nb-links {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
        }

        .nb-link {
          position: relative;
          padding: 7px 14px;
          border-radius: 9px;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }

        .nb-link:hover {
          color: var(--text-primary);
          background: var(--surface-hover);
        }

        .nb-link.active {
          color: var(--accent);
          background: var(--accent-dim);
        }

        /* Active underline dot */
        .nb-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent);
        }

        /* ── Right side ── */
        .nb-right {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-left: auto;
          flex-shrink: 0;
        }

        /* Notification bell */
        .nb-notif {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-muted);
          text-decoration: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          cursor: pointer;
        }

        .nb-notif:hover {
          background: var(--surface-hover);
          color: var(--text-primary);
          border-color: rgba(255,255,255,0.14);
        }

        .nb-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          min-width: 18px;
          height: 18px;
          padding: 0 4px;
          background: var(--red);
          color: white;
          border-radius: 9px;
          font-size: 0.62rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #080614;
          animation: pulse-badge 2s infinite;
        }

        @keyframes pulse-badge {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 78, 106, 0.5); }
          50% { box-shadow: 0 0 0 5px rgba(255, 78, 106, 0); }
        }

        /* Role pill */
        .nb-role {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--accent);
          background: var(--accent-dim);
          border: 1px solid rgba(124, 111, 255, 0.25);
          padding: 5px 11px;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        /* Buttons */
        .nb-btn {
          height: 38px;
          padding: 0 16px;
          border-radius: 10px;
          font-family: 'Outfit', system-ui, sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }

        .nb-btn-primary {
          background: linear-gradient(135deg, #7C6FFF 0%, #9D77FF 100%);
          color: white;
          box-shadow: 0 4px 14px rgba(124, 111, 255, 0.3);
        }

        .nb-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(124, 111, 255, 0.45);
        }

        .nb-btn-ghost {
          background: var(--surface);
          color: var(--text-muted);
          border: 1px solid var(--border);
        }

        .nb-btn-ghost:hover {
          background: var(--surface-hover);
          color: var(--text-primary);
          border-color: rgba(255,255,255,0.14);
        }

        .nb-btn-switch {
          background: rgba(124,111,255,0.1);
          color: #a78bfa;
          border: 1px solid rgba(124,111,255,0.2);
        }
        .nb-btn-switch:hover {
          background: rgba(124,111,255,0.2);
          border-color: rgba(124,111,255,0.4);
        }

        /* Divider */
        .nb-divider {
          width: 1px;
          height: 22px;
          background: var(--border);
          flex-shrink: 0;
        }

        /* ── Hamburger ── */
        .nb-ham {
          display: none;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--surface);
          border: 1px solid var(--border);
          cursor: pointer;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 5px;
          transition: background 0.2s;
          flex-shrink: 0;
        }

        .nb-ham:hover { background: var(--surface-hover); }

        .nb-ham span {
          display: block;
          height: 2px;
          background: var(--text-muted);
          border-radius: 2px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nb-ham span:nth-child(1) { width: 18px; }
        .nb-ham span:nth-child(2) { width: 24px; }
        .nb-ham span:nth-child(3) { width: 18px; }

        .nb-ham.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
          width: 24px;
        }
        .nb-ham.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .nb-ham.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
          width: 24px;
        }

        /* ── Mobile drawer ── */
        .nb-drawer {
          position: fixed;
          top: var(--nav-h);
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          /* Slide from top */
          transform: translateY(-20px);
          opacity: 0;
          visibility: hidden;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.35s ease,
                      visibility 0s linear 0.35s;
        }

        .nb-drawer-bg {
          position: absolute;
          inset: 0;
          background: rgba(8, 6, 20, 0.97);
          backdrop-filter: blur(24px);
        }

        .nb-drawer.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.35s ease,
                      visibility 0s linear 0s;
        }

        .nb-drawer-inner {
          position: relative;
          z-index: 1;
          padding: 20px 20px 40px;
          max-width: 540px;
          margin: 0 auto;
          width: 100%;
        }

        /* Section label in drawer */
        .nb-drawer-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 0 12px;
          margin: 20px 0 8px;
        }

        .nb-drawer-label:first-child { margin-top: 0; }

        .nb-drawer-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 12px;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s;
          margin-bottom: 4px;
          border: 1px solid transparent;
        }

        .nb-drawer-link:hover,
        .nb-drawer-link:active {
          background: var(--surface-hover);
          color: var(--text-primary);
          border-color: var(--border);
        }

        .nb-drawer-link.active {
          background: var(--accent-dim);
          color: var(--accent);
          border-color: rgba(124, 111, 255, 0.2);
        }

        .nb-drawer-link-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
          transition: background 0.2s;
        }

        .nb-drawer-link.active .nb-drawer-link-icon {
          background: rgba(124, 111, 255, 0.2);
        }

        .nb-drawer-sep {
          height: 1px;
          background: var(--border);
          margin: 16px 0;
        }

        .nb-drawer-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .nb-drawer-btn {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          font-family: 'Outfit', system-ui, sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          border: none;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.2s;
          text-decoration: none;
        }

        .nb-drawer-btn-switch {
          background: rgba(124,111,255,0.1);
          color: #a78bfa;
          border: 1px solid rgba(124,111,255,0.2);
        }
        .nb-drawer-btn-switch:hover { background: rgba(124,111,255,0.18); }

        .nb-drawer-btn-logout {
          background: var(--surface);
          color: var(--text-muted);
          border: 1px solid var(--border);
        }
        .nb-drawer-btn-logout:hover {
          background: rgba(255, 78, 106, 0.1);
          color: var(--red);
          border-color: rgba(255, 78, 106, 0.25);
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 900px) {
          .nb-links { display: none; }
          .nb-role { display: none; }
          .nb-divider { display: none; }
          .nb-ham { display: flex; }
        }

        @media (max-width: 500px) {
          .nb-wrap { padding: 0 16px; gap: 6px; }
          .nb-logo-text { font-size: 1.25rem; }
          .nb-logo-icon { width: 34px; height: 34px; border-radius: 9px; }
          .nb-btn { height: 36px; padding: 0 13px; font-size: 0.84rem; }
        }

        @media (max-width: 380px) {
          .nb-logo-text { display: none; }
        }
      `}</style>

      <nav className={`nb${scrolled ? ' scrolled' : ''}`}>
        <div className="nb-inner">
          <div className="nb-wrap">

            {/* ── Logo ── */}
            <Link to="/" className="nb-logo">
              <div className="nb-logo-icon">
                <svg viewBox="0 0 20 20" fill="none" width="22" height="22">
                  <path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M10 2v12M3 6l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="nb-logo-text">Club<em>Sphere</em></span>
            </Link>

            {/* ── Desktop nav links ── */}
            {user && (
              <div className="nb-links">
                {roleLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`nb-link${isActive(link.to) ? ' active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {/* ── Right side ── */}
            <div className="nb-right">
              {user ? (
                <>
                  {/* Role chip — desktop only */}
                  <span className="nb-role">{roleLabel}</span>
                  <div className="nb-divider" />

                  {/* Notification */}
                  <Link to="/notifications" className="nb-notif">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                    {unread > 0 && (
                      <span className="nb-badge">{unread > 9 ? '9+' : unread}</span>
                    )}
                  </Link>

                  {/* Switch role — desktop */}
                  {user?.availableRoles?.length > 1 && (
                    <button onClick={() => navigate('/choose-role')} className="nb-btn nb-btn-switch">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3L4 7l4 4M16 21l4-4-4-4M4 7h16M4 17h16"/>
                      </svg>
                      Switch
                    </button>
                  )}

                  {/* Logout — desktop */}
                  <button onClick={logout} className="nb-btn nb-btn-ghost">
                    Logout
                  </button>

                  {/* Hamburger */}
                  <button
                    className={`nb-ham${isMenuOpen ? ' open' : ''}`}
                    onClick={() => setIsMenuOpen(v => !v)}
                    aria-label="Toggle menu"
                  >
                    <span />
                    <span />
                    <span />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nb-btn nb-btn-ghost">Login</Link>
                  <Link to="/register" className="nb-btn nb-btn-primary">
                    Get Started
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {user && (
          <div className={`nb-drawer${isMenuOpen ? ' open' : ''}`}>
            <div className="nb-drawer-bg" onClick={() => setIsMenuOpen(false)} />
            <div className="nb-drawer-inner">

              <p className="nb-drawer-label">Navigation</p>
              {roleLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nb-drawer-link${isActive(link.to) ? ' active' : ''}`}
                >
                  <span className="nb-drawer-link-icon">{link.icon}</span>
                  {link.label}
                </Link>
              ))}

              <div className="nb-drawer-sep" />

              <p className="nb-drawer-label">Account</p>
              <div className="nb-drawer-actions">

                {/* Notification shortcut */}
                <Link to="/notifications" className="nb-drawer-btn nb-drawer-btn-logout" style={{ textDecoration: 'none' }}>
                  <span style={{ fontSize: '1.1rem' }}>🔔</span>
                  Notifications
                  {unread > 0 && (
                    <span style={{
                      marginLeft: 'auto',
                      background: 'var(--red)',
                      color: '#fff',
                      borderRadius: '8px',
                      padding: '2px 8px',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}>{unread}</span>
                  )}
                </Link>

                {user?.availableRoles?.length > 1 && (
                  <button
                    onClick={() => { navigate('/choose-role'); setIsMenuOpen(false); }}
                    className="nb-drawer-btn nb-drawer-btn-switch"
                  >
                    <span style={{ fontSize: '1.1rem' }}>⇄</span>
                    Switch Role
                    <span style={{
                      marginLeft: 'auto',
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.7rem',
                      opacity: 0.7,
                      textTransform: 'uppercase'
                    }}>{roleLabel}</span>
                  </button>
                )}

                <button
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="nb-drawer-btn nb-drawer-btn-logout"
                >
                  <span style={{ fontSize: '1.1rem' }}>→</span>
                  Logout
                </button>
              </div>

            </div>
          </div>
        )}
      </nav>
    </>
  );
}