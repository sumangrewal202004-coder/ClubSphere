import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function CollegeDashboard() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/clubs/mine')
      .then(res => setClubs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">College Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all your clubs</p>
        </div>
        <Link
          to="/college/create-club"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          + Create Club
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Total Clubs</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{clubs.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Total Applications</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {clubs.reduce((s, c) => s + parseInt(c.total_applications || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Pending Reviews</p>
          <p className="text-3xl font-bold text-indigo-600 mt-1">
            {clubs.reduce((s, c) => s + parseInt(c.pending_count || 0), 0)}
          </p>
        </div>
      </div>

      {/* Clubs list */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading clubs...</div>
      ) : clubs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400 mb-3">No clubs yet</p>
          <Link to="/college/create-club" className="text-indigo-600 text-sm font-medium hover:underline">
            Create your first club →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clubs.map(club => (
            <div key={club.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-sm transition">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-lg">{club.name}</h3>
                <div className="flex gap-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {club.total_applications} applied
                  </span>
                  {parseInt(club.pending_count) > 0 && (
                    <span className="text-xs bg-amber-50 text-amber-600 px-2 py-1 rounded-full font-medium">
                      {club.pending_count} pending
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{club.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
                <span>Manager: <span className="text-gray-600 font-medium">{club.manager_name || 'Not assigned'}</span></span>
                <span>{club.manager_email}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}