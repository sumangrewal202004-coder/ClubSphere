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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Review applications and manage events</p>
        </div>
        <Link
          to="/manager/events/create"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          + Create Event
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading your clubs...</div>
      ) : clubs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400">No clubs assigned to you yet.</p>
          <p className="text-sm text-gray-400 mt-1">Ask your college admin to assign you a club.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {clubs.map(club => (
            <div key={club.id} className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{club.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{club.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    {club.total_applications} total
                  </span>
                  {parseInt(club.pending_count) > 0 && (
                    <span className="text-xs bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-medium">
                      {club.pending_count} pending
                    </span>
                  )}
                  {parseInt(club.approved_count) > 0 && (
                    <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full">
                      {club.approved_count} approved
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <Link
                  to={`/manager/clubs/${club.id}/applications`}
                  className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  View Applications
                </Link>
                <Link
                  to="/manager/events/create"
                  state={{ clubId: club.id, clubName: club.name }}
                  className="text-sm border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  Post Event
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}