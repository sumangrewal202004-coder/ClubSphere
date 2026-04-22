import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

function ScoreBadge({ score }) {
  if (score === null || score === undefined) {
    return <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Evaluating...</span>;
  }
  const color = score >= 70 ? 'bg-green-50 text-green-700' : score >= 40 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-600';
  return (
    <span className={`text-sm font-bold px-3 py-1 rounded-full ${color}`}>
      {score}/100
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-amber-50 text-amber-600',
    approved: 'bg-green-50 text-green-700',
    rejected: 'bg-red-50 text-red-600',
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function ApplicationsReview() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    api.get(`/manager/${clubId}/applications`)
      .then(res => setApplications(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [clubId]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await api.patch(`/manager/applications/${id}/status`, { status });
      setApplications(prev =>
        prev.map(a => a.id === id ? { ...a, status } : a)
      );
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600 transition">
          ← Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-sm text-gray-500 mt-0.5">Sorted by AI score — highest first</p>
        </div>
        <span className="ml-auto text-sm text-gray-400">{applications.length} total</span>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400">No applications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app, index) => (
            <div key={app.id} className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-start justify-between gap-4">
                {/* Rank + info */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900">{app.name}</h3>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="text-sm text-gray-400">{app.email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Applied {new Date(app.applied_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Score */}
                <ScoreBadge score={app.ai_score} />
              </div>

              {/* AI Feedback */}
              {app.ai_feedback && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                  <p className="text-xs font-medium text-indigo-700 mb-1">AI Evaluation</p>
                  <p className="text-sm text-indigo-800">{app.ai_feedback}</p>
                </div>
              )}

              {/* Actions */}
              {app.status === 'pending' && (
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-50">
                  <button
                    onClick={() => updateStatus(app.id, 'approved')}
                    disabled={updating === app.id}
                    className="px-5 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-60"
                  >
                    {updating === app.id ? 'Updating...' : '✓ Approve'}
                  </button>
                  <button
                    onClick={() => updateStatus(app.id, 'rejected')}
                    disabled={updating === app.id}
                    className="px-5 py-2 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition font-medium disabled:opacity-60"
                  >
                    ✕ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}