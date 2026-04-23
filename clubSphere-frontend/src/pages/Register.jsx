// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../api/axios';

// export default function Register() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'student',
//     domain: '',
//     phone: ''
//   });

//   const [documents, setDocuments] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       if (form.role === 'college') {
//         const formData = new FormData();

//         Object.keys(form).forEach(key => {
//           formData.append(key, form[key]);
//         });

//         // append multiple files
//         for (let i = 0; i < documents.length; i++) {
//           formData.append('documents', documents[i]);
//         }

//         await api.post('/college/register', formData);
//       } else {
//         await api.post('/auth/register', form);
//       }

//       alert('Registration successful');

//     } catch (err) {
//       setError(err.response?.data?.error || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const roles = [
//     { value: 'student', label: 'Student' },
//     { value: 'club_manager', label: 'Club Manager' },
//     { value: 'college', label: 'College' },
//   ];

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

//         <h2 className="text-xl font-bold mb-6">Register</h2>

//         {error && <p className="text-red-500 mb-3">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* NAME */}
//           <input
//             type="text"
//             placeholder="Name / College Name"
//             value={form.name}
//             onChange={e => setForm({ ...form, name: e.target.value })}
//             required
//             className="w-full border p-2 rounded"
//           />

//           {/* EMAIL */}
//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={e => setForm({ ...form, email: e.target.value })}
//             required
//             className="w-full border p-2 rounded"
//           />

//           {/* PASSWORD */}
//           {form.role !== 'college' && (
//             <input
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={e => setForm({ ...form, password: e.target.value })}
//               required
//               className="w-full border p-2 rounded"
//             />
//           )}

//           {/* ROLE */}
//           <select
//             value={form.role}
//             onChange={e => setForm({ ...form, role: e.target.value })}
//             className="w-full border p-2 rounded"
//           >
//             {roles.map(r => (
//               <option key={r.value} value={r.value}>
//                 {r.label}
//               </option>
//             ))}
//           </select>

//           {/* COLLEGE EXTRA FIELDS */}
//           {form.role === 'college' && (
//             <>
//               <input
//                 type="text"
//                 placeholder="College Domain (e.g. gndec.ac.in)"
//                 value={form.domain}
//                 onChange={e => setForm({ ...form, domain: e.target.value })}
//                 required
//                 className="w-full border p-2 rounded"
//               />

//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 value={form.phone}
//                 onChange={e => setForm({ ...form, phone: e.target.value })}
//                 required
//                 className="w-full border p-2 rounded"
//               />

//               {/* FILE UPLOAD */}
//               <input
//                 type="file"
//                 multiple
//                 onChange={(e) => setDocuments(e.target.files)}
//                 className="w-full"
//               />

//               <p className="text-xs text-gray-400">
//                 Upload at least 5 official documents
//               </p>
//             </>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-2 rounded"
//           >
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </form>

//         <p className="text-sm mt-4 text-center">
//           Already have an account? <Link to="/login" className="text-indigo-600">Login</Link>
//         </p>

//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const ROLES = [
  {
    value: 'student',
    label: 'Student',
    desc: 'Browse clubs, apply with your CV, register for events',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 2.955-1.01 5.674-2.68 7.81A11.95 11.95 0 0112 23a11.95 11.95 0 01-6.32-2.19A12.037 12.037 0 013 13c.59-.572 1.99-1.145 3.84-2.422L12 14z" />
      </svg>
    ),
  },
  {
    value: 'club_manager',
    label: 'Club Manager',
    desc: 'Review applications, manage members, post events',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a4 4 0 00-5.197-3.787M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a4 4 0 015.197-3.787M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    value: 'college',
    label: 'College',
    desc: 'Register your institution, create clubs, oversee activity',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: '', domain: '', phone: '',
  });
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectRole = (role) => {
    setForm({ ...form, role });
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password && form.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    if (form.role === 'college' && documents.length < 1) {
      return setError('Please upload at least one verification document');
    }

    setLoading(true);
    try {
      if (form.role === 'college') {
        const formData = new FormData();
        Object.keys(form).forEach(key => formData.append(key, form[key]));
        for (let i = 0; i < documents.length; i++) {
          formData.append('documents', documents[i]);
        }
        await api.post('/college/register', formData);
      } else {
        await api.post('/auth/register', form);
      }
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const selectedRole = ROLES.find(r => r.value === form.role);

  // ── Success screen ──────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {form.role === 'college' ? 'Application Submitted!' : 'Account Created!'}
          </h2>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            {form.role === 'college'
              ? "Your college registration is under review. We'll email you once approved. This typically takes 1–2 business days."
              : 'Your account is ready. Sign in to get started.'}
          </p>
          <Link
            to="/login"
            className="inline-block w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // ── Step 1 — Role selection ─────────────────────────────────────
  if (step === 1) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              Club<span className="text-indigo-600">Sphere</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Who are you joining as?</p>
          </div>

          <div className="space-y-3">
            {ROLES.map(role => (
              <button
                key={role.value}
                onClick={() => selectRole(role.value)}
                className="w-full bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-5
                           hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-50
                           active:scale-[0.99] transition-all duration-150 text-left group"
              >
                <div className="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-500
                                group-hover:bg-indigo-600 group-hover:text-white
                                flex items-center justify-center shrink-0 transition-all duration-150">
                  {role.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-base">{role.label}</p>
                  <p className="text-sm text-gray-400 mt-0.5 leading-snug">{role.desc}</p>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 shrink-0 transition-colors"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    );
  }

  // ── Step 2 — Registration form ──────────────────────────────────
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Club<span className="text-indigo-600">Sphere</span>
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

          {/* Selected role + back */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <div className="scale-[0.6]">{selectedRole?.icon}</div>
              </div>
              <div>
                <p className="text-xs text-gray-400 leading-none mb-0.5">Registering as</p>
                <p className="text-sm font-semibold text-gray-800">{selectedRole?.label}</p>
              </div>
            </div>
            <button
              onClick={() => { setStep(1); setError(''); }}
              className="text-xs text-indigo-500 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Change role
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                {form.role === 'college' ? 'College Name' : 'Full Name'}
              </label>
              <input
                type="text"
                required
                placeholder={form.role === 'college' ? 'e.g. GNDEC Ludhiana' : 'Your full name'}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder:text-gray-300 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                {form.role === 'college' ? 'Official Email' : 'Email Address'}
              </label>
              <input
                type="email"
                required
                placeholder={
                  form.role === 'student' ? 'yourname@college.ac.in'
                  : form.role === 'college' ? 'admin@yourcollege.ac.in'
                  : 'you@example.com'
                }
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder:text-gray-300 transition"
              />
              {form.role === 'student' && (
                <p className="text-xs text-indigo-500 mt-1.5 flex items-center gap-1">
                  <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Use your official college email — your institution is detected automatically
                </p>
              )}
            </div>

            {/* Password — not shown for college */}
            {form.role !== 'college' && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Min 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                             placeholder:text-gray-300 transition"
                />
              </div>
            )}

            {/* College-only fields */}
            {form.role === 'college' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    College Email Domain
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm select-none">@</span>
                    <input
                      type="text"
                      required
                      placeholder="gndec.ac.in"
                      value={form.domain}
                      onChange={e => setForm({ ...form, domain: e.target.value })}
                      className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm
                                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                 placeholder:text-gray-300 transition"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">
                    Students with this email domain will be auto-linked to your college
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm
                               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                               placeholder:text-gray-300 transition"
                  />
                </div>

                {/* Document upload */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Verification Documents
                  </label>
                  <label
                    className={`flex flex-col items-center justify-center w-full py-7 border-2 border-dashed
                                rounded-xl cursor-pointer transition
                                ${documents.length > 0
                                  ? 'border-indigo-300 bg-indigo-50'
                                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}`}
                  >
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={e => setDocuments(e.target.files)}
                    />
                    {documents.length > 0 ? (
                      <>
                        <svg className="w-6 h-6 text-indigo-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm font-semibold text-indigo-600">{documents.length} file{documents.length > 1 ? 's' : ''} selected</p>
                        <p className="text-xs text-gray-400 mt-1">Click to change</p>
                      </>
                    ) : (
                      <>
                        <svg className="w-7 h-7 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-500 font-medium">Click to upload documents</p>
                        <p className="text-xs text-gray-400 mt-1 text-center px-4">
                          NAAC certificate, UGC approval, affiliation letter, etc.
                        </p>
                      </>
                    )}
                  </label>

                  {documents.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {Array.from(documents).map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                          <svg className="w-3.5 h-3.5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="truncate">{f.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Review notice */}
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
                  <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-amber-700 mb-0.5">Manual review required</p>
                    <p className="text-xs text-amber-600 leading-relaxed">
                      College accounts are reviewed before activation. You'll receive an email once approved — typically within 1–2 business days.
                    </p>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold
                         hover:bg-indigo-700 active:scale-[0.99] transition-all mt-2
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Please wait...'
                : form.role === 'college'
                ? 'Submit for Review'
                : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}