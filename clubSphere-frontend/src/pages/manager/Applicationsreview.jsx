// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../../api/axios';

// function ScoreBadge({ score }) {
//   if (score === null || score === undefined) {
//     return <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Evaluating...</span>;
//   }

//   const color =
//     score >= 70
//       ? 'bg-green-50 text-green-700'
//       : score >= 40
//       ? 'bg-amber-50 text-amber-700'
//       : 'bg-red-50 text-red-600';

//   return (
//     <span className={`text-sm font-bold px-3 py-1 rounded-full ${color}`}>
//       {score}/100
//     </span>
//   );
// }

// function StatusBadge({ status }) {
//   const styles = {
//     pending: 'bg-amber-50 text-amber-600',
//     approved: 'bg-green-50 text-green-700',
//     rejected: 'bg-red-50 text-red-600',
//   };

//   return (
//     <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${styles[status]}`}>
//       {status}
//     </span>
//   );
// }

// export default function ApplicationsReview() {
//   const { clubId } = useParams();
//   const navigate = useNavigate();

//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     let mounted = true;

//     api.get(`/manager/${clubId}/applications`)
//       .then(res => {
//         if (mounted) setApplications(res.data);
//       })
//       .catch(() => setError('Failed to load applications'))
//       .finally(() => setLoading(false));

//     return () => (mounted = false);
//   }, [clubId]);

//   const updateStatus = async (id, status) => {
//     setUpdating(id);

//     try {
//       await api.patch(`/manager/applications/${id}/status`, { status });

//       setApplications(prev =>
//         prev.map(a => a.id === id ? { ...a, status } : a)
//       );

//     } catch (err) {
//       alert(err.response?.data?.error || 'Failed to update');
//     } finally {
//       setUpdating(null);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">

//       <div className="flex items-center gap-3 mb-8">
//         <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">
//           ← Back
//         </button>

//         <div>
//           <h1 className="text-2xl font-bold">Applications</h1>
//           <p className="text-sm text-gray-500">Sorted by AI score</p>
//         </div>

//         <span className="ml-auto text-sm text-gray-400">
//           {applications.length} total
//         </span>
//       </div>

//       {loading && <div className="text-center py-16">Loading...</div>}

//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       {!loading && applications.length === 0 && (
//         <div className="text-center py-16">No applications yet</div>
//       )}

//       <div className="space-y-4">
//         {applications.map((app, index) => (
//           <div key={app.id} className="bg-white p-6 rounded-xl border">

//             <div className="flex justify-between">

//               <div className="flex gap-4">
//                 <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
//                   #{index + 1}
//                 </div>

//                 <div>
//                   <h3 className="font-semibold">{app.name}</h3>
//                   <p className="text-sm text-gray-400">{app.email}</p>
//                   <StatusBadge status={app.status} />
//                 </div>
//               </div>

//               <ScoreBadge score={app.ai_score} />
//             </div>

//             {app.ai_feedback && (
//               <div className="mt-4 text-sm bg-indigo-50 p-3 rounded">
//                 {app.ai_feedback}
//               </div>
//             )}

//             {app.status === 'pending' && (
//               <div className="flex gap-3 mt-4">
//                 <button
//                   onClick={() => updateStatus(app.id, 'approved')}
//                   disabled={updating === app.id}
//                   className="bg-green-600 text-white px-4 py-2 rounded"
//                 >
//                   Approve
//                 </button>

//                 <button
//                   onClick={() => updateStatus(app.id, 'rejected')}
//                   disabled={updating === app.id}
//                   className="bg-red-100 text-red-600 px-4 py-2 rounded"
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ScoreBadge({ score }) {
  if (score === null || score === undefined) {
    return <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Evaluating...</span>;
  }
  const color =
    score >= 70 ? 'bg-green-50 text-green-700' :
    score >= 40 ? 'bg-amber-50 text-amber-700' :
    'bg-red-50 text-red-600';
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
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    api.get(`/manager/${clubId}/applications`)
      .then(res => { if (mounted) setApplications(res.data); })
      .catch(() => setError('Failed to load applications'))
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, [clubId]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await api.patch(`/manager/applications/${id}/status`, { status });
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update');
    } finally {
      setUpdating(null);
    }
  };

  const viewResume = (cvPath) => {
    if (!cvPath) return alert('No resume uploaded for this applicant.');
    const url = `${BASE_URL}/${cvPath}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">← Back</button>
        <div>
          <h1 className="text-2xl font-bold">Applications</h1>
          <p className="text-sm text-gray-500">Sorted by AI score · Resume available for manual review</p>
        </div>
        <span className="ml-auto text-sm text-gray-400">{applications.length} total</span>
      </div>

      {loading && <div className="text-center py-16">Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!loading && applications.length === 0 && (
        <div className="text-center py-16">No applications yet</div>
      )}

      <div className="space-y-4">
        {applications.map((app, index) => (
          <div key={app.id} className="bg-white p-6 rounded-xl border">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  #{index + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{app.name}</h3>
                  <p className="text-sm text-gray-400">{app.email}</p>
                  <div className="mt-1"><StatusBadge status={app.status} /></div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <ScoreBadge score={app.ai_score} />
                <button
                  onClick={() => viewResume(app.cv_path)}
                  className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-medium transition"
                >
                  📄 Review Resume
                </button>
              </div>
            </div>

            {app.ai_feedback && (
              <div className="mt-4 text-sm bg-indigo-50 p-3 rounded-lg">
                <p className="text-xs font-semibold text-indigo-500 mb-1">🤖 AI Feedback</p>
                {app.ai_feedback}
              </div>
            )}
            {!app.ai_score && !app.ai_feedback && (
              <div className="mt-4 text-sm bg-gray-50 p-3 rounded-lg text-gray-400">AI evaluation pending...</div>
            )}

            {app.status === 'pending' && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => updateStatus(app.id, 'approved')}
                  disabled={updating === app.id}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition disabled:opacity-50"
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => updateStatus(app.id, 'rejected')}
                  disabled={updating === app.id}
                  className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition disabled:opacity-50"
                >
                  ✗ Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}