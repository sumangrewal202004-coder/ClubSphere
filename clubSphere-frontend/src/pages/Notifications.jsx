import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Notifications() {
  const [data, setData] = useState({ notifications: [], unread_count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    let mounted = true;

    api.get('/notifications')
      .then(res => {
        if (mounted) setData(res.data);
      })
      .catch(() => setError('Failed to load notifications'))
      .finally(() => setLoading(false));

    return () => (mounted = false);
  }, []);

  const markAllRead = async () => {
    if (updating) return;

    setUpdating(true);

    try {
      await api.patch('/notifications/read-all');

      setData(prev => ({
        ...prev,
        unread_count: 0,
        notifications: prev.notifications.map(n => ({
          ...n,
          is_read: true
        }))
      }));

    } catch (err) {
      alert('Failed to mark all as read');
    } finally {
      setUpdating(false);
    }
  };

  const markRead = async (id) => {
    if (updating) return;

    setUpdating(true);

    try {
      await api.patch(`/notifications/${id}/read`);

      setData(prev => ({
        ...prev,
        unread_count: Math.max(0, prev.unread_count - 1),
        notifications: prev.notifications.map(n =>
          n.id === id ? { ...n, is_read: true } : n
        )
      }));

    } catch (err) {
      alert('Failed to update notification');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>

          {data.unread_count > 0 && (
            <p className="text-sm text-indigo-600 mt-0.5">
              {data.unread_count} unread
            </p>
          )}
        </div>

        {data.unread_count > 0 && (
          <button
            onClick={markAllRead}
            disabled={updating}
            className="text-sm text-gray-500 hover:text-indigo-600 transition font-medium disabled:opacity-50"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 text-red-500">{error}</div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">
          Loading...
        </div>
      ) : data.notifications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-2">

          {data.notifications.map(n => (
            <div
              key={n.id}
              onClick={() => !n.is_read && markRead(n.id)}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                n.is_read
                  ? 'bg-white border-gray-100 hover:bg-gray-50'
                  : 'bg-indigo-50 border-indigo-100 hover:bg-indigo-100'
              }`}
            >
              <div className="flex items-start gap-3">

                {/* Dot */}
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    n.is_read ? 'bg-gray-200' : 'bg-indigo-500'
                  }`}
                />

                {/* Content */}
                <div className="flex-1">
                  <p
                    className={`text-sm ${
                      n.is_read
                        ? 'text-gray-600'
                        : 'text-gray-900 font-medium'
                    }`}
                  >
                    {n.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}