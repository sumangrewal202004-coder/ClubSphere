import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function AdminDashboard() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/colleges')
      .then(res => setColleges(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/colleges/${id}/status`, { status });

      setColleges(prev =>
        prev.map(c =>
          c.id === id ? { ...c, status } : c
        )
      );

    } catch (err) {
      alert('Failed');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold mb-6">
        College Approvals
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">

          {colleges.map(c => (
            <div key={c.id} className="bg-white p-5 rounded-xl border">

              <div className="flex justify-between">

                <div>
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="text-sm text-gray-500">{c.email}</p>
                  <p className="text-xs text-gray-400">{c.domain}</p>
                </div>

                <div className="flex gap-2">

                  <span className={`px-3 py-1 text-xs rounded-full ${
                    c.status === 'approved'
                      ? 'bg-green-100 text-green-600'
                      : c.status === 'rejected'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {c.status}
                  </span>

                  {c.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(c.id, 'approved')}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(c.id, 'rejected')}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}

                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}