import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function StudentEvents() {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(null);
  const [tab, setTab] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    Promise.all([
      api.get('/events'),
      api.get('/events/mine')
    ])
      .then(([all, mine]) => {
        if (!mounted) return;
        setEvents(all.data);
        setMyEvents(mine.data.map(e => e.id));
      })
      .catch(() => setError('Failed to load events'))
      .finally(() => setLoading(false));

    return () => (mounted = false);
  }, []);

  const register = async (eventId) => {
    if (registering) return; // 🚫 prevent spam clicks

    setRegistering(eventId);

    try {
      await api.post('/events/register', { eventId });

      // ✅ avoid duplicate IDs
      setMyEvents(prev =>
        prev.includes(eventId) ? prev : [...prev, eventId]
      );

    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    } finally {
      setRegistering(null);
    }
  };

  const displayEvents =
    tab === 'mine'
      ? events.filter(e => myEvents.includes(e.id))
      : events;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <p className="text-gray-500 text-sm mt-1">
          Upcoming club events you can register for
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 text-red-500">{error}</div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {[['all', 'All Events'], ['mine', 'Registered']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
              tab === key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
            {key === 'mine' && myEvents.length > 0 && (
              <span className="ml-1.5 bg-indigo-100 text-indigo-600 text-xs px-1.5 py-0.5 rounded-full">
                {myEvents.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16 text-gray-400">
          Loading events...
        </div>
      )}

      {/* Empty */}
      {!loading && displayEvents.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400">
            {tab === 'mine'
              ? "You haven't registered for any events yet."
              : 'No upcoming events.'}
          </p>
        </div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayEvents.map(event => {
          const isRegistered = myEvents.includes(event.id);
          const date = new Date(event.event_date);

          return (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col"
            >
              {/* Title */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-semibold text-gray-900">
                  {event.title}
                </h3>

                {isRegistered && (
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                    Registered
                  </span>
                )}
              </div>

              {/* Club */}
              <p className="text-xs text-indigo-500 font-medium mb-2">
                {event.club_name}
              </p>

              {/* Description */}
              {event.description && (
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {event.description}
                </p>
              )}

              {/* Details */}
              <div className="mt-auto space-y-1.5 text-xs text-gray-500">
                <div>📅 {date.toLocaleDateString()}</div>
                <div>🕐 {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div>📍 {event.venue}</div>
              </div>

              {/* Register Button */}
              {!isRegistered && (
                <button
                  onClick={() => register(event.id)}
                  disabled={registering === event.id}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60"
                >
                  {registering === event.id
                    ? 'Registering...'
                    : 'Register'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}