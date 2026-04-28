
import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function StudentEvents() {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(null);
  const [tab, setTab] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.get('/events'), api.get('/events/mine')])
      .then(([all, mine]) => {
        setEvents(all.data);
        setMyEvents(mine.data.map(e => e.id));
      })
      .catch(() => setError('Failed to load events'))
      .finally(() => setLoading(false));
  }, []);

  const register = async (eventId) => {
    if (registering) return;
    setRegistering(eventId);
    try {
      await api.post('/events/register', { eventId });
      setMyEvents(prev => [...prev, eventId]);
    } finally {
      setRegistering(null);
    }
  };

  const displayEvents =
    tab === 'mine'
      ? events.filter(e => myEvents.includes(e.id))
      : events;

  return (
    <div style={page}>
      <div style={container}>

        <h1 style={title}>Events</h1>
        <p style={subtitle}>Explore and register</p>

        {/* tabs */}
        <div style={tabs}>
          {['all', 'mine'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={tabBtn(tab === t)}>
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={empty}>Loading...</div>
        ) : displayEvents.length === 0 ? (
          <div style={empty}>No events</div>
        ) : (
          <div style={grid}>
            {displayEvents.map(e => {
              const registered = myEvents.includes(e.id);
              const date = new Date(e.event_date);

              return (
                <div key={e.id} style={card}>
                  <h3>{e.title}</h3>
                  <p style={{ color: '#6366f1' }}>{e.club_name}</p>
                  <p style={{ color: '#7a7a96' }}>{e.description}</p>

                  <div style={{ fontSize: '0.8rem', color: '#7a7a96' }}>
                    📅 {date.toLocaleDateString()}
                  </div>

                  {!registered && (
                    <button onClick={() => register(e.id)} style={primaryBtn}>
                      Register
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* styles */
const page = { background: '#0a0a0f', minHeight: '100vh', color: '#e8e8f0', padding: '2rem' };
const container = { maxWidth: '900px', margin: '0 auto' };
const title = { fontSize: '2rem', fontWeight: 700 };
const subtitle = { color: '#7a7a96' };

const grid = { display: 'grid', gap: '1rem' };
const card = {
  padding: '1rem',
  borderRadius: '14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)'
};

const primaryBtn = {
  marginTop: '10px',
  padding: '8px',
  borderRadius: '8px',
  background: '#6366f1',
  color: '#fff',
  border: 'none'
};

const tabs = { display: 'flex', gap: '10px', margin: '1rem 0' };
const tabBtn = (active) => ({
  padding: '6px 12px',
  borderRadius: '8px',
  background: active ? '#6366f1' : 'rgba(255,255,255,0.05)',
  color: active ? '#fff' : '#aaa',
  border: 'none'
});

const empty = { textAlign: 'center', padding: '3rem', color: '#7a7a96' };