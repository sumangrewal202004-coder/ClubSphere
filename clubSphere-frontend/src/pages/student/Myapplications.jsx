
import { useEffect, useState } from 'react';
import api from '../../api/axios';

function StatusBadge({ status }) {
  const styles = {
    pending: badgeWarning,
    approved: badgeSuccess,
    rejected: badgeGray,
  };
  return <span style={styles[status]}>{status}</span>;
}

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/applications/mine')
      .then(res => setApplications(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={page}>
      <div style={container}>

        <h1 style={title}>My Applications</h1>
        <p style={subtitle}>Track your club application status</p>

        {loading ? (
          <div style={empty}>Loading...</div>
        ) : applications.length === 0 ? (
          <div style={empty}>No applications yet</div>
        ) : (
          applications.map(app => (
            <div key={app.id} style={card}>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3>{app.club_name}</h3>
                  <p style={{ color: '#7a7a96', fontSize: '0.8rem' }}>
                    Applied {new Date(app.applied_at).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={app.status} />
              </div>

              {app.status === 'pending' && (
                <div style={infoBlue}>Under review</div>
              )}
              {app.status === 'approved' && (
                <div style={infoGreen}>🎉 Selected!</div>
              )}
              {app.status === 'rejected' && (
                <div style={infoGray}>Not selected</div>
              )}

            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* styles */
const page = { background: '#0a0a0f', minHeight: '100vh', color: '#e8e8f0', padding: '2rem' };
const container = { maxWidth: '700px', margin: '0 auto' };
const title = { fontSize: '2rem', fontWeight: 700 };
const subtitle = { color: '#7a7a96', marginBottom: '1rem' };

const card = {
  padding: '1.2rem',
  borderRadius: '14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  marginBottom: '1rem'
};

const badgeSuccess = { color: '#34d399' };
const badgeWarning = { color: '#fbbf24' };
const badgeGray = { color: '#9ca3af' };

const infoBlue = { marginTop: '10px', color: '#60a5fa' };
const infoGreen = { marginTop: '10px', color: '#34d399' };
const infoGray = { marginTop: '10px', color: '#9ca3af' };

const empty = { textAlign: 'center', padding: '3rem', color: '#7a7a96' };