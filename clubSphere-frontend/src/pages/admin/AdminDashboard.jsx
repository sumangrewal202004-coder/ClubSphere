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

  // fetch colleges
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

  // delete college
  const deleteCollege = async (id) => {
    if (!confirm('Are you sure you want to delete this college? This action cannot be undone.')) return;

    try {
      await api.delete(`/admin/colleges/${id}`);
      setColleges(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete college');
    }
  };

  const fetchCollegeDocuments = async (collegeId) => {
    if (documents[collegeId] || docsLoading[collegeId]) {
      return;
    }

    try {
      setDocsLoading(prev => ({ ...prev, [collegeId]: true }));
      const res = await api.get(`/admin/colleges/${collegeId}/documents`);
      setDocuments(prev => ({ ...prev, [collegeId]: res.data }));
    } catch (err) {
      console.error(err);
      setDocsError(prev => ({ ...prev, [collegeId]: 'Failed to load documents.' }));
    } finally {
      setDocsLoading(prev => ({ ...prev, [collegeId]: false }));
    }
  };

  const toggleDocuments = (collegeId) => {
    setDocsOpen(prev => ({ ...prev, [collegeId]: !prev[collegeId] }));
    if (!documents[collegeId]) {
      fetchCollegeDocuments(collegeId);
    }
  };

  // approve or reject college
  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/colleges/${id}/status`, { status });
      setColleges(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to update status');
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        .cs-admin-root * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Sora', system-ui, sans-serif; }

        @keyframes cs-fadeUp   { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cs-fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes cs-orbA     { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(18px,-16px) scale(1.06);} }
        @keyframes cs-orbB     { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-14px,12px) scale(1.04);} }
        @keyframes cs-pulse    { 0%,100%{opacity:.5;transform:scale(1);} 50%{opacity:.9;transform:scale(1.1);} }

        .cs-admin-root {
          min-height: 100vh;
          background: #0d0b1a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          position: relative;
          overflow: hidden;
        }

        .cs-orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(72px);
          z-index: 0;
        }
        .cs-orb-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(83,74,183,0.45) 0%, transparent 70%);
          top: -140px; left: -140px;
          animation: cs-orbA 10s ease-in-out infinite;
        }
        .cs-orb-2 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(15,110,86,0.35) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation: cs-orbB 12s ease-in-out infinite;
        }

        .cs-grid-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(127,119,221,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127,119,221,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .cs-admin-card {
          position: relative; z-index: 1;
          background: rgba(20,17,40,0.8);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(127,119,221,0.18);
          border-radius: 22px;
          padding: 40px;
          box-shadow:
            0 0 0 1px rgba(127,119,221,0.06),
            0 8px 32px rgba(0,0,0,0.5),
            0 32px 64px rgba(0,0,0,0.35);
          width: 100%;
          max-width: 1000px;
          animation: cs-fadeUp 0.6s cubic-bezier(.22,1,.36,1) both;
        }

        .cs-admin-title {
          font-size: 28px; font-weight: 700; color: #eceaff;
          text-align: center; margin-bottom: 32px;
          letter-spacing: -0.6px;
        }

        .cs-college-item {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(127,119,221,0.1);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.2s;
        }
        .cs-college-item:hover {
          background: rgba(255,255,255,0.08);
        }

        .cs-college-info h3 {
          font-size: 18px; font-weight: 600; color: #eceaff; margin-bottom: 4px;
        }
        .cs-college-info p {
          font-size: 14px; color: #9191a8; margin-bottom: 2px;
        }

        .cs-college-meta {
          margin-top: 12px;
          display: grid;
          gap: 8px;
          color: #c7c3e1;
          font-size: 13px;
          line-height: 1.5;
        }
        .cs-college-meta span {
          display: inline-block;
        }
        .cs-college-meta strong {
          color: #eceaff;
        }

        .cs-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .cs-status-approved { background: rgba(34,197,94,0.2); color: #22c55e; }
        .cs-status-rejected { background: rgba(239,68,68,0.2); color: #ef4444; }
        .cs-status-pending { background: rgba(251,191,36,0.2); color: #fbbf24; }

        .cs-btn {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }
        .cs-btn-approve { background: #22c55e; color: white; }
        .cs-btn-approve:hover { background: #16a34a; }
        .cs-btn-reject { background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }
        .cs-btn-reject:hover { background: rgba(239,68,68,0.2); }
        .cs-btn-delete { background: rgba(107,114,128,0.1); color: #9ca3af; border: 1px solid rgba(107,114,128,0.3); }
        .cs-btn-delete:hover { background: rgba(107,114,128,0.2); }

        .cs-loading, .cs-error {
          text-align: center;
          color: #9191a8;
          font-size: 16px;
          padding: 40px;
        }
        .cs-error { color: #ef4444; }
      `}</style>

      <div className="cs-admin-root">
        <div className="cs-grid-bg" />
        <div className="cs-orb cs-orb-1" />
        <div className="cs-orb cs-orb-2" />

        <div className="cs-admin-card">
          <h1 className="cs-admin-title">College Management</h1>

          {/* Error */}
          {error && (
            <div className="cs-error">{error}</div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="cs-loading">Loading colleges...</div>
          ) : colleges.length === 0 ? (
            <div className="cs-loading">No colleges found.</div>
          ) : (
            <div>
              {colleges.map(c => (
                <div key={c.id}>
                  <div className="cs-college-item">
                    {/* Left */}
                    <div className="cs-college-info">
                      <h3>{c.name}</h3>
                      <p>{c.email}</p>
                      <p>{c.domain}</p>

                      <div className="cs-college-meta">
                        <span><strong>Official Email:</strong> {c.email}</span>
                        <span><strong>College email domain:</strong> @{c.domain?.replace(/^@+/, '')}</span>
                        <span><strong>Phone:</strong> {c.phone}</span>
                        {c.website && <span><strong>Website:</strong> {c.website}</span>}
                        {c.address && <span><strong>Address:</strong> {c.address}</span>}
                        {c.college_type && <span><strong>Type:</strong> {c.college_type}</span>}
                        {c.year_established && <span><strong>Established:</strong> {c.year_established}</span>}
                        {c.reg_number && <span><strong>Reg. No.:</strong> {c.reg_number}</span>}
                        {c.accreditation && <span><strong>Accreditation:</strong> {c.accreditation}</span>}
                        {c.university_affiliation && <span><strong>Affiliation:</strong> {c.university_affiliation}</span>}
                      </div>
                    </div>

                    {/* Right */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {/* Status Badge */}
                      <span className={`cs-status cs-status-${c.status}`}>
                        {c.status}
                      </span>

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {c.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(c.id, 'approved')}
                              className="cs-btn cs-btn-approve"
                            >
                              Approve
                            </button>

                            <button
                              onClick={() => updateStatus(c.id, 'rejected')}
                              className="cs-btn cs-btn-reject"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {c.status === 'approved' && (
                          <button
                            onClick={() => updateStatus(c.id, 'rejected')}
                            className="cs-btn cs-btn-reject"
                          >
                            Reject
                          </button>
                        )}

                        {c.status === 'rejected' && (
                          <button
                            onClick={() => updateStatus(c.id, 'approved')}
                            className="cs-btn cs-btn-approve"
                          >
                            Approve
                          </button>
                        )}

                        <button
                          onClick={() => toggleDocuments(c.id)}
                          className="cs-btn cs-btn-delete"
                          style={{ background: 'rgba(99,102,241,0.12)', color: '#d8def8', border: '1px solid rgba(99,102,241,0.18)' }}
                        >
                          {docsOpen[c.id] ? 'Hide Documents' : 'View Documents'}
                        </button>

                        <button
                          onClick={() => deleteCollege(c.id)}
                          className="cs-btn cs-btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  {docsOpen[c.id] && (
                    <div style={{ marginBottom: 16, padding: '20px 24px', border: '1px solid rgba(127,119,221,0.12)', borderRadius: 16, background: 'rgba(255,255,255,0.03)' }}>
                      <p style={{ fontSize: 14, color: '#c7c3e1', marginBottom: 12, fontWeight: 600 }}>Uploaded Documents</p>
                      {docsLoading[c.id] ? (
                        <p style={{ color: '#9ca3af' }}>Loading documents...</p>
                      ) : docsError[c.id] ? (
                        <p style={{ color: '#f87171' }}>{docsError[c.id]}</p>
                      ) : documents[c.id] && documents[c.id].length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
                          {documents[c.id].map((doc, index) => (
                            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <a href={doc.url} target="_blank" rel="noreferrer" style={{ color: '#7F77DD', textDecoration: 'underline', fontSize: 14 }}>
                                {doc.file_name}
                              </a>
                              <span style={{ color: '#a8a4c8', fontSize: 13 }}></span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ color: '#9ca3af' }}>No documents uploaded or available.</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

