// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../../api/axios';

// export default function CollegeDashboard() {
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(null);
// const changeManager = async (clubId, email) => {
//   try {
//     await api.put(`/clubs/${clubId}/manager`, {
//       manager_email: email
//     });

//     alert('Manager updated');

//     // refresh
//     const res = await api.get('/clubs/mine');
//     setClubs(res.data);

//   } catch (err) {
//     alert(err.response?.data?.error || 'Failed to update manager');
//   }
// };
//   useEffect(() => {
//     api.get('/clubs/mine')
//       .then(res => setClubs(res.data))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);


// const openChangeManagerModal = (clubId) => {
//   const email = prompt("Enter new manager email:");
//   if (!email) return;

//   changeManager(clubId, email);
// };

//   const deleteClub = async (clubId, clubName) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to remove "${clubName}"?\n\nThis will permanently delete the club, all its applications, and events. This cannot be undone.`
//     );
//     if (!confirmed) return;

//     setDeleting(clubId);
//     try {
//       await api.delete(`/clubs/${clubId}`);
//       setClubs(prev => prev.filter(c => c.id !== clubId));
//     } catch (err) {
//       alert(err.response?.data?.error || 'Failed to delete club');
//     } finally {
//       setDeleting(null);
//     }
//   };

//   const totalApplications = clubs.reduce((s, c) => s + parseInt(c.total_applications || 0), 0);
//   const totalPending = clubs.reduce((s, c) => s + parseInt(c.pending_count || 0), 0);

//   return (
//     <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#e8e8f0', padding: '2rem' }}>
//       <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

//         {/* HEADER */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
//           <div>
//             <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>College Dashboard</h1>
//             <p style={{ color: '#7a7a96', marginTop: '4px' }}>Manage all your clubs</p>
//           </div>
//           <Link
//             to="/college/create-club"
//             style={{
//               padding: '10px 18px', borderRadius: '12px', background: '#6366f1',
//               color: '#fff', textDecoration: 'none', fontWeight: 600,
//               boxShadow: '0 0 30px rgba(99,102,241,0.4)', transition: 'all 0.2s'
//             }}
//           >
//             + Create Club
//           </Link>
//         </div>

//         {/* STATS */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
//           {[
//             { label: 'Total Clubs', value: clubs.length, color: '#e8e8f0' },
//             { label: 'Total Applications', value: totalApplications, color: '#e8e8f0' },
//             { label: 'Pending Reviews', value: totalPending, color: '#6366f1' },
//           ].map(stat => (
//             <div key={stat.label} style={cardStyle}>
//               <p style={{ color: '#7a7a96', fontSize: '0.85rem' }}>{stat.label}</p>
//               <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: '5px', color: stat.color }}>{stat.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* CLUBS LIST */}
//         {loading ? (
//           <div style={emptyStyle}>Loading clubs...</div>
//         ) : clubs.length === 0 ? (
//           <div style={emptyCardStyle}>
//             <p style={{ color: '#7a7a96', marginBottom: '10px' }}>No clubs yet</p>
//             <Link to="/college/create-club" style={{ color: '#6366f1', textDecoration: 'none' }}>
//               Create your first club →
//             </Link>
//           </div>
//         ) : (
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
//             {clubs.map(club => (
//               <div key={club.id} style={clubCardStyle}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'flex-start' }}>
//                   <h3 style={{ fontSize: '1.1rem', fontWeight: 600, flex: 1, marginRight: '10px' }}>{club.name}</h3>
//                   <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
//                     <span style={badgeGray}>{club.total_applications} applied</span>
//                     {parseInt(club.pending_count) > 0 && (
//                       <span style={badgeWarning}>{club.pending_count} pending</span>
//                     )}
//                   </div>
//                 </div>

//                 <p style={{ color: '#7a7a96', fontSize: '0.9rem', marginBottom: '14px' }}>
//                   {club.description}
//                 </p>

//                 <div style={{
//                   borderTop: '1px solid rgba(255,255,255,0.06)',
//                   paddingTop: '12px',
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center'
//                 }}>
//                   <div style={{ fontSize: '0.8rem', color: '#6b6b85' }}>
//                     Manager: <span style={{ color: '#e8e8f0' }}>{club.manager_name || 'Not assigned'}</span>
//                   </div>
//  <button
//                 onClick={() => openChangeManagerModal(club.id)}
//                 className="w-full bg-white text-black py-2 rounded-xl font-medium hover:bg-gray-200 transition"
//               >
//                 Change Manager
//               </button>
//                   {/* DELETE BUTTON */}
//                   <button
//                     onClick={() => deleteClub(club.id, club.name)}
//                     disabled={deleting === club.id}
//                     style={{
//                       background: 'rgba(239,68,68,0.1)',
//                       color: '#f87171',
//                       border: '1px solid rgba(239,68,68,0.2)',
//                       borderRadius: '8px',
//                       padding: '5px 12px',
//                       fontSize: '0.75rem',
//                       fontWeight: 600,
//                       cursor: deleting === club.id ? 'not-allowed' : 'pointer',
//                       opacity: deleting === club.id ? 0.5 : 1,
//                       transition: 'all 0.2s'
//                     }}
//                   >
//                     {deleting === club.id ? 'Removing...' : '🗑 Remove Club'}
//                   </button>
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
// const cardStyle = {
//   padding: '1.5rem', borderRadius: '16px',
//   background: 'rgba(255,255,255,0.04)',
//   border: '1px solid rgba(255,255,255,0.08)',
//   backdropFilter: 'blur(10px)',
// };

// const emptyStyle = { textAlign: 'center', padding: '4rem', color: '#7a7a96' };

// const emptyCardStyle = {
//   textAlign: 'center', padding: '3rem', borderRadius: '20px',
//   border: '1px dashed rgba(255,255,255,0.1)',
//   background: 'rgba(255,255,255,0.03)'
// };

// const clubCardStyle = {
//   padding: '1.5rem', borderRadius: '16px',
//   background: 'rgba(255,255,255,0.04)',
//   border: '1px solid rgba(255,255,255,0.08)',
//   transition: '0.2s',
// };

// const badgeGray = {
//   fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)',
//   padding: '4px 8px', borderRadius: '999px', color: '#cfcfe8'
// };

// const badgeWarning = {
//   fontSize: '0.7rem', background: 'rgba(245,158,11,0.1)',
//   color: '#fbbf24', padding: '4px 8px', borderRadius: '999px', fontWeight: 500
// };

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function CollegeDashboard() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [managerModal, setManagerModal] = useState(null); // { clubId, clubName }
  const [managerEmail, setManagerEmail] = useState('');
  const [managerLoading, setManagerLoading] = useState(false);

  useEffect(() => {
    api.get('/clubs/mine')
      .then(res => setClubs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const refreshClubs = async () => {
    const res = await api.get('/clubs/mine');
    setClubs(res.data);
  };

  const changeManager = async () => {
    if (!managerEmail.trim()) return;
    setManagerLoading(true);
    try {
      await api.put(`/clubs/${managerModal.clubId}/manager`, { manager_email: managerEmail });
      await refreshClubs();
      setManagerModal(null);
      setManagerEmail('');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update manager');
    } finally {
      setManagerLoading(false);
    }
  };

  const deleteClub = async (clubId, clubName) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${clubName}"?\n\nThis will permanently delete the club, all its applications, and events. This cannot be undone.`
    );
    if (!confirmed) return;
    setDeleting(clubId);
    try {
      await api.delete(`/clubs/${clubId}`);
      setClubs(prev => prev.filter(c => c.id !== clubId));
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete club');
    } finally {
      setDeleting(null);
    }
  };

  const totalApplications = clubs.reduce((s, c) => s + parseInt(c.total_applications || 0), 0);
  const totalPending = clubs.reduce((s, c) => s + parseInt(c.pending_count || 0), 0);
  const totalApproved = clubs.reduce((s, c) => s + parseInt(c.approved_count || 0), 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }

        .cd-root {
          background: #07050f;
          min-height: 100vh;
          color: #e8e6ff;
          font-family: 'Outfit', system-ui, sans-serif;
          padding: 32px 20px 60px;
        }

        .cd-wrap {
          max-width: 1240px;
          margin: 0 auto;
        }

        /* ── Page header ── */
        .cd-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }

        .cd-title {
          font-size: clamp(1.6rem, 5vw, 2.2rem);
          font-weight: 800;
          letter-spacing: -0.6px;
          margin: 0 0 4px;
          background: linear-gradient(135deg, #e8e6ff 30%, #9d8fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cd-subtitle {
          color: #6a6888;
          font-size: 0.95rem;
          margin: 0;
        }

        .cd-create-btn {
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
          box-shadow: 0 4px 20px rgba(124, 111, 255, 0.38);
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .cd-create-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(124, 111, 255, 0.5);
        }

        /* ── Stats row ── */
        .cd-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 36px;
        }

        .cd-stat {
          padding: 22px 20px;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s;
        }

        .cd-stat:hover { border-color: rgba(124,111,255,0.3); }

        .cd-stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--stat-accent, rgba(255,255,255,0.08));
          border-radius: 2px 2px 0 0;
        }

        .cd-stat-label {
          font-size: 0.78rem;
          color: #6a6888;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-family: 'DM Mono', monospace;
          margin-bottom: 10px;
        }

        .cd-stat-value {
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 800;
          line-height: 1;
          color: var(--stat-color, #e8e6ff);
        }

        /* ── Section header ── */
        .cd-section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          gap: 12px;
        }

        .cd-section-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #a8a6c8;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: 'DM Mono', monospace;
          margin: 0;
        }

        .cd-count-chip {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: #7C6FFF;
          background: rgba(124,111,255,0.12);
          border: 1px solid rgba(124,111,255,0.2);
          padding: 3px 10px;
          border-radius: 999px;
        }

        /* ── Club grid ── */
        .cd-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 18px;
        }

        /* ── Club card ── */
        .cd-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }

        .cd-card:hover {
          border-color: rgba(124,111,255,0.25);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }

        .cd-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }

        .cd-card-name {
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.3;
          color: #e8e6ff;
          margin: 0;
          flex: 1;
        }

        .cd-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          justify-content: flex-end;
          flex-shrink: 0;
        }

        .cd-badge {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .cd-badge-gray {
          background: rgba(255,255,255,0.06);
          color: #b0aed0;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .cd-badge-warn {
          background: rgba(245,158,11,0.12);
          color: #fbbf24;
          border: 1px solid rgba(245,158,11,0.2);
        }

        .cd-card-desc {
          color: #6a6888;
          font-size: 0.88rem;
          line-height: 1.55;
          margin: 0;
          /* Clamp to 2 lines */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        .cd-card-footer {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cd-manager-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .cd-manager-info {
          font-size: 0.8rem;
          color: #6a6888;
          min-width: 0;
        }

        .cd-manager-name {
          color: #c8c6e8;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 160px;
          display: inline-block;
          vertical-align: bottom;
        }

        /* ── Card action buttons ── */
        .cd-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .cd-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 12px;
          border-radius: 10px;
          font-family: 'Outfit', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .cd-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .cd-btn-manager {
          background: rgba(124,111,255,0.12);
          color: #a78bfa;
          border: 1px solid rgba(124,111,255,0.2);
        }

        .cd-btn-manager:hover:not(:disabled) {
          background: rgba(124,111,255,0.22);
          border-color: rgba(124,111,255,0.4);
        }

        .cd-btn-delete {
          background: rgba(239,68,68,0.08);
          color: #f87171;
          border: 1px solid rgba(239,68,68,0.18);
        }

        .cd-btn-delete:hover:not(:disabled) {
          background: rgba(239,68,68,0.16);
          border-color: rgba(239,68,68,0.35);
        }

        /* ── Empty & loading states ── */
        .cd-empty {
          text-align: center;
          padding: 80px 20px;
          color: #4e4c6a;
          font-size: 1rem;
        }

        .cd-empty-card {
          text-align: center;
          padding: 60px 24px;
          border-radius: 20px;
          border: 1px dashed rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
        }

        .cd-empty-card p { color: #6a6888; margin: 0 0 14px; font-size: 1rem; }

        .cd-empty-link {
          color: #7C6FFF;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        .cd-empty-link:hover { color: #a78bfa; }

        /* ── Modal overlay ── */
        .cd-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(7, 5, 15, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }
                                                           
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }

        .cd-modal {
          background: #12101e;
          border: 1px solid rgba(124,111,255,0.25);
          border-radius: 20px;
          padding: 32px;
          width: 100%;
          max-width: 420px;
          animation: slideUp 0.25s ease;
          box-shadow: 0 24px 60px rgba(0,0,0,0.6);
        }

        .cd-modal h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 6px;
          color: #e8e6ff;
        }

        .cd-modal p {
          font-size: 0.88rem;
          color: #6a6888;
          margin: 0 0 22px;
        }

        .cd-modal-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #e8e6ff;
          font-family: 'Outfit', system-ui, sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
          margin-bottom: 18px;
        }

        .cd-modal-input:focus {
          border-color: rgba(124,111,255,0.5);
        }

        .cd-modal-input::placeholder { color: #4e4c6a; }

        .cd-modal-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .cd-modal-cancel {
          padding: 11px;
          border-radius: 11px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          color: #9997bb;
          font-family: 'Outfit', system-ui, sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cd-modal-cancel:hover { background: rgba(255,255,255,0.1); color: #e8e6ff; }

        .cd-modal-confirm {
          padding: 11px;
          border-radius: 11px;
          background: linear-gradient(135deg, #7C6FFF, #9D77FF);
          border: none;
          color: #fff;
          font-family: 'Outfit', system-ui, sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(124,111,255,0.3);
        }
        .cd-modal-confirm:hover:not(:disabled) {
          box-shadow: 0 6px 22px rgba(124,111,255,0.5);
          transform: translateY(-1px);
        }
        .cd-modal-confirm:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .cd-stats { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .cd-root { padding: 20px 14px 48px; }
          .cd-stats { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .cd-stat { padding: 16px 14px; }
          .cd-grid { grid-template-columns: 1fr; }
          .cd-header { align-items: flex-start; flex-direction: column; }
          .cd-create-btn { width: 100%; justify-content: center; }
          .cd-modal { padding: 24px 20px; }
        }

        @media (max-width: 380px) {
          .cd-stats { grid-template-columns: 1fr 1fr; }
          .cd-actions { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="cd-root">
        <div className="cd-wrap">

          {/* ── Header ── */}
          <div className="cd-header">
            <div>
              <h1 className="cd-title">College Dashboard</h1>
              <p className="cd-subtitle">Manage your clubs, members &amp; events</p>
            </div>
            <Link to="/college/create-club" className="cd-create-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Create Club
            </Link>
          </div>

          {/* ── Stats ── */}
          <div className="cd-stats">
            {[
              { label: 'Total Clubs', value: clubs.length, color: '#e8e6ff', accent: 'rgba(124,111,255,0.5)' },
              { label: 'Applications', value: totalApplications, color: '#e8e6ff', accent: 'rgba(99,202,241,0.5)' },
              { label: 'Pending', value: totalPending, color: '#fbbf24', accent: 'rgba(245,158,11,0.5)' },
              { label: 'Approved', value: totalApproved, color: '#34d399', accent: 'rgba(52,211,153,0.5)' },
            ].map(stat => (
              <div
                key={stat.label}
                className="cd-stat"
                style={{ '--stat-color': stat.color, '--stat-accent': stat.accent }}
              >
                <p className="cd-stat-label">{stat.label}</p>
                <p className="cd-stat-value">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* ── Clubs ── */}
          <div className="cd-section-head">
            <h2 className="cd-section-title">Your Clubs</h2>
            {clubs.length > 0 && (
              <span className="cd-count-chip">{clubs.length} total</span>
            )}
          </div>

          {loading ? (
            <div className="cd-empty">Loading clubs…</div>
          ) : clubs.length === 0 ? (
            <div className="cd-empty-card">
              <p>No clubs created yet</p>
              <Link to="/college/create-club" className="cd-empty-link">
                Create your first club →
              </Link>
            </div>
          ) : (
            <div className="cd-grid">
              {clubs.map(club => (
                <div key={club.id} className="cd-card">
                  <div className="cd-card-top">
                    <h3 className="cd-card-name">{club.name}</h3>
                    <div className="cd-badges">
                      <span className="cd-badge cd-badge-gray">{club.total_applications || 0} applied</span>
                      {parseInt(club.pending_count) > 0 && (
                        <span className="cd-badge cd-badge-warn">{club.pending_count} pending</span>
                      )}
                    </div>
                  </div>

                  {club.description && (
                    <p className="cd-card-desc">{club.description}</p>
                  )}

                  <div className="cd-card-footer">
                    <div className="cd-manager-row">
                      <span className="cd-manager-info">
                        Manager:{' '}
                        <span className="cd-manager-name" title={club.manager_name}>
                          {club.manager_name || 'Not assigned'}
                        </span>
                      </span>
                    </div>

                    <div className="cd-actions">
                      <button
                        className="cd-btn cd-btn-manager"
                        onClick={() => { setManagerModal({ clubId: club.id, clubName: club.name }); setManagerEmail(''); }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                        </svg>
                        Change Manager
                      </button>

                      <button
                        className="cd-btn cd-btn-delete"
                        onClick={() => deleteClub(club.id, club.name)}
                        disabled={deleting === club.id}
                      >
                        {deleting === club.id ? (
                          <>Removing…</>
                        ) : (
                          <>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14H6L5 6"/>
                              <path d="M10 11v6M14 11v6"/>
                              <path d="M9 6V4h6v2"/>
                            </svg>
                            Remove Club
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Change Manager Modal ── */}
      {managerModal && (
        <div className="cd-modal-overlay" onClick={(e) => e.target === e.currentTarget && setManagerModal(null)}>
          <div className="cd-modal">
            <h3>Change Manager</h3>
            <p>Assign a new manager to <strong style={{ color: '#c8c6e8' }}>{managerModal.clubName}</strong></p>
            <input
              className="cd-modal-input"
              type="email"
              placeholder="manager@college.edu"
              value={managerEmail}
              onChange={e => setManagerEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && changeManager()}
              autoFocus
            />
            <div className="cd-modal-actions">
              <button className="cd-modal-cancel" onClick={() => setManagerModal(null)}>
                Cancel
              </button>
              <button
                className="cd-modal-confirm"
                onClick={changeManager}
                disabled={managerLoading || !managerEmail.trim()}
              >
                {managerLoading ? 'Saving…' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}