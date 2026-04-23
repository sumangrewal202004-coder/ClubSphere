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
if (!form.clubId) {
  return setError('Please select a club');
}
  const handleSubmit = async (e) => {
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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Event</h1>
        <p className="text-gray-500 text-sm mt-1">Club members will be notified automatically</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Club *</label>
            <select
              required
              value={form.clubId}
              onChange={e => setForm({ ...form, clubId: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">Select a club</option>
              {clubs.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
            <input
              required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Annual Hackathon 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="What will happen at this event?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Venue *</label>
            <input
              required
              value={form.venue}
              onChange={e => setForm({ ...form, venue: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Main Auditorium, Room 204"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time *</label>
            <input
              type="datetime-local"
              required
              value={form.event_date}
              onChange={e => setForm({ ...form, event_date: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}