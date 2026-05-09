import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Notifications() {
  const [data, setData] = useState({ notifications: [], unread_count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
  let mounted = true;

  const fetch = () =>
    api.get('/notifications')
      .then(res => { if (mounted) setData(res.data); })
      .catch(() => setError('Failed to load notifications'))
      .finally(() => setLoading(false));

  fetch(); // initial load

  const interval = setInterval(fetch, 30000); // ✅ poll every 30s

  return () => {
    mounted = false;
    clearInterval(interval); // ✅ cleanup
  };
}, []);
  const markAllRead = async () => {
    if (updating) return;

    setUpdating(true);

    try {
      await api.patch('/notifications/read-all');

      setData(prev => ({
        ...prev,
        unread_count: 0,
        notifications: prev.notifications.map(n => ({
          ...n,
          is_read: true
        }))
      }));

    } catch {
      alert('Failed to mark all as read');
    } finally {
      setUpdating(false);
    }
  };

  const markRead = async (id) => {
    if (updating) return;

    setUpdating(true);

    try {
      await api.patch(`/notifications/${id}/read`);

      setData(prev => ({
        ...prev,
        unread_count: Math.max(0, prev.unread_count - 1),
        notifications: prev.notifications.map(n =>
          n.id === id ? { ...n, is_read: true } : n
        )
      }));

    } catch {
      alert('Failed to update notification');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={page}>

      <div style={container}>

        {/* HEADER */}
        <div style={header}>
          <div>
            <h1 style={title}>Notifications</h1>

            {data.unread_count > 0 && (
              <p style={unread}>
                {data.unread_count} unread
              </p>
            )}
          </div>

          {data.unread_count > 0 && (
            <button
              onClick={markAllRead}
              disabled={updating}
              style={markAllBtn}
            >
              Mark all read
            </button>
          )}
        </div>

        {/* ERROR */}
        {error && <div style={errorBox}>{error}</div>}

        {/* LOADING */}
        {loading ? (
          <div style={empty}>Loading...</div>
        ) : data.notifications.length === 0 ? (
          <div style={emptyCard}>No notifications yet</div>
        ) : (
          <div style={list}>

            {data.notifications.map(n => (
              <div
                key={n.id}
                onClick={() => !n.is_read && markRead(n.id)}
                style={{
                  ...card,
                  background: n.is_read
                    ? 'rgba(255,255,255,0.03)'
                    : 'rgba(99,102,241,0.12)',
                  border: n.is_read
                    ? '1px solid rgba(255,255,255,0.06)'
                    : '1px solid rgba(99,102,241,0.3)'
                }}
              >

                <div style={row}>

                  {/* DOT */}
                  <div style={{
                    ...dot,
                    background: n.is_read ? '#555' : '#6366f1'
                  }} />

                  {/* CONTENT */}
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '0.95rem',
                      fontWeight: n.is_read ? 400 : 600,
                      color: n.is_read ? '#9ca3af' : '#fff'
                    }}>
                      {n.message}
                    </p>

                    <p style={time}>
                      {new Date(n.created_at).toLocaleString()}
                    </p>
                  </div>

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

const page = {
  background: '#0a0a0f',
  minHeight: '100vh',
  color: '#e8e8f0',
  padding: '2rem'
};

const container = {
  maxWidth: '700px',
  margin: '0 auto'
};

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem'
};

const title = {
  fontSize: '2rem',
  fontWeight: 700
};

const unread = {
  fontSize: '0.85rem',
  color: '#6366f1'
};

const markAllBtn = {
  fontSize: '0.85rem',
  color: '#6366f1',
  background: 'none',
  border: 'none',
  cursor: 'pointer'
};

const list = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const card = {
  padding: '14px',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: '0.2s'
};

const row = {
  display: 'flex',
  gap: '10px',
  alignItems: 'flex-start'
};

const dot = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  marginTop: '6px'
};

const time = {
  fontSize: '0.75rem',
  color: '#6b7280',
  marginTop: '4px'
};

const empty = {
  textAlign: 'center',
  padding: '3rem',
  color: '#7a7a96'
};

const emptyCard = {
  textAlign: 'center',
  padding: '3rem',
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px dashed rgba(255,255,255,0.08)'
};

const errorBox = {
  color: '#f87171',
  marginBottom: '10px'
};