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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create a Club</h1>
        <p className="text-gray-500 text-sm mt-1">Set up a new club and assign a manager</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Club Name *</label>
            <input
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Coding Club, Debate Society"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="What is this club about?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              AI Screening Requirements *
            </label>
            <textarea
              required
              rows={4}
              value={form.requirements}
              onChange={e => setForm({ ...form, requirements: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Describe what skills, experience or qualities you look for. The AI will use this to score applicant CVs. e.g. 'Looking for students with programming experience in Python or JavaScript, problem solving skills, and any open source contributions.'"
            />
            <p className="text-xs text-gray-400 mt-1">
              Be specific — the AI uses this to evaluate CVs and generate scores.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Club Manager Email
              <span className="text-gray-400 font-normal ml-1">(optional)</span>
            </label>
            <input
              type="email"
              value={form.manager_email}
              onChange={e => setForm({ ...form, manager_email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="manager@college.edu"
            />
            <p className="text-xs text-gray-400 mt-1">
              Must be a registered club_manager account. Leave blank to assign later.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/college/dashboard')}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Create Club'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}