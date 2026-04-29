import { useEffect, useState } from 'react';
import api from '../../api/axios';
import ApplyModal from '../../components/Applymodal';

export default function BrowseClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClub, setSelectedClub] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/clubs')
      .then(res => setClubs(res.data))
      .catch(() => setError('Failed to load clubs'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = clubs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.description || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={page}>

      <div style={container}>

        <div style={header}>
          <h1 style={title}>Browse Clubs</h1>
          <p style={subtitle}>Find a club and apply with your CV</p>
        </div>

        {error && <div style={errorBox}>{error}</div>}

        {/* SEARCH */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search clubs..."
          style={input}
        />

        {loading ? (
          <div style={empty}>Loading clubs...</div>
        ) : filtered.length === 0 ? (
          <div style={empty}>No clubs found</div>
        ) : (
          <div style={grid}>
            {filtered.map(club => (
              <div key={club.id} style={card}>

                <h3 style={cardTitle}>{club.name}</h3>
                <p style={college}>{club.college_name}</p>

                <p style={desc}>{club.description}</p>

                {club.requirements && (
                  <div style={reqBox}>
                    <p style={reqTitle}>What they look for</p>
                    <p style={reqText}>{club.requirements}</p>
                  </div>
                )}

                <button
                  onClick={() => setSelectedClub(club)}
                  style={primaryBtn}
                >
                  Apply Now
                </button>

              </div>
            ))}
          </div>
        )}
      </div>

      {selectedClub && (
        <ApplyModal club={selectedClub} onClose={() => setSelectedClub(null)} />
      )}
    </div>
  );
}

/* styles */
const page = { background: '#0a0a0f', minHeight: '100vh', color: '#e8e8f0', padding: '2rem' };
const container = { maxWidth: '1100px', margin: '0 auto' };
const header = { marginBottom: '1.5rem' };
const title = { fontSize: '2rem', fontWeight: 700 };
const subtitle = { color: '#7a7a96' };

const input = {
  padding: '12px',
  width: '100%',
  maxWidth: '400px',
  marginBottom: '1.5rem',
  borderRadius: '10px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff'
};

const grid = { display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' };

const card = {
  padding: '1.5rem',
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)'
};

const cardTitle = { fontWeight: 600, fontSize: '1.1rem' };
const college = { fontSize: '0.8rem', color: '#6366f1', marginBottom: '8px' };
const desc = { color: '#7a7a96', fontSize: '0.9rem', marginBottom: '10px' };

const reqBox = { background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px', marginBottom: '10px' };
const reqTitle = { fontSize: '0.75rem', color: '#a5a5c2' };
const reqText = { fontSize: '0.8rem', color: '#7a7a96' };

const primaryBtn = {
  marginTop: '10px',
  width: '100%',
  padding: '10px',
  borderRadius: '10px',
  background: '#6366f1',
  color: '#fff',
  border: 'none',
  cursor: 'pointer'
};

const empty = { textAlign: 'center', padding: '3rem', color: '#7a7a96' };
const errorBox = { color: '#f87171', marginBottom: '10px' };