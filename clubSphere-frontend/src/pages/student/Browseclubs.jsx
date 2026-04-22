import { useEffect, useState } from 'react';
import api from '../../api/axios';
import ApplyModal from '../../components/ApplyModal';

export default function BrowseClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClub, setSelectedClub] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/clubs')
      .then(res => setClubs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = clubs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Browse Clubs</h1>
        <p className="text-gray-500 text-sm mt-1">Find a club and apply with your CV</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search clubs..."
        />
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading clubs...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">No clubs found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(club => (
            <div key={club.id} className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col hover:shadow-sm transition">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{club.name}</h3>
                <p className="text-xs text-indigo-500 mb-3">{club.college_name}</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-3">{club.description}</p>

                {club.requirements && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs font-medium text-gray-600 mb-1">What they look for:</p>
                    <p className="text-xs text-gray-500 line-clamp-3">{club.requirements}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedClub(club)}
                className="mt-4 w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Apply Modal */}
      {selectedClub && (
        <ApplyModal
          club={selectedClub}
          onClose={() => setSelectedClub(null)}
        />
      )}
    </div>
  );
}