// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../../api/axios';

// export default function ManagerDashboard() {
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get('/manager/clubs')
//       .then(res => setClubs(res.data))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div style={{
//       background: '#0a0a0f',
//       minHeight: '100vh',
//       color: '#e8e8f0',
//       padding: '2rem'
//     }}>

//       <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

//         {/* HEADER */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '2rem'
//         }}>
//           <div>
//             <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
//               Manager Dashboard
//             </h1>
//             <p style={{ color: '#7a7a96', marginTop: '4px' }}>
//               Review applications and manage events
//             </p>
//           </div>

//           <Link
//             to="/manager/events/create"
//             style={{
//               padding: '10px 18px',
//               borderRadius: '12px',
//               background: '#6366f1',
//               color: '#fff',
//               textDecoration: 'none',
//               fontWeight: 600,
//               boxShadow: '0 0 30px rgba(99,102,241,0.4)'
//             }}
//           >
//             + Create Event
//           </Link>
//         </div>

//         {/* CONTENT */}
//         {loading ? (
//           <div style={emptyStyle}>Loading your clubs...</div>
//         ) : clubs.length === 0 ? (
//           <div style={emptyCard}>
//             <p style={{ color: '#7a7a96' }}>No clubs assigned to you yet.</p>
//             <p style={{ fontSize: '0.85rem', color: '#6b6b85', marginTop: '4px' }}>
//               Ask your college admin to assign you a club.
//             </p>
//           </div>
//         ) : (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//             {clubs.map(club => (
//               <div key={club.id} style={card}>

//                 {/* TOP */}
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   gap: '1rem'
//                 }}>
//                   <div style={{ flex: 1 }}>
//                     <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>
//                       {club.name}
//                     </h3>
//                     <p style={{
//                       color: '#7a7a96',
//                       fontSize: '0.9rem',
//                       marginTop: '4px'
//                     }}>
//                       {club.description}
//                     </p>
//                   </div>

//                   <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
//                     <span style={badgeGray}>
//                       {club.total_applications} total
//                     </span>

//                     {parseInt(club.pending_count) > 0 && (
//                       <span style={badgeWarning}>
//                         {club.pending_count} pending
//                       </span>
//                     )}

//                     {parseInt(club.approved_count) > 0 && (
//                       <span style={badgeSuccess}>
//                         {club.approved_count} approved
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* ACTIONS */}
//                 <div style={{
//                   display: 'flex',
//                   gap: '10px',
//                   marginTop: '1rem'
//                 }}>
//                   <Link
//                     to={`/manager/clubs/${club.id}/applications`}
//                     style={primaryBtn}
//                   >
//                     View Applications
//                   </Link>

//                   <Link
//                     to="/manager/events/create"
//                     state={{ clubId: club.id, clubName: club.name }}
//                     style={secondaryBtn}
//                   >
//                     Post Event
//                   </Link>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* STYLES */

// const card = {
//   padding: '1.5rem',
//   borderRadius: '16px',
//   background: 'rgba(255,255,255,0.04)',
//   border: '1px solid rgba(255,255,255,0.08)',
//   backdropFilter: 'blur(10px)',
//   transition: '0.2s'
// };

// const emptyStyle = {
//   textAlign: 'center',
//   padding: '4rem',
//   color: '#7a7a96'
// };

// const emptyCard = {
//   textAlign: 'center',
//   padding: '3rem',
//   borderRadius: '20px',
//   border: '1px dashed rgba(255,255,255,0.1)',
//   background: 'rgba(255,255,255,0.03)'
// };

// const badgeGray = {
//   fontSize: '0.7rem',
//   background: 'rgba(255,255,255,0.06)',
//   padding: '4px 8px',
//   borderRadius: '999px',
//   color: '#cfcfe8'
// };

// const badgeWarning = {
//   fontSize: '0.7rem',
//   background: 'rgba(245,158,11,0.1)',
//   color: '#fbbf24',
//   padding: '4px 8px',
//   borderRadius: '999px',
//   fontWeight: 500
// };

// const badgeSuccess = {
//   fontSize: '0.7rem',
//   background: 'rgba(16,185,129,0.1)',
//   color: '#34d399',
//   padding: '4px 8px',
//   borderRadius: '999px'
// };

// const primaryBtn = {
//   padding: '10px 16px',
//   borderRadius: '10px',
//   background: '#6366f1',
//   color: '#fff',
//   textDecoration: 'none',
//   fontWeight: 500,
//   boxShadow: '0 0 20px rgba(99,102,241,0.3)'
// };

// const secondaryBtn = {
//   padding: '10px 16px',
//   borderRadius: '10px',
//   background: 'rgba(255,255,255,0.05)',
//   border: '1px solid rgba(255,255,255,0.1)',
//   color: '#cfcfe8',
//   textDecoration: 'none'
// };


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function ManagerDashboard() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/manager/clubs')
      .then(res => setClubs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalApplications = clubs.reduce((s, c) => s + parseInt(c.total_applications || 0), 0);
  const totalPending     = clubs.reduce((s, c) => s + parseInt(c.pending_count    || 0), 0);
  const totalApproved    = clubs.reduce((s, c) => s + parseInt(c.approved_count   || 0), 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }

        .md-root {
          background: #07050f;
          min-height: 100vh;
          color: #e8e6ff;
          font-family: 'Outfit', system-ui, sans-serif;
          padding: 32px 20px 60px;
        }

        .md-wrap {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .md-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }

        .md-title {
          font-size: clamp(1.6rem, 5vw, 2.2rem);
          font-weight: 800;
          letter-spacing: -0.6px;
          margin: 0 0 5px;
          background: linear-gradient(135deg, #e8e6ff 30%, #9d8fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .md-subtitle {
          color: #6a6888;
          font-size: 0.95rem;
          margin: 0;
        }

        .md-create-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 11px 20px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7C6FFF, #9D77FF);
          color: #fff;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          box-shadow: 0 4px 20px rgba(124,111,255,0.38);
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .md-create-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(124,111,255,0.5);
        }

        /* ── Stats ── */
        .md-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 36px;
        }

        .md-stat {
          padding: 22px 20px;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s;
        }

        .md-stat:hover { border-color: rgba(124,111,255,0.25); }

        .md-stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent, rgba(255,255,255,0.08));
          border-radius: 2px 2px 0 0;
        }

        .md-stat-label {
          font-size: 0.75rem;
          color: #6a6888;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-family: 'DM Mono', monospace;
          margin-bottom: 10px;
        }

        .md-stat-value {
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 800;
          line-height: 1;
          color: var(--val-color, #e8e6ff);
        }

        /* ── Section header ── */
        .md-section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .md-section-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #a8a6c8;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: 'DM Mono', monospace;
          margin: 0;
        }

        .md-count-chip {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: #7C6FFF;
          background: rgba(124,111,255,0.12);
          border: 1px solid rgba(124,111,255,0.2);
          padding: 3px 10px;
          border-radius: 999px;
        }

        /* ── Club cards ── */
        .md-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .md-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 24px;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }

        .md-card:hover {
          border-color: rgba(124,111,255,0.22);
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.28);
        }

        /* Top row: name + badges */
        .md-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 10px;
        }

        .md-card-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #e8e6ff;
          margin: 0;
          line-height: 1.3;
        }

        .md-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          justify-content: flex-end;
          flex-shrink: 0;
        }

        .md-badge {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .md-badge-gray {
          background: rgba(255,255,255,0.06);
          color: #b0aed0;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .md-badge-warn {
          background: rgba(245,158,11,0.12);
          color: #fbbf24;
          border: 1px solid rgba(245,158,11,0.22);
        }

        .md-badge-success {
          background: rgba(52,211,153,0.1);
          color: #34d399;
          border: 1px solid rgba(52,211,153,0.2);
        }

        .md-card-desc {
          color: #6a6888;
          font-size: 0.88rem;
          line-height: 1.55;
          margin: 0 0 18px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Progress bar for pending ratio */
        .md-progress-wrap {
          margin-bottom: 18px;
        }

        .md-progress-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #5a5878;
          margin-bottom: 6px;
          font-family: 'DM Mono', monospace;
        }

        .md-progress-track {
          height: 4px;
          border-radius: 4px;
          background: rgba(255,255,255,0.06);
          overflow: hidden;
        }

        .md-progress-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, #7C6FFF, #34d399);
          transition: width 0.6s ease;
        }

        /* Action buttons */
        .md-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .md-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 18px;
          border-radius: 11px;
          font-family: 'Outfit', system-ui, sans-serif;
          font-size: 0.86rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          white-space: nowrap;
        }

        .md-btn-primary {
          background: linear-gradient(135deg, #7C6FFF, #9D77FF);
          color: #fff;
          box-shadow: 0 4px 14px rgba(124,111,255,0.3);
        }

        .md-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(124,111,255,0.45);
        }

        .md-btn-secondary {
          background: rgba(255,255,255,0.05);
          color: #c8c6e8;
          border: 1px solid rgba(255,255,255,0.09);
        }

        .md-btn-secondary:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.15);
          color: #e8e6ff;
        }

        /* ── Empty / loading ── */
        .md-empty {
          text-align: center;
          padding: 80px 20px;
          color: #4e4c6a;
        }

        .md-empty-card {
          text-align: center;
          padding: 60px 24px;
          border-radius: 20px;
          border: 1px dashed rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
        }

        .md-empty-card p {
          margin: 0 0 6px;
          color: #6a6888;
        }

        .md-empty-card p + p {
          font-size: 0.85rem;
          color: #4e4c6a;
          margin-bottom: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .md-stats { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .md-root { padding: 20px 14px 48px; }
          .md-header { flex-direction: column; align-items: flex-start; }
          .md-create-btn { width: 100%; justify-content: center; }
          .md-stats { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .md-stat { padding: 16px 14px; }
          .md-card { padding: 18px 16px; }
          .md-card-top { flex-direction: column; gap: 10px; }
          .md-badges { justify-content: flex-start; }
          .md-actions { flex-direction: column; }
          .md-btn { justify-content: center; }
        }
      `}</style>

      <div className="md-root">
        <div className="md-wrap">

          {/* ── Header ── */}
          <div className="md-header">
            <div>
              <h1 className="md-title">Manager Dashboard</h1>
              <p className="md-subtitle">Review applications and manage club events</p>
            </div>
            <Link to="/manager/events/create" className="md-create-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Create Event
            </Link>
          </div>

          {/* ── Stats ── */}
          <div className="md-stats">
            {[
              { label: 'My Clubs',     value: clubs.length,      color: '#e8e6ff', accent: 'rgba(124,111,255,0.55)' },
              { label: 'Applications', value: totalApplications, color: '#e8e6ff', accent: 'rgba(99,202,241,0.5)'   },
              { label: 'Pending',      value: totalPending,      color: '#fbbf24', accent: 'rgba(245,158,11,0.55)'  },
              { label: 'Approved',     value: totalApproved,     color: '#34d399', accent: 'rgba(52,211,153,0.55)'  },
            ].map(s => (
              <div
                key={s.label}
                className="md-stat"
                style={{ '--accent': s.accent, '--val-color': s.color }}
              >
                <p className="md-stat-label">{s.label}</p>
                <p className="md-stat-value">{s.value}</p>
              </div>
            ))}
          </div>

          {/* ── Club list ── */}
          <div className="md-section-head">
            <h2 className="md-section-title">Your Clubs</h2>
            {clubs.length > 0 && (
              <span className="md-count-chip">{clubs.length} assigned</span>
            )}
          </div>

          {loading ? (
            <div className="md-empty">Loading your clubs…</div>
          ) : clubs.length === 0 ? (
            <div className="md-empty-card">
              <p>No clubs assigned to you yet.</p>
              <p>Ask your college admin to assign you a club.</p>
            </div>
          ) : (
            <div className="md-list">
              {clubs.map(club => {
                const total    = parseInt(club.total_applications || 0);
                const approved = parseInt(club.approved_count    || 0);
                const pct      = total > 0 ? Math.round((approved / total) * 100) : 0;

                return (
                  <div key={club.id} className="md-card">

                    <div className="md-card-top">
                      <h3 className="md-card-name">{club.name}</h3>
                      <div className="md-badges">
                        <span className="md-badge md-badge-gray">{total} total</span>
                        {parseInt(club.pending_count) > 0 && (
                          <span className="md-badge md-badge-warn">{club.pending_count} pending</span>
                        )}
                        {approved > 0 && (
                          <span className="md-badge md-badge-success">{approved} approved</span>
                        )}
                      </div>
                    </div>

                    {club.description && (
                      <p className="md-card-desc">{club.description}</p>
                    )}

                    {/* Approval progress bar */}
                    {total > 0 && (
                      <div className="md-progress-wrap">
                        <div className="md-progress-meta">
                          <span>Approval rate</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="md-progress-track">
                          <div className="md-progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )}

                    <div className="md-actions">
                      <Link
                        to={`/manager/clubs/${club.id}/applications`}
                        className="md-btn md-btn-primary"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                        </svg>
                        View Applications
                      </Link>

                      <Link
                        to="/manager/events/create"
                        state={{ clubId: club.id, clubName: club.name }}
                        className="md-btn md-btn-secondary"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                          <line x1="12" y1="14" x2="12" y2="18"/>
                          <line x1="10" y1="16" x2="14" y2="16"/>
                        </svg>
                        Post Event
                      </Link>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </>
  );
}