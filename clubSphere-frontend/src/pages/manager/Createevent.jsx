import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axios';

export default function CreateEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [clubs, setClubs] = useState([]);
  const [form, setForm] = useState({
    clubId: location.state?.clubId || '',
    title: '',
    description: '',
    venue: '',
    event_date: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/manager/clubs')
      .then(res => {
        setClubs(res.data);
        if (!form.clubId && res.data.length > 0) {
          setForm(f => ({ ...f, clubId: res.data[0].id }));
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    if (!form.clubId) {
      return setError('Please select a club');
    }
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/events', form);
      navigate('/manager/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#0a0a0f',
      minHeight: '100vh',
      color: '#e8e8f0',
      padding: '2rem'
    }}>

      {/* GLOW BACKGROUND */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)'
        }} />
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
            Create Event
          </h1>
          <p style={{ color: '#7a7a96', marginTop: '4px' }}>
            Club members will be notified automatically
          </p>
        </div>

        {/* CARD */}
        <div style={{
          padding: '2rem',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 40px rgba(99,102,241,0.1)'
        }}>

          {/* ERROR */}
          {error && (
            <div style={{
              marginBottom: '1rem',
              padding: '10px',
              borderRadius: '10px',
              background: 'rgba(255,0,0,0.08)',
              border: '1px solid rgba(255,0,0,0.2)',
              color: '#ff6b6b',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* CLUB */}
            <div style={field}>
              <label style={label}>Club *</label>
              <select
                required
                value={form.clubId}
                onChange={e => setForm({ ...form, clubId: e.target.value })}
                style={input}
              >
                <option value="">Select a club</option>
                {clubs.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* TITLE */}
            <div style={field}>
              <label style={label}>Event Title *</label>
              <input
                required
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Annual Hackathon 2025"
                style={input}
              />
            </div>

            {/* DESCRIPTION */}
            <div style={field}>
              <label style={label}>Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="What will happen at this event?"
                style={textarea}
              />
            </div>

            {/* VENUE */}
            <div style={field}>
              <label style={label}>Venue *</label>
              <input
                required
                value={form.venue}
                onChange={e => setForm({ ...form, venue: e.target.value })}
                placeholder="e.g. Auditorium"
                style={input}
              />
            </div>

            {/* DATE */}
            <div style={field}>
              <label style={label}>Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={form.event_date}
                onChange={e => setForm({ ...form, event_date: e.target.value })}
                style={input}
              />
            </div>

            {/* BUTTONS */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>

              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#cfcfe8',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  background: '#6366f1',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 0 30px rgba(99,102,241,0.4)',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Creating...' : 'Create Event'}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

/* STYLES */

const field = {
  marginBottom: '1.2rem'
};

const label = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '0.9rem',
  color: '#a5a5c2'
};

const input = {
  width: '100%',
  padding: '12px',
  borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: '#fff',
  outline: 'none'
};

const textarea = {
  ...input,
  resize: 'none'
};