import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ScoreBadge({ score }) {
  if (score === null || score === undefined) {
    return <span style={badgeGray}>Evaluating...</span>;
  }

  const style =
    score >= 70 ? badgeSuccess :
    score >= 40 ? badgeWarning :
    badgeDanger;

  return (
    <span style={{ ...style, fontWeight: 700 }}>
      {score}/100
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: badgeWarning,
    approved: badgeSuccess,
    rejected: badgeDanger,
  };

  return (
    <span style={{ ...styles[status], fontSize: '0.7rem' }}>
      {status}
    </span>
  );
}

export default function ApplicationsReview() {
  const { clubId } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    api.get(`/manager/${clubId}/applications`)
      .then(res => { if (mounted) setApplications(res.data); })
      .catch(() => setError('Failed to load applications'))
      .finally(() => setLoading(false));

    return () => (mounted = false);
  }, [clubId]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await api.patch(`/manager/applications/${id}/status`, { status });
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update');
    } finally {
      setUpdating(null);
    }
  };

  const viewResume = (cvPath) => {
    if (!cvPath) return alert('No resume uploaded');
    const url = `${BASE_URL}/${cvPath}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{
      background: '#0a0a0f',
      minHeight: '100vh',
      color: '#e8e8f0',
      padding: '2rem'
    }}>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button onClick={() => navigate(-1)} style={backBtn}>
            ← Back
          </button>

          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
              Applications
            </h1>
            <p style={{ color: '#7a7a96', fontSize: '0.9rem' }}>
              Sorted by AI score · Resume available for review
            </p>
          </div>

          <span style={{
            marginLeft: 'auto',
            color: '#6b6b85',
            fontSize: '0.9rem'
          }}>
            {applications.length} total
          </span>
        </div>

        {/* STATES */}
        {loading && <div style={empty}>Loading...</div>}
        {error && <div style={errorBox}>{error}</div>}
        {!loading && applications.length === 0 && (
          <div style={empty}>No applications yet</div>
        )}

        {/* LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {applications.map((app, index) => (
            <div key={app.id} style={card}>

              {/* TOP */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  
                  <div style={rankBadge}>
                    #{index + 1}
                  </div>

                  <div>
                    <h3 style={{ fontWeight: 600 }}>{app.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#7a7a96' }}>
                      {app.email}
                    </p>
                    <div style={{ marginTop: '4px' }}>
                      <StatusBadge status={app.status} />
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <ScoreBadge score={app.ai_score} />

                  <button
                    onClick={() => viewResume(app.cv_path)}
                    style={resumeBtn}
                  >
                    📄 Review Resume
                  </button>
                </div>
              </div>

              {/* AI FEEDBACK */}
              {app.ai_feedback && (
                <div style={feedbackBox}>
                  <p style={feedbackTitle}>🤖 AI Feedback</p>
                  {app.ai_feedback}
                </div>
              )}

              {!app.ai_score && !app.ai_feedback && (
                <div style={pendingBox}>
                  AI evaluation pending...
                </div>
              )}

              {/* ACTIONS */}
              {app.status === 'pending' && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                  <button
                    onClick={() => updateStatus(app.id, 'approved')}
                    disabled={updating === app.id}
                    style={approveBtn}
                  >
                    ✓ Approve
                  </button>

                  <button
                    onClick={() => updateStatus(app.id, 'rejected')}
                    disabled={updating === app.id}
                    style={rejectBtn}
                  >
                    ✗ Reject
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* STYLES */

const card = {
  padding: '1.5rem',
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(10px)'
};

const rankBadge = {
  width: '34px',
  height: '34px',
  borderRadius: '50%',
  background: 'rgba(99,102,241,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.85rem',
  fontWeight: 600
};

const badgeGray = {
  fontSize: '0.7rem',
  background: 'rgba(255,255,255,0.06)',
  padding: '4px 8px',
  borderRadius: '999px',
  color: '#cfcfe8'
};

const badgeSuccess = {
  background: 'rgba(16,185,129,0.15)',
  color: '#34d399',
  padding: '4px 10px',
  borderRadius: '999px'
};

const badgeWarning = {
  background: 'rgba(245,158,11,0.15)',
  color: '#fbbf24',
  padding: '4px 10px',
  borderRadius: '999px'
};

const badgeDanger = {
  background: 'rgba(239,68,68,0.15)',
  color: '#f87171',
  padding: '4px 10px',
  borderRadius: '999px'
};

const resumeBtn = {
  marginTop: '6px',
  fontSize: '0.75rem',
  padding: '6px 10px',
  borderRadius: '8px',
  background: 'rgba(99,102,241,0.1)',
  color: '#6366f1',
  border: 'none',
  cursor: 'pointer'
};

const feedbackBox = {
  marginTop: '1rem',
  padding: '12px',
  borderRadius: '10px',
  background: 'rgba(99,102,241,0.08)',
  fontSize: '0.85rem'
};

const feedbackTitle = {
  fontSize: '0.75rem',
  color: '#6366f1',
  marginBottom: '4px',
  fontWeight: 600
};

const pendingBox = {
  marginTop: '1rem',
  padding: '10px',
  borderRadius: '10px',
  background: 'rgba(255,255,255,0.05)',
  color: '#7a7a96',
  fontSize: '0.85rem'
};

const approveBtn = {
  padding: '10px 14px',
  borderRadius: '10px',
  background: '#22c55e',
  color: '#fff',
  border: 'none',
  cursor: 'pointer'
};

const rejectBtn = {
  padding: '10px 14px',
  borderRadius: '10px',
  background: 'rgba(239,68,68,0.15)',
  color: '#f87171',
  border: 'none',
  cursor: 'pointer'
};

const backBtn = {
  background: 'none',
  border: 'none',
  color: '#7a7a96',
  cursor: 'pointer'
};

const empty = {
  textAlign: 'center',
  padding: '3rem',
  color: '#7a7a96'
};

const errorBox = {
  background: 'rgba(239,68,68,0.1)',
  padding: '10px',
  borderRadius: '10px',
  marginBottom: '1rem',
  color: '#f87171'
};