// import { useEffect, useState } from 'react';
// import api from '../../api/axios';

// function StatusBadge({ status }) {
//   const styles = {
//     pending: 'bg-amber-50 text-amber-600 border border-amber-100',
//     approved: 'bg-green-50 text-green-700 border border-green-100',
//     rejected: 'bg-red-50 text-red-600 border border-red-100',
//   };
//   const icons = { pending: '⏳', approved: '✅', rejected: '❌' };
//   return (
//     <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${styles[status]}`}>
//       {icons[status]} {status}
//     </span>
//   );
// }

// export default function MyApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get('/applications/mine')
//       .then(res => setApplications(res.data))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
//         <p className="text-gray-500 text-sm mt-1">Track your club application status</p>
//       </div>

//       {loading ? (
//         <div className="text-center py-16 text-gray-400">Loading...</div>
//       ) : applications.length === 0 ? (
//         <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
//           <p className="text-gray-400 mb-2">No applications yet</p>
//           <a href="/student/clubs" className="text-indigo-600 text-sm font-medium hover:underline">
//             Browse clubs →
//           </a>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {applications.map(app => (
//             <div key={app.id} className="bg-white rounded-xl border border-gray-100 p-6">
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-900 text-lg">{app.club_name}</h3>
//                   <p className="text-xs text-gray-400 mt-1">
//                     Applied {new Date(app.applied_at).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-3 shrink-0">
//                   {app.ai_score !== null && (
//                     <span className={`text-sm font-bold px-3 py-1 rounded-full ${
//                       app.ai_score >= 70 ? 'bg-green-50 text-green-700' :
//                       app.ai_score >= 40 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-600'
//                     }`}>
//                       {app.ai_score}/100
//                     </span>
//                   )}
//                   <StatusBadge status={app.status} />
//                 </div>
//               </div>

//               {app.ai_feedback && (
//                 <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                   <p className="text-xs font-medium text-gray-500 mb-1">AI Feedback</p>
//                   <p className="text-sm text-gray-600">{app.ai_feedback}</p>
//                 </div>
//               )}

//               {!app.ai_score && !app.ai_feedback && (
//                 <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//                   <p className="text-xs text-blue-600">🤖 AI is evaluating your CV... Check back in a moment.</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import api from '../../api/axios';

function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-amber-50 text-amber-600 border border-amber-100',
    approved: 'bg-green-50 text-green-700 border border-green-100',
    rejected: 'bg-red-50 text-red-600 border border-red-100',
  };
  const icons = { pending: '⏳', approved: '✅', rejected: '❌' };
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${styles[status]}`}>
      {icons[status]} {status}
    </span>
  );
}

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/applications/mine')
      .then(res => setApplications(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-500 text-sm mt-1">Track your club application status</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading...</div>
      ) : applications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400 mb-2">No applications yet</p>
          <a href="/student/clubs" className="text-indigo-600 text-sm font-medium hover:underline">
            Browse clubs →
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{app.club_name}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Applied {new Date(app.applied_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={app.status} />
                </div>
              </div>

              {/* Status-specific messages — no AI score/feedback shown to student */}
              {app.status === 'pending' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600">🔍 Your application is under review. You will be notified if you are selected.</p>
                </div>
              )}
              {app.status === 'approved' && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-700 font-medium">🎉 Congratulations! You have been selected for this club.</p>
                </div>
              )}
              {app.status === 'rejected' && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Thank you for applying. Unfortunately, you were not selected this time. Keep exploring other clubs!</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}