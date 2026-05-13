import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export default function ClubRegistrations() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState({}); // ✅ track which events are expanded

  useEffect(() => {
    api.get(`/events/club/${clubId}`)
      .then(async res => {
        const eventsWithRegs = await Promise.all(
          res.data.map(async event => {
            try {
              const regs = await api.get(`/events/${event.id}/registrations`);
              return { ...event, registrations: regs.data };
            } catch {
              return { ...event, registrations: [] };
            }
          })
        );
        setEvents(eventsWithRegs);
      })
      .catch(() => setError('Failed to load registrations'))
      .finally(() => setLoading(false));
  }, [clubId]);

  const toggleExpand = (eventId) => {
    setExpanded(prev => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  return (
    <div style={page}>
      <div style={container}>

        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
          <button onClick={() => navigate(-1)} style={backBtn}>← Back</button>
          <div>
            <h1 style={title}>Event Registrations</h1>
            <p style={subtitle}>Students registered for your events</p>
          </div>
        </div>

        {error && <div style={errorBox}>{error}</div>}

        {loading ? (
          <div style={empty}>Loading...</div>
        ) : events.length === 0 ? (
          <div style={emptyCard}>No events found for this club</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {events.map(event => {
              const count = event.registrations.length;
              const isOpen = expanded[event.id];

              return (
                <div key={event.id} style={card}>

                  {/* EVENT INFO */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>
                      {event.title}
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: '#7a7a96' }}>
                      📅 {new Date(event.event_date).toLocaleDateString()}{' '}
                      {new Date(event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {event.venue && <span> &nbsp;📍 {event.venue}</span>}
                    </div>
                  </div>

                  {/* REGISTRATION COUNT + TOGGLE */}
                  {count === 0 ? (
                    <div style={noRegs}>No registrations yet</div>
                  ) : (
                    <>
                      {/* ✅ summary row */}
                      <div style={summaryRow}>
                        <div style={regCount}>
                          👥 {count} student{count !== 1 ? 's' : ''} registered
                        </div>
                        <button
                          onClick={() => toggleExpand(event.id)}
                          style={toggleBtn}
                        >
                          {isOpen ? 'Hide Students ▲' : 'View Students ▼'}
                        </button>
                      </div>

                      {/* ✅ collapsible table */}
                      {isOpen && (
                        <div style={{ marginTop: '1rem' }}>
                          <table style={table}>
                            <thead>
                              <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                                <th style={th}>#</th>
                                <th style={th}>Name</th>
                                <th style={th}>Email</th>
                                <th style={th}>Registered At</th>
                              </tr>
                            </thead>
                            <tbody>
                              {event.registrations.map((r, i) => (
                                <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                  <td style={{ ...td, color: '#4a4a6a' }}>{i + 1}</td>
                                  <td style={td}>{r.name}</td>
                                  <td style={{ ...td, color: '#7a7a96' }}>{r.email}</td>
                                  <td style={{ ...td, color: '#7a7a96' }}>{new Date(r.registered_at).toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </>
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

/* STYLES */
const page = { background: '#0a0a0f', minHeight: '100vh', color: '#e8e8f0', padding: '2rem' };
const container = { maxWidth: '900px', margin: '0 auto' };
const title = { fontSize: '1.8rem', fontWeight: 700, margin: 0 };
const subtitle = { color: '#7a7a96', fontSize: '0.9rem', margin: 0 };
const empty = { textAlign: 'center', padding: '3rem', color: '#7a7a96' };
const emptyCard = { textAlign: 'center', padding: '3rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.08)', color: '#7a7a96' };
const errorBox = { color: '#f87171', marginBottom: '1rem' };
const card = { padding: '1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' };
const noRegs = { color: '#4a4a6a', fontSize: '0.85rem', fontStyle: 'italic' };
const summaryRow = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' };
const regCount = { fontSize: '0.9rem', color: '#6366f1', fontWeight: 600 };
const toggleBtn = {
  padding: '6px 14px',
  borderRadius: '8px',
  background: 'rgba(99,102,241,0.1)',
  border: '1px solid rgba(99,102,241,0.25)',
  color: '#818cf8',
  fontSize: '0.82rem',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
};
const backBtn = { padding: '8px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#cfcfe8', cursor: 'pointer' };
const table = { width: '100%', borderCollapse: 'collapse' };
const th = { textAlign: 'left', padding: '8px 12px', fontSize: '0.78rem', color: '#6a6888', textTransform: 'uppercase', letterSpacing: '0.5px' };
const td = { padding: '10px 12px', fontSize: '0.88rem', color: '#c8c6e8' };