// // import { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import api from '../../api/axios';

// // export default function CollegeDashboard() {
// //   const [clubs, setClubs] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     api.get('/clubs/mine')
// //       .then(res => setClubs(res.data))
// //       .catch(console.error)
// //       .finally(() => setLoading(false));
// //   }, []);

// //   return (
// //     <div className="max-w-6xl mx-auto px-4 py-8">
// //       {/* Header */}
// //       <div className="flex items-center justify-between mb-8">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">College Dashboard</h1>
// //           <p className="text-gray-500 text-sm mt-1">Manage all your clubs</p>
// //         </div>
// //         <Link
// //           to="/college/create-club"
// //           className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
// //         >
// //           + Create Club
// //         </Link>
// //       </div>

// //       {/* Stats */}
// //       <div className="grid grid-cols-3 gap-4 mb-8">
// //         <div className="bg-white rounded-xl border border-gray-100 p-5">
// //           <p className="text-sm text-gray-500">Total Clubs</p>
// //           <p className="text-3xl font-bold text-gray-900 mt-1">{clubs.length}</p>
// //         </div>
// //         <div className="bg-white rounded-xl border border-gray-100 p-5">
// //           <p className="text-sm text-gray-500">Total Applications</p>
// //           <p className="text-3xl font-bold text-gray-900 mt-1">
// //             {clubs.reduce((s, c) => s + parseInt(c.total_applications || 0), 0)}
// //           </p>
// //         </div>
// //         <div className="bg-white rounded-xl border border-gray-100 p-5">
// //           <p className="text-sm text-gray-500">Pending Reviews</p>
// //           <p className="text-3xl font-bold text-indigo-600 mt-1">
// //             {clubs.reduce((s, c) => s + parseInt(c.pending_count || 0), 0)}
// //           </p>
// //         </div>
// //       </div>

// //       {/* Clubs list */}
// //       {loading ? (
// //         <div className="text-center py-16 text-gray-400">Loading clubs...</div>
// //       ) : clubs.length === 0 ? (
// //         <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
// //           <p className="text-gray-400 mb-3">No clubs yet</p>
// //           <Link to="/college/create-club" className="text-indigo-600 text-sm font-medium hover:underline">
// //             Create your first club →
// //           </Link>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           {clubs.map(club => (
// //             <div key={club.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-sm transition">
// //               <div className="flex items-start justify-between mb-3">
// //                 <h3 className="font-semibold text-gray-900 text-lg">{club.name}</h3>
// //                 <div className="flex gap-2">
// //                   <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
// //                     {club.total_applications} applied
// //                   </span>
// //                   {parseInt(club.pending_count) > 0 && (
// //                     <span className="text-xs bg-amber-50 text-amber-600 px-2 py-1 rounded-full font-medium">
// //                       {club.pending_count} pending
// //                     </span>
// //                   )}
// //                 </div>
// //               </div>
// //               <p className="text-sm text-gray-500 mb-3 line-clamp-2">{club.description}</p>
// //               <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
// //                 <span>Manager: <span className="text-gray-600 font-medium">{club.manager_name || 'Not assigned'}</span></span>
// //                 <span>{club.manager_email}</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../../api/axios';

// export default function CollegeDashboard() {
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get('/clubs/mine')
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

//       {/* CONTAINER */}
//       <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

//         {/* HEADER */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '2rem'
//         }}>
//           <div>
//             <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
//               College Dashboard
//             </h1>
//             <p style={{ color: '#7a7a96', marginTop: '4px' }}>
//               Manage all your clubs
//             </p>
//           </div>

//           <Link
//             to="/college/create-club"
//             style={{
//               padding: '10px 18px',
//               borderRadius: '12px',
//               background: '#6366f1',
//               color: '#fff',
//               textDecoration: 'none',
//               fontWeight: 600,
//               boxShadow: '0 0 30px rgba(99,102,241,0.4)',
//               transition: 'all 0.2s'
//             }}
//           >
//             + Create Club
//           </Link>
//         </div>

//         {/* STATS */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//           gap: '1rem',
//           marginBottom: '2rem'
//         }}>


         

//         </div>

//         {/* LIST */}
//         {loading ? (
//           <div style={emptyStyle}>Loading clubs...</div>
//         ) : clubs.length === 0 ? (
//           <div style={emptyCardStyle}>
//             <p style={{ color: '#7a7a96', marginBottom: '10px' }}>No clubs yet</p>
//             <Link
//               to="/college/create-club"
//               style={{ color: '#6366f1', textDecoration: 'none' }}
//             >
//               Create your first club →
//             </Link>
//           </div>
//         ) : (
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
//             gap: '1rem'
//           }}>
//             {clubs.map(club => (
//               <div key={club.id} style={clubCardStyle}>

//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   marginBottom: '10px'
//                 }}>
//                   <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
//                     {club.name}
//                   </h3>

//                   <div style={{ display: 'flex', gap: '6px' }}>
//                     <span style={badgeGray}>
//                       {club.total_applications} applied
//                     </span>

//                     {parseInt(club.pending_count) > 0 && (
//                       <span style={badgeWarning}>
//                         {club.pending_count} pending
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <p style={{
//                   color: '#7a7a96',
//                   fontSize: '0.9rem',
//                   marginBottom: '10px'
//                 }}>
//                   {club.description}
//                 </p>

//                 <div style={{
//                   borderTop: '1px solid rgba(255,255,255,0.06)',
//                   paddingTop: '10px',
//                   fontSize: '0.8rem',
//                   color: '#6b6b85',
//                   display: 'flex',
//                   justifyContent: 'space-between'
//                 }}>
//                   <span>
//                     Manager: <span style={{ color: '#e8e8f0' }}>
//                       {club.manager_name || 'Not assigned'}
//                     </span>
//                   </span>
//                   <span>{club.manager_email}</span>
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
//   padding: '1.5rem',
//   borderRadius: '16px',
//   background: 'rgba(255,255,255,0.04)',
//   border: '1px solid rgba(255,255,255,0.08)',
//   backdropFilter: 'blur(10px)',
// };

// const labelStyle = {
//   color: '#7a7a96',
//   fontSize: '0.9rem'
// };

// const valueStyle = {
//   fontSize: '2rem',
//   fontWeight: 700,
//   marginTop: '5px'
// };

// const emptyStyle = {
//   textAlign: 'center',
//   padding: '4rem',
//   color: '#7a7a96'
// };

// const emptyCardStyle = {
//   textAlign: 'center',
//   padding: '3rem',
//   borderRadius: '20px',
//   border: '1px dashed rgba(255,255,255,0.1)',
//   background: 'rgba(255,255,255,0.03)'
// };

// const clubCardStyle = {
//   padding: '1.5rem',
//   borderRadius: '16px',
//   background: 'rgba(255,255,255,0.04)',
//   border: '1px solid rgba(255,255,255,0.08)',
//   transition: '0.2s',
//   cursor: 'pointer'
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

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function CollegeDashboard() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    api.get('/clubs/mine')
      .then(res => setClubs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#e8e8f0', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>College Dashboard</h1>
            <p style={{ color: '#7a7a96', marginTop: '4px' }}>Manage all your clubs</p>
          </div>
          <Link
            to="/college/create-club"
            style={{
              padding: '10px 18px', borderRadius: '12px', background: '#6366f1',
              color: '#fff', textDecoration: 'none', fontWeight: 600,
              boxShadow: '0 0 30px rgba(99,102,241,0.4)', transition: 'all 0.2s'
            }}
          >
            + Create Club
          </Link>
        </div>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Clubs', value: clubs.length, color: '#e8e8f0' },
            { label: 'Total Applications', value: totalApplications, color: '#e8e8f0' },
            { label: 'Pending Reviews', value: totalPending, color: '#6366f1' },
          ].map(stat => (
            <div key={stat.label} style={cardStyle}>
              <p style={{ color: '#7a7a96', fontSize: '0.85rem' }}>{stat.label}</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: '5px', color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* CLUBS LIST */}
        {loading ? (
          <div style={emptyStyle}>Loading clubs...</div>
        ) : clubs.length === 0 ? (
          <div style={emptyCardStyle}>
            <p style={{ color: '#7a7a96', marginBottom: '10px' }}>No clubs yet</p>
            <Link to="/college/create-club" style={{ color: '#6366f1', textDecoration: 'none' }}>
              Create your first club →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {clubs.map(club => (
              <div key={club.id} style={clubCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, flex: 1, marginRight: '10px' }}>{club.name}</h3>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <span style={badgeGray}>{club.total_applications} applied</span>
                    {parseInt(club.pending_count) > 0 && (
                      <span style={badgeWarning}>{club.pending_count} pending</span>
                    )}
                  </div>
                </div>

                <p style={{ color: '#7a7a96', fontSize: '0.9rem', marginBottom: '14px' }}>
                  {club.description}
                </p>

                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#6b6b85' }}>
                    Manager: <span style={{ color: '#e8e8f0' }}>{club.manager_name || 'Not assigned'}</span>
                  </div>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteClub(club.id, club.name)}
                    disabled={deleting === club.id}
                    style={{
                      background: 'rgba(239,68,68,0.1)',
                      color: '#f87171',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: '8px',
                      padding: '5px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: deleting === club.id ? 'not-allowed' : 'pointer',
                      opacity: deleting === club.id ? 0.5 : 1,
                      transition: 'all 0.2s'
                    }}
                  >
                    {deleting === club.id ? 'Removing...' : '🗑 Remove Club'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* STYLES */
const cardStyle = {
  padding: '1.5rem', borderRadius: '16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(10px)',
};

const emptyStyle = { textAlign: 'center', padding: '4rem', color: '#7a7a96' };

const emptyCardStyle = {
  textAlign: 'center', padding: '3rem', borderRadius: '20px',
  border: '1px dashed rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.03)'
};

const clubCardStyle = {
  padding: '1.5rem', borderRadius: '16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  transition: '0.2s',
};

const badgeGray = {
  fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)',
  padding: '4px 8px', borderRadius: '999px', color: '#cfcfe8'
};

const badgeWarning = {
  fontSize: '0.7rem', background: 'rgba(245,158,11,0.1)',
  color: '#fbbf24', padding: '4px 8px', borderRadius: '999px', fontWeight: 500
};