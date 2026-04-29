// import { useEffect, useState } from 'react';
// import api from '../../api/axios';

// export default function AdminDashboard() {
//   const [colleges, setColleges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [documents, setDocuments] = useState({});
//   const [docsLoading, setDocsLoading] = useState({});
//   const [docsError, setDocsError] = useState({});
//   const [docsOpen, setDocsOpen] = useState({});

//   const fetchColleges = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/admin/colleges');
//       setColleges(res.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch colleges');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchColleges();
//   }, []);

//   const deleteCollege = async (id) => {
//     if (!confirm('Are you sure you want to delete this college?')) return;
//     try {
//       await api.delete(`/admin/colleges/${id}`);
//       setColleges(prev => prev.filter(c => c.id !== id));
//     } catch (err) {
//       alert('Failed to delete college');
//     }
//   };

//   const fetchCollegeDocuments = async (collegeId) => {
//     if (documents[collegeId] || docsLoading[collegeId]) return;

//     try {
//       setDocsLoading(prev => ({ ...prev, [collegeId]: true }));
//       const res = await api.get(`/admin/colleges/${collegeId}/documents`);
//       setDocuments(prev => ({ ...prev, [collegeId]: res.data }));
//     } catch (err) {
//       setDocsError(prev => ({ ...prev, [collegeId]: 'Failed to load documents' }));
//     } finally {
//       setDocsLoading(prev => ({ ...prev, [collegeId]: false }));
//     }
//   };

//   const toggleDocuments = (collegeId) => {
//     setDocsOpen(prev => ({ ...prev, [collegeId]: !prev[collegeId] }));
//     if (!documents[collegeId]) fetchCollegeDocuments(collegeId);
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await api.patch(`/admin/colleges/${id}/status`, { status });
//       setColleges(prev => prev.map(c => c.id === id ? { ...c, status } : c));
//     } catch (err) {
//       alert(err.response?.data?.error || 'Failed to update status');
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

//         .admin-root {
//           min-height: 100vh;
//           background: #0a0814;
//           color: #e0dfff;
//           font-family: 'Sora', system-ui, sans-serif;
//           padding: 20px 16px;
//         }

//         .admin-container {
//           max-width: 1100px;
//           margin: 0 auto;
//         }

//         .admin-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 32px;
//           flex-wrap: wrap;
//           gap: 16px;
//         }

//         .admin-title {
//           font-size: clamp(26px, 5vw, 32px);
//           font-weight: 700;
//           letter-spacing: -0.8px;
//         }

//         .college-card {
//           background: #12101f;
//           border: 1px solid #2a2740;
//           border-radius: 20px;
//           padding: 28px;
//           margin-bottom: 24px;
//           transition: all 0.3s ease;
//         }

//         .college-card:hover {
//           border-color: #6366f1;
//           transform: translateY(-4px);
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
//         }

//         .college-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           flex-wrap: wrap;
//           gap: 16px;
//           margin-bottom: 20px;
//         }

//         .college-info h3 {
//           font-size: 22px;
//           font-weight: 600;
//           margin-bottom: 6px;
//         }

//         .college-info p {
//           color: #a0a0c0;
//           margin-bottom: 4px;
//           font-size: 15px;
//         }

//         .status-badge {
//           padding: 8px 20px;
//           border-radius: 9999px;
//           font-size: 13px;
//           font-weight: 600;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .status-approved {
//           background: rgba(34, 197, 94, 0.15);
//           color: #22c55e;
//           border: 1px solid rgba(34, 197, 94, 0.3);
//         }

//         .college-meta {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//           gap: 12px 24px;
//           margin-top: 20px;
//           font-size: 14.5px;
//         }

//         .meta-item strong {
//           color: #c4c1e0;
//           margin-right: 6px;
//         }

//         .action-buttons {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 10px;
//           margin-top: 24px;
//         }

//         .btn {
//           padding: 10px 20px;
//           border-radius: 12px;
//           font-weight: 600;
//           font-size: 14.5px;
//           cursor: pointer;
//           transition: all 0.2s;
//           border: none;
//         }

//         .btn-approve { background: #22c55e; color: white; }
//         .btn-approve:hover { background: #16a34a; }

//         .btn-reject { 
//           background: #ef4444; 
//           color: white; 
//         }
//         .btn-reject:hover { background: #dc2626; }

//         .btn-secondary {
//           background: #1f1b33;
//           color: #c4c1e0;
//           border: 1px solid #44415f;
//         }
//         .btn-secondary:hover {
//           background: #2a2740;
//           border-color: #6366f1;
//         }

//         .documents-panel {
//           margin-top: 20px;
//           background: #1a1729;
//           border: 1px solid #2a2740;
//           border-radius: 16px;
//           padding: 24px;
//         }

//         .loading, .error {
//           text-align: center;
//           padding: 80px 20px;
//           color: #8888aa;
//         }

//         @media (max-width: 640px) {
//           .college-card {
//             padding: 20px;
//           }
//           .college-header {
//             flex-direction: column;
//             align-items: stretch;
//           }
//           .action-buttons {
//             justify-content: stretch;
//           }
//           .btn {
//             flex: 1;
//             text-align: center;
//           }
//         }
//       `}</style>

//       <div className="admin-root">
//         <div className="admin-container">
//           <div className="admin-header">
//             <h1 className="admin-title">College Management</h1>
//             <div style={{ color: '#8888aa', fontSize: '15px' }}>
//               Super Admin
//             </div>
//           </div>

//           {error && <div className="error">{error}</div>}

//           {loading ? (
//             <div className="loading">Loading colleges...</div>
//           ) : colleges.length === 0 ? (
//             <div className="loading">No colleges registered yet.</div>
//           ) : (
//             colleges.map((college) => (
//               <div key={college.id} className="college-card">
//                 <div className="college-header">
//                   <div className="college-info">
//                     <h3>{college.name}</h3>
//                     <p>{college.email}</p>
//                     <p>@{college.domain?.replace(/^@+/, '')}</p>
//                   </div>

//                   <div style={{ textAlign: 'right' }}>
//                     <span className={`status-badge status-approved`}>
//                       {college.status.toUpperCase()}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="college-meta">
//                   <div className="meta-item"><strong>Official Email:</strong> {college.email}</div>
//                   <div className="meta-item"><strong>Domain:</strong> @{college.domain?.replace(/^@+/, '')}</div>
//                   {college.phone && <div className="meta-item"><strong>Phone:</strong> {college.phone}</div>}
//                   {college.website && <div className="meta-item"><strong>Website:</strong> {college.website}</div>}
//                   {college.address && <div className="meta-item"><strong>Address:</strong> {college.address}</div>}
//                   {college.college_type && <div className="meta-item"><strong>Type:</strong> {college.college_type}</div>}
//                   {college.year_established && <div className="meta-item"><strong>Established:</strong> {college.year_established}</div>}
//                   {college.reg_number && <div className="meta-item"><strong>Reg. No.:</strong> {college.reg_number}</div>}
//                   {college.accreditation && <div className="meta-item"><strong>Accreditation:</strong> {college.accreditation}</div>}
//                 </div>

//                 <div className="action-buttons">
//                   {college.status === 'pending' && (
//                     <>
//                       <button onClick={() => updateStatus(college.id, 'approved')} className="btn btn-approve">
//                         Approve
//                       </button>
//                       <button onClick={() => updateStatus(college.id, 'rejected')} className="btn btn-reject">
//                         Reject
//                       </button>
//                     </>
//                   )}

//                   {college.status === 'approved' && (
//                     <button onClick={() => updateStatus(college.id, 'rejected')} className="btn btn-reject">
//                       Reject
//                     </button>
//                   )}

//                   {college.status === 'rejected' && (
//                     <button onClick={() => updateStatus(college.id, 'approved')} className="btn btn-approve">
//                       Approve
//                     </button>
//                   )}

//                   <button 
//                     onClick={() => toggleDocuments(college.id)}
//                     className="btn btn-secondary"
//                   >
//                     {docsOpen[college.id] ? 'Hide Documents' : 'View Documents'}
//                   </button>

//                   <button 
//                     onClick={() => deleteCollege(college.id)}
//                     className="btn btn-secondary"
//                     style={{ background: '#2a1f2f', color: '#f87171', borderColor: '#450a0a' }}
//                   >
//                     Delete
//                   </button>
//                 </div>

//                 {/* Documents Section */}
//                 {docsOpen[college.id] && (
//                   <div className="documents-panel">
//                     <h4 style={{ marginBottom: '16px', color: '#c4c1e0' }}>Uploaded Documents</h4>
                    
//                     {docsLoading[college.id] ? (
//                       <p>Loading documents...</p>
//                     ) : docsError[college.id] ? (
//                       <p style={{ color: '#f87171' }}>{docsError[college.id]}</p>
//                     ) : documents[college.id]?.length > 0 ? (
//                       <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                         {documents[college.id].map((doc, i) => (
//                           <a
//                             key={i}
//                             href={doc.url}
//                             target="_blank"
//                             rel="noreferrer"
//                             style={{
//                               color: '#818cf8',
//                               textDecoration: 'none',
//                               padding: '10px 14px',
//                               background: '#1f1b33',
//                               borderRadius: '10px',
//                               display: 'block'
//                             }}
//                           >
//                             {doc.file_name}
//                           </a>
//                         ))}
//                       </div>
//                     ) : (
//                       <p style={{ color: '#8888aa' }}>No documents uploaded.</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function AdminDashboard() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [documents, setDocuments] = useState({});
  const [docsLoading, setDocsLoading] = useState({});
  const [docsError, setDocsError] = useState({});
  const [docsOpen, setDocsOpen] = useState({});

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/colleges');
      setColleges(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch colleges');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const deleteCollege = async (id) => {
    if (!confirm('Are you sure you want to delete this college?')) return;
    try {
      await api.delete(`/admin/colleges/${id}`);
      setColleges(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert('Failed to delete college');
    }
  };

  const fetchCollegeDocuments = async (collegeId) => {
    if (documents[collegeId] || docsLoading[collegeId]) return;

    try {
      setDocsLoading(prev => ({ ...prev, [collegeId]: true }));
      const res = await api.get(`/admin/colleges/${collegeId}/documents`);
      setDocuments(prev => ({ ...prev, [collegeId]: res.data }));
    } catch (err) {
      setDocsError(prev => ({ ...prev, [collegeId]: 'Failed to load documents' }));
    } finally {
      setDocsLoading(prev => ({ ...prev, [collegeId]: false }));
    }
  };

  const toggleDocuments = (collegeId) => {
    setDocsOpen(prev => ({ ...prev, [collegeId]: !prev[collegeId] }));
    if (!documents[collegeId]) fetchCollegeDocuments(collegeId);
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/colleges/${id}/status`, { status });
      setColleges(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update status');
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        .admin-root {
          min-height: 100vh;
          background: #0a0814;
          color: #e0dfff;
          font-family: 'Sora', system-ui, sans-serif;
          padding: 20px 16px;
        }

        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .admin-title {
          font-size: clamp(26px, 6vw, 36px);
          font-weight: 700;
          letter-spacing: -0.9px;
        }

        .college-card {
          background: #12101f;
          border: 1px solid #2a2740;
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 28px;
          transition: all 0.3s ease;
        }

        .college-card:hover {
          border-color: #6366f1;
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
        }

        .college-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }

        .college-info h3 {
          font-size: clamp(20px, 4.5vw, 24px);
          font-weight: 600;
          margin: 0 0 8px 0;
        }

        .college-info p {
          color: #a0a0c0;
          margin: 4px 0;
          font-size: 15px;
        }

        .status-badge {
          padding: 8px 18px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          white-space: nowrap;
        }

        .status-approved {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.35);
        }

        .college-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px 28px;
          margin: 24px 0;
          font-size: 15px;
        }

        .meta-item strong {
          color: #c4c1e0;
          display: inline-block;
          width: 110px;
          font-weight: 500;
        }

        .action-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
        }

        .btn {
          padding: 12px 22px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14.5px;
          cursor: pointer;
          transition: all 0.25s ease;
          border: none;
          flex: 1;
          min-width: 140px;
        }

        .btn-approve { 
          background: #22c55e; 
          color: white; 
        }
        .btn-approve:hover { background: #16a34a; }

        .btn-reject { 
          background: #ef4444; 
          color: white; 
        }
        .btn-reject:hover { background: #dc2626; }

        .btn-secondary {
          background: #1f1b33;
          color: #c4c1e0;
          border: 1px solid #44415f;
        }
        .btn-secondary:hover {
          background: #2a2740;
          border-color: #6366f1;
        }

        .documents-panel {
          margin-top: 24px;
          background: #1a1729;
          border: 1px solid #2a2740;
          border-radius: 16px;
          padding: 24px;
        }

        .document-link {
          display: block;
          padding: 14px 16px;
          background: #1f1b33;
          color: #818cf8;
          text-decoration: none;
          border-radius: 10px;
          margin-bottom: 10px;
          transition: all 0.2s;
        }

        .document-link:hover {
          background: #27233f;
          color: #a5b4fc;
        }

        .loading, .error {
          text-align: center;
          padding: 100px 20px;
          color: #8888aa;
          font-size: 1.1rem;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .admin-root {
            padding: 16px 12px;
          }
          
          .college-card {
            padding: 22px;
          }

          .college-header {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .status-badge {
            align-self: flex-start;
          }

          .college-meta {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .meta-item strong {
            width: auto;
            display: block;
            margin-bottom: 2px;
          }

          .action-buttons {
            flex-direction: column;
          }

          .btn {
            flex: none;
            width: 100%;
            min-width: unset;
          }
        }

        @media (max-width: 480px) {
          .college-card {
            padding: 20px 18px;
          }
          
          .admin-title {
            font-size: 28px;
          }
        }
      `}</style>

      <div className="admin-root">
        <div className="admin-container">
          <div className="admin-header">
            <h1 className="admin-title">College Management</h1>
            <div style={{ 
              color: '#8888aa', 
              fontSize: '15px',
              background: 'rgba(99, 102, 241, 0.1)',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
              Super Admin
            </div>
          </div>

          {error && <div className="error">{error}</div>}

          {loading ? (
            <div className="loading">Loading colleges...</div>
          ) : colleges.length === 0 ? (
            <div className="loading">No colleges registered yet.</div>
          ) : (
            colleges.map((college) => (
              <div key={college.id} className="college-card">
                <div className="college-header">
                  <div className="college-info">
                    <h3>{college.name}</h3>
                    <p>{college.email}</p>
                    <p>@{college.domain?.replace(/^@+/, '') || 'N/A'}</p>
                  </div>

                  <span className={`status-badge status-approved`}>
                    {college.status?.toUpperCase() || 'PENDING'}
                  </span>
                </div>

                <div className="college-meta">
                  <div className="meta-item">
                    <strong>Official Email:</strong> {college.email}
                  </div>
                  <div className="meta-item">
                    <strong>Domain:</strong> @{college.domain?.replace(/^@+/, '') || 'N/A'}
                  </div>
                  {college.phone && (
                    <div className="meta-item">
                      <strong>Phone:</strong> {college.phone}
                    </div>
                  )}
                  {college.website && (
                    <div className="meta-item">
                      <strong>Website:</strong> {college.website}
                    </div>
                  )}
                  {college.address && (
                    <div className="meta-item">
                      <strong>Address:</strong> {college.address}
                    </div>
                  )}
                  {college.college_type && (
                    <div className="meta-item">
                      <strong>Type:</strong> {college.college_type}
                    </div>
                  )}
                  {college.year_established && (
                    <div className="meta-item">
                      <strong>Established:</strong> {college.year_established}
                    </div>
                  )}
                  {college.reg_number && (
                    <div className="meta-item">
                      <strong>Reg. No.:</strong> {college.reg_number}
                    </div>
                  )}
                </div>

                <div className="action-buttons">
                  {college.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => updateStatus(college.id, 'approved')} 
                        className="btn btn-approve"
                      >
                        Approve College
                      </button>
                      <button 
                        onClick={() => updateStatus(college.id, 'rejected')} 
                        className="btn btn-reject"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {college.status === 'approved' && (
                    <button 
                      onClick={() => updateStatus(college.id, 'rejected')} 
                      className="btn btn-reject"
                    >
                      Reject College
                    </button>
                  )}

                  {college.status === 'rejected' && (
                    <button 
                      onClick={() => updateStatus(college.id, 'approved')} 
                      className="btn btn-approve"
                    >
                      Approve College
                    </button>
                  )}

                  <button 
                    onClick={() => toggleDocuments(college.id)}
                    className="btn btn-secondary"
                  >
                    {docsOpen[college.id] ? 'Hide Documents' : 'View Documents'}
                  </button>

                  <button 
                    onClick={() => deleteCollege(college.id)}
                    className="btn btn-secondary"
                    style={{ 
                      background: '#2a1f2f', 
                      color: '#f87171', 
                      borderColor: '#450a0a' 
                    }}
                  >
                    Delete College
                  </button>
                </div>

                {/* Documents Panel */}
                {docsOpen[college.id] && (
                  <div className="documents-panel">
                    <h4 style={{ margin: '0 0 18px 0', color: '#c4c1e0', fontSize: '18px' }}>
                      Uploaded Documents
                    </h4>
                    
                    {docsLoading[college.id] ? (
                      <p style={{ color: '#8888aa' }}>Loading documents...</p>
                    ) : docsError[college.id] ? (
                      <p style={{ color: '#f87171' }}>{docsError[college.id]}</p>
                    ) : documents[college.id]?.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {documents[college.id].map((doc, i) => (
                          <a
                            key={i}
                            href={doc.url}
                            target="_blank"
                            rel="noreferrer"
                            className="document-link"
                          >
                            📄 {doc.file_name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p style={{ color: '#8888aa', fontStyle: 'italic' }}>
                        No documents uploaded by this college.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}