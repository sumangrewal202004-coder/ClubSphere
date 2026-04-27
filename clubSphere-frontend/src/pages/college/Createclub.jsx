// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/axios';

// export default function CreateClub() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: '', description: '', requirements: '', manager_email: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       await api.post('/clubs', form);
//       navigate('/college/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to create club');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-8">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Create a Club</h1>
//         <p className="text-gray-500 text-sm mt-1">Set up a new club and assign a manager</p>
//       </div>

//       <div className="bg-white rounded-2xl border border-gray-100 p-8">
//         {error && (
//           <div className="mb-5 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">{error}</div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Club Name *</label>
//             <input
//               required
//               value={form.name}
//               onChange={e => setForm({ ...form, name: e.target.value })}
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="e.g. Coding Club, Debate Society"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
//             <textarea
//               required
//               rows={3}
//               value={form.description}
//               onChange={e => setForm({ ...form, description: e.target.value })}
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
//               placeholder="What is this club about?"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               AI Screening Requirements *
//             </label>
//             <textarea
//               required
//               rows={4}
//               value={form.requirements}
//               onChange={e => setForm({ ...form, requirements: e.target.value })}
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
//               placeholder="Describe what skills, experience or qualities you look for. The AI will use this to score applicant CVs. e.g. 'Looking for students with programming experience in Python or JavaScript, problem solving skills, and any open source contributions.'"
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               Be specific — the AI uses this to evaluate CVs and generate scores.
//             </p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Club Manager Email
//               <span className="text-gray-400 font-normal ml-1">(optional)</span>
//             </label>
//             <input
//               type="email"
//               value={form.manager_email}
//               onChange={e => setForm({ ...form, manager_email: e.target.value })}
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="manager@college.edu"
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               Must be a registered club_manager account. Leave blank to assign later.
//             </p>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button
//               type="button"
//               onClick={() => navigate('/college/dashboard')}
//               className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60"
//             >
//               {loading ? 'Creating...' : 'Create Club'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export default function CreateClub() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', description: '', requirements: '', manager_email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/clubs', form);
      navigate('/college/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create club');
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

      {/* GLOW BG */}
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
            Create a Club
          </h1>
          <p style={{ color: '#7a7a96', marginTop: '4px' }}>
            Set up a new club and assign a manager
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

            {/* NAME */}
            <div style={field}>
              <label style={label}>Club Name *</label>
              <input
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Coding Club"
                style={input}
              />
            </div>

            {/* DESC */}
            <div style={field}>
              <label style={label}>Description *</label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="What is this club about?"
                style={textarea}
              />
            </div>

            {/* REQUIREMENTS */}
            <div style={field}>
              <label style={label}>AI Screening Requirements *</label>
              <textarea
                required
                rows={4}
                value={form.requirements}
                onChange={e => setForm({ ...form, requirements: e.target.value })}
                placeholder="Describe required skills, experience, qualities..."
                style={textarea}
              />
              <p style={hint}>
                Be specific — AI uses this to evaluate CVs.
              </p>
            </div>

            {/* EMAIL */}
            <div style={field}>
              <label style={label}>
                Club Manager Email <span style={{ color: '#6b6b85' }}></span>
              </label>
              <input
              required
                type="email"
                value={form.manager_email}
                onChange={e => setForm({ ...form, manager_email: e.target.value })}
                placeholder="manager@college.edu"
                style={input}
              />
              <p style={hint}>
                Must be a registered student.
              </p>
            </div>

            {/* BUTTONS */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>

              <button
                type="button"
                onClick={() => navigate('/college/dashboard')}
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
                {loading ? 'Creating...' : 'Create Club'}
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

const hint = {
  fontSize: '0.75rem',
  color: '#6b6b85',
  marginTop: '4px'
};