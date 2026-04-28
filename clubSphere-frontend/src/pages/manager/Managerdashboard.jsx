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

  return (
    <div style={{
      background: '#0a0a0f',
      minHeight: '100vh',
      color: '#e8e8f0',
      padding: '2rem'
    }}>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
              Manager Dashboard
            </h1>
            <p style={{ color: '#7a7a96', marginTop: '4px' }}>
              Review applications and manage events
            </p>
          </div>

          <Link
            to="/manager/events/create"
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              background: '#6366f1',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              boxShadow: '0 0 30px rgba(99,102,241,0.4)'
            }}
          >
            + Create Event
          </Link>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div style={emptyStyle}>Loading your clubs...</div>
        ) : clubs.length === 0 ? (
          <div style={emptyCard}>
            <p style={{ color: '#7a7a96' }}>No clubs assigned to you yet.</p>
            <p style={{ fontSize: '0.85rem', color: '#6b6b85', marginTop: '4px' }}>
              Ask your college admin to assign you a club.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {clubs.map(club => (
              <div key={club.id} style={card}>

                {/* TOP */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                      {club.name}
                    </h3>
                    <p style={{
                      color: '#7a7a96',
                      fontSize: '0.9rem',
                      marginTop: '4px'
                    }}>
                      {club.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={badgeGray}>
                      {club.total_applications} total
                    </span>

                    {parseInt(club.pending_count) > 0 && (
                      <span style={badgeWarning}>
                        {club.pending_count} pending
                      </span>
                    )}

                    {parseInt(club.approved_count) > 0 && (
                      <span style={badgeSuccess}>
                        {club.approved_count} approved
                      </span>
                    )}
                  </div>
                </div>

                {/* ACTIONS */}
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '1rem'
                }}>
                  <Link
                    to={`/manager/clubs/${club.id}/applications`}
                    style={primaryBtn}
                  >
                    View Applications
                  </Link>

                  <Link
                    to="/manager/events/create"
                    state={{ clubId: club.id, clubName: club.name }}
                    style={secondaryBtn}
                  >
                    Post Event
                  </Link>
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

const card = {
  padding: '1.5rem',
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(10px)',
  transition: '0.2s'
};

const emptyStyle = {
  textAlign: 'center',
  padding: '4rem',
  color: '#7a7a96'
};

const emptyCard = {
  textAlign: 'center',
  padding: '3rem',
  borderRadius: '20px',
  border: '1px dashed rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.03)'
};

const badgeGray = {
  fontSize: '0.7rem',
  background: 'rgba(255,255,255,0.06)',
  padding: '4px 8px',
  borderRadius: '999px',
  color: '#cfcfe8'
};

const badgeWarning = {
  fontSize: '0.7rem',
  background: 'rgba(245,158,11,0.1)',
  color: '#fbbf24',
  padding: '4px 8px',
  borderRadius: '999px',
  fontWeight: 500
};

const badgeSuccess = {
  fontSize: '0.7rem',
  background: 'rgba(16,185,129,0.1)',
  color: '#34d399',
  padding: '4px 8px',
  borderRadius: '999px'
};

const primaryBtn = {
  padding: '10px 16px',
  borderRadius: '10px',
  background: '#6366f1',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 500,
  boxShadow: '0 0 20px rgba(99,102,241,0.3)'
};

const secondaryBtn = {
  padding: '10px 16px',
  borderRadius: '10px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#cfcfe8',
  textDecoration: 'none'
};