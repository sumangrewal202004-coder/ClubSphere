import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function AdminDashboard() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // fetch colleges
  const fetchColleges = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/colleges');
      setColleges(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch colleges');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  // update status (approve/reject)
  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/colleges/${id}/status`, { status });

      // update UI instantly
      setColleges(prev =>
        prev.map(c =>
          c.id === id ? { ...c, status } : c
        )
      );

    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">
        College Approvals
      </h1>

      {/* Error */}
      {error && (
        <div className="mb-4 text-red-500">{error}</div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-center py-10 text-gray-400">
          Loading colleges...
        </div>
      ) : colleges.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No colleges found.
        </div>
      ) : (
        <div className="space-y-4">

          {colleges.map(c => (
            <div
              key={c.id}
              className="bg-white p-5 rounded-xl border border-gray-100 flex items-center justify-between"
            >

              {/* Left */}
              <div>
                <h3 className="font-semibold text-gray-900">
                  {c.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {c.email}
                </p>
                <p className="text-xs text-gray-400">
                  {c.domain}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3">

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    c.status === 'approved'
                      ? 'bg-green-100 text-green-600'
                      : c.status === 'rejected'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {c.status}
                </span>

                {/* Actions */}
                {c.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(c.id, 'approved')}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(c.id, 'rejected')}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-200"
                    >
                      Reject
                    </button>
                  </>
                )}

                {c.status === 'approved' && (
                  <button
                    onClick={() => updateStatus(c.id, 'rejected')}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-200"
                  >
                    Reject
                  </button>
                )}

                {c.status === 'rejected' && (
                  <button
                    onClick={() => updateStatus(c.id, 'approved')}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Approve
                  </button>
                )}

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}