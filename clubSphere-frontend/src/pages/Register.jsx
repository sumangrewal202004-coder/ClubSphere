// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../api/axios';

// const ROLES = [
//   {
//     value: 'student',
//     label: 'Student',
//     desc: 'Browse clubs, apply with your CV, register for events',
//     icon: (
//       <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//           d="M12 14l9-5-9-5-9 5 9 5z" />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//           d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 2.955-1.01 5.674-2.68 7.81A11.95 11.95 0 0112 23a11.95 11.95 0 01-6.32-2.19A12.037 12.037 0 013 13c.59-.572 1.99-1.145 3.84-2.422L12 14z" />
//       </svg>
//     ),
//   },
//   {
//     value: 'club_manager',
//     label: 'Club Manager',
//     desc: 'Review applications, manage members, post events',
//     icon: (
//       <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//           d="M17 20h5v-2a4 4 0 00-5.197-3.787M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a4 4 0 015.197-3.787M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
//       </svg>
//     ),
//   },
//   {
//     value: 'college',
//     label: 'College',
//     desc: 'Register your institution, create clubs, oversee activity',
//     icon: (
//       <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//           d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
//       </svg>
//     ),
//   },
// ];

// export default function Register() {
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: '', email: '', password: '', role: '', domain: '', phone: '',
//   });
//   const [documents, setDocuments] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const selectRole = (role) => {
//     setForm({ ...form, role });
//     setStep(2);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (form.password && form.password.length < 6) {
//       return setError('Password must be at least 6 characters');
//     }
//     // Temporarily commented out for testing
//     // if (form.role === 'college' && documents.length < 1) {
//     //   return setError('Please upload at least one verification document');
//     // }

//     setLoading(true);
//     try {
//       if (form.role === 'college') {
//         const formData = new FormData();
//         Object.keys(form).forEach(key => formData.append(key, form[key]));
//         for (let i = 0; i < documents.length; i++) {
//           formData.append('documents', documents[i]);
//         }
//         await api.post('/college/register', formData);
//       } else {
//         await api.post('/auth/register', form);
//       }
//       setSuccess(true);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const selectedRole = ROLES.find(r => r.value === form.role);


import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

/* ─── shared dark-theme styles ────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

  .cs-reg * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Sora', system-ui, sans-serif; }

  @keyframes cs-fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cs-fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes cs-orbA    { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-16px) scale(1.06)} }
  @keyframes cs-orbB    { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-14px,12px) scale(1.04)} }
  @keyframes cs-shake   { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
  @keyframes cs-spin    { to{transform:rotate(360deg)} }
  @keyframes cs-pulse   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.9;transform:scale(1.1)} }
  @keyframes cs-check   { 0%{opacity:0;transform:scale(.6)} 60%{transform:scale(1.1)} 100%{opacity:1;transform:scale(1)} }

  .cs-reg {
    min-height: 100vh;
    background: #0d0b1a;
    display: flex; align-items: center; justify-content: center;
    padding: 32px 16px;
    position: relative; overflow: hidden;
  }

  .cs-orb { position: fixed; border-radius: 50%; pointer-events: none; filter: blur(72px); z-index: 0; }
  .cs-orb-1 { width:480px;height:480px; background:radial-gradient(circle,rgba(83,74,183,.45) 0%,transparent 70%); top:-140px;left:-140px; animation:cs-orbA 10s ease-in-out infinite; }
  .cs-orb-2 { width:380px;height:380px; background:radial-gradient(circle,rgba(15,110,86,.35) 0%,transparent 70%); bottom:-100px;right:-100px; animation:cs-orbB 12s ease-in-out infinite; }
  .cs-orb-3 { width:220px;height:220px; background:radial-gradient(circle,rgba(132,79,11,.28) 0%,transparent 70%); top:38%;right:10%; animation:cs-orbA 14s ease-in-out 2s infinite reverse; }

  .cs-grid-bg {
    position:fixed;inset:0;z-index:0;pointer-events:none;
    background-image: linear-gradient(rgba(127,119,221,.07) 1px,transparent 1px), linear-gradient(90deg,rgba(127,119,221,.07) 1px,transparent 1px);
    background-size:40px 40px;
  }

  .cs-wrap { position:relative;z-index:1;width:100%;max-width:520px; animation:cs-fadeUp .6s cubic-bezier(.22,1,.36,1) both; }

  /* brand */
  .cs-brand { text-align:center; margin-bottom:28px; }
  .cs-brand-logo { display:inline-flex;align-items:center;gap:10px;margin-bottom:8px; }
  .cs-brand-icon { width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#534AB7 0%,#7F77DD 100%);display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(83,74,183,.5); }
  .cs-brand-icon svg { width:22px;height:22px; }
  .cs-brand-name { font-size:27px;font-weight:700;letter-spacing:-.6px;color:#f0eeff; }
  .cs-brand-name span { color:#7F77DD; }
  .cs-brand-sub { font-size:15px;color:#5a5880; }

  /* card */
  .cs-card {
    background:rgba(20,17,40,.82);
    backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
    border:1px solid rgba(127,119,221,.18);
    border-radius:22px; padding:36px 36px 32px;
    box-shadow:0 0 0 1px rgba(127,119,221,.06),0 8px 32px rgba(0,0,0,.5),0 32px 64px rgba(0,0,0,.35);
  }

  /* role cards */
  .cs-role-btn {
    width:100%;background:rgba(255,255,255,.03);
    border:1px solid rgba(127,119,221,.15);
    border-radius:16px;padding:18px 20px;
    display:flex;align-items:center;gap:16px;
    cursor:pointer;transition:all .18s;text-align:left;
    margin-bottom:10px;
  }
  .cs-role-btn:last-child { margin-bottom:0; }
  .cs-role-btn:hover { border-color:rgba(127,119,221,.5);background:rgba(83,74,183,.1);transform:translateY(-1px); }
  .cs-role-icon { width:52px;height:52px;border-radius:14px;background:rgba(83,74,183,.15);color:#7F77DD;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s; }
  .cs-role-btn:hover .cs-role-icon { background:#534AB7;color:#fff;box-shadow:0 0 16px rgba(83,74,183,.5); }
  .cs-role-icon svg { width:26px;height:26px; }
  .cs-role-title { font-size:16px;font-weight:600;color:#eceaff;margin-bottom:3px; }
  .cs-role-desc  { font-size:13px;color:#5a5880;line-height:1.5; }
  .cs-role-arrow { margin-left:auto;flex-shrink:0;color:#3e3d5c;transition:color .18s; }
  .cs-role-btn:hover .cs-role-arrow { color:#7F77DD; }

  /* header inside form */
  .cs-form-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:24px; }
  .cs-selected-role { display:flex;align-items:center;gap:10px; }
  .cs-sel-icon { width:36px;height:36px;border-radius:10px;background:rgba(83,74,183,.2);color:#7F77DD;display:flex;align-items:center;justify-content:center; }
  .cs-sel-icon svg { width:18px;height:18px; }
  .cs-sel-label { font-size:11px;color:#4a4870;margin-bottom:2px;text-transform:uppercase;letter-spacing:.07em; }
  .cs-sel-value { font-size:15px;font-weight:600;color:#eceaff; }
  .cs-back-btn { font-size:13px;color:#7F77DD;background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:4px;transition:color .15s; }
  .cs-back-btn:hover { color:#AFA9EC; }

  /* section divider inside form */
  .cs-section-label {
    font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;
    color:#534AB7;margin:24px 0 14px;display:flex;align-items:center;gap:8px;
  }
  .cs-section-label::after { content:'';flex:1;height:1px;background:rgba(83,74,183,.2); }

  /* label + input */
  .cs-label { display:block;font-size:12px;font-weight:600;color:#4a4870;text-transform:uppercase;letter-spacing:.09em;margin-bottom:7px; }

  .cs-field { margin-bottom:16px; }

  .cs-input-wrap { position:relative; }
  .cs-input-icon { position:absolute;left:14px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:#3e3d5c;pointer-events:none; }
  .cs-input-icon-top { position:absolute;left:14px;top:14px;width:16px;height:16px;color:#3e3d5c;pointer-events:none; }

  .cs-input {
    width:100%;padding:13px 14px 13px 42px;
    border:1.5px solid rgba(127,119,221,.2);border-radius:12px;
    font-size:15px;color:#eceaff;background:rgba(255,255,255,.04);
    transition:border-color .18s,box-shadow .18s,background .18s;
    outline:none;font-family:'Sora',system-ui,sans-serif;
  }
  .cs-input-no-icon { padding-left:14px; }
  .cs-input::placeholder { color:#2e2d4a; }
  .cs-input:focus { border-color:#7F77DD;background:rgba(127,119,221,.07);box-shadow:0 0 0 3px rgba(83,74,183,.2); }
  .cs-input:hover:not(:focus) { border-color:rgba(127,119,221,.35); }

  .cs-textarea {
    width:100%;padding:13px 14px 13px 42px;
    border:1.5px solid rgba(127,119,221,.2);border-radius:12px;
    font-size:15px;color:#eceaff;background:rgba(255,255,255,.04);
    transition:border-color .18s,box-shadow .18s;
    outline:none;font-family:'Sora',system-ui,sans-serif;
    resize:vertical;min-height:80px;
  }
  .cs-textarea::placeholder { color:#2e2d4a; }
  .cs-textarea:focus { border-color:#7F77DD;background:rgba(127,119,221,.07);box-shadow:0 0 0 3px rgba(83,74,183,.2); }

  .cs-select {
    width:100%;padding:13px 14px 13px 42px;
    border:1.5px solid rgba(127,119,221,.2);border-radius:12px;
    font-size:15px;color:#eceaff;background:rgba(20,17,40,.95);
    transition:border-color .18s,box-shadow .18s;
    outline:none;font-family:'Sora',system-ui,sans-serif;
    -webkit-appearance:none;appearance:none;
    cursor:pointer;
  }
  .cs-select:focus { border-color:#7F77DD;box-shadow:0 0 0 3px rgba(83,74,183,.2); }
  .cs-select option { background:#14112a;color:#eceaff; }

  .cs-select-wrap { position:relative; }
  .cs-select-arrow { position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none;color:#3e3d5c; }

  /* domain prefix */
  .cs-input-prefix { position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#3e3d5c;font-size:15px;pointer-events:none; }
  .cs-input-prefixed { padding-left:26px !important; }

  /* hint */
  .cs-hint { font-size:12px;color:#4a4870;margin-top:5px;line-height:1.5; }
  .cs-hint-purple { color:#7F77DD; }

  /* error */
  .cs-error { display:flex;align-items:flex-start;gap:10px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);border-radius:12px;padding:12px 16px;margin-bottom:20px;animation:cs-shake .4s ease,cs-fadeIn .25s ease; }
  .cs-error-icon { width:17px;height:17px;color:#f87171;flex-shrink:0;margin-top:1px; }
  .cs-error-text { font-size:14px;color:#fca5a5;line-height:1.5; }

  /* file upload */
  .cs-upload-label {
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    width:100%;padding:28px 16px;
    border:2px dashed rgba(127,119,221,.25);border-radius:14px;cursor:pointer;transition:all .2s;
  }
  .cs-upload-label:hover { border-color:rgba(127,119,221,.5);background:rgba(83,74,183,.06); }
  .cs-upload-active { border-color:rgba(127,119,221,.6)!important;background:rgba(83,74,183,.1)!important; }
  .cs-upload-icon { width:28px;height:28px;color:#3e3d5c;margin-bottom:8px; }
  .cs-upload-txt { font-size:14px;font-weight:500;color:#7F77DD;margin-bottom:4px; }
  .cs-upload-sub { font-size:12px;color:#3e3d5c;text-align:center; }
  .cs-file-list { margin-top:10px;display:flex;flex-direction:column;gap:6px; }
  .cs-file-item { display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.04);border:1px solid rgba(127,119,221,.12);border-radius:8px;padding:8px 12px; }
  .cs-file-name { font-size:12px;color:#7876a8;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }

  /* notice */
  .cs-notice { display:flex;gap:10px;background:rgba(133,79,11,.12);border:1px solid rgba(133,79,11,.25);border-radius:12px;padding:14px 16px;margin-top:4px; }
  .cs-notice-icon { width:17px;height:17px;color:#f59e0b;flex-shrink:0;margin-top:1px; }
  .cs-notice-title { font-size:13px;font-weight:600;color:#fcd34d;margin-bottom:3px; }
  .cs-notice-body  { font-size:12px;color:#b45309;line-height:1.6; }

  /* info strip */
  .cs-info-strip { display:flex;align-items:center;gap:10px;background:rgba(127,119,221,.08);border:1px solid rgba(127,119,221,.12);border-radius:10px;padding:11px 15px;margin-top:4px; }
  .cs-info-dot { width:8px;height:8px;border-radius:50%;background:#1D9E75;flex-shrink:0;animation:cs-pulse 2.2s ease-in-out infinite;box-shadow:0 0 8px rgba(29,158,117,.6); }
  .cs-info-txt { font-size:13px;color:#4a4870;line-height:1.5; }
  .cs-info-txt strong { color:#7F77DD;font-weight:600; }

  /* submit */
  .cs-btn { width:100%;padding:15px;background:linear-gradient(135deg,#534AB7 0%,#7F77DD 100%);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;letter-spacing:.02em;position:relative;overflow:hidden;transition:transform .14s,box-shadow .14s,opacity .14s;box-shadow:0 4px 20px rgba(83,74,183,.45);font-family:'Sora',system-ui,sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:6px; }
  .cs-btn:hover:not(:disabled) { transform:translateY(-1px);box-shadow:0 8px 28px rgba(83,74,183,.55); }
  .cs-btn:active:not(:disabled) { transform:scale(.98); }
  .cs-btn:disabled { opacity:.55;cursor:not-allowed; }
  .cs-btn-shine { position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.15) 50%,transparent 60%);transform:translateX(-100%);transition:transform .45s; }
  .cs-btn:hover:not(:disabled) .cs-btn-shine { transform:translateX(100%); }

  .cs-spinner { width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:cs-spin .65s linear infinite; }

  /* footer */
  .cs-footer-text { text-align:center;font-size:14px;color:#3e3d5c;margin-top:20px; }
  .cs-footer-link { color:#7F77DD;font-weight:600;text-decoration:none;transition:color .15s; }
  .cs-footer-link:hover { color:#AFA9EC;text-decoration:underline; }

  /* success screen */
  .cs-success-icon-wrap { width:68px;height:68px;border-radius:50%;background:rgba(29,158,117,.15);border:1px solid rgba(29,158,117,.25);display:flex;align-items:center;justify-content:center;margin:0 auto 22px; }
  .cs-success-check { width:32px;height:32px;color:#1D9E75;animation:cs-check .5s cubic-bezier(.34,1.56,.64,1) both; }
  .cs-success-title { font-size:22px;font-weight:700;color:#eceaff;letter-spacing:-.4px;margin-bottom:8px;text-align:center; }
  .cs-success-sub { font-size:15px;color:#5a5880;text-align:center;line-height:1.65;margin-bottom:28px; }

  /* 2-col grid for some fields */
  .cs-two-col { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
  @media(max-width:480px) { .cs-two-col { grid-template-columns:1fr; } .cs-card { padding:28px 20px 24px; } }
`;

/* ─── role definitions ──────────────────────────────────────────────── */
const ROLES = [
  {
    value: 'student',
    label: 'Student',
    desc: 'Browse clubs, apply with your CV, register for events',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 2.955-1.01 5.674-2.68 7.81A11.95 11.95 0 0112 23a11.95 11.95 0 01-6.32-2.19A12.037 12.037 0 013 13c.59-.572 1.99-1.145 3.84-2.422L12 14z"/></svg>,
  },
  {
    value: 'club_manager',
    label: 'Club Manager',
    desc: 'Review student applications, manage members, post events',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-5.197-3.787M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a4 4 0 015.197-3.787M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    value: 'college',
    label: 'College',
    desc: 'Register your institution, create clubs, oversee all activity',
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>,
  },
];

/* ─── small icon helpers ─────────────────────────────────────────────── */
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

/* ─── reusable field ─────────────────────────────────────────────────── */
function Field({ label, hint, children }) {
  return (
    <div className="cs-field">
      <label className="cs-label">{label}</label>
      {children}
      {hint && <p className="cs-hint">{hint}</p>}
    </div>
  );
}

/* ─── main component ─────────────────────────────────────────────────── */
export default function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: '',
    domain: '', phone: '',
    // new college fields
    website: '', address: '', collegeType: '', regNumber: '',
    accreditation: '', university: '', yearEstablished: '',
  });
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const selectRole = (role) => { set('role', role); setStep(2); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password && form.password.length < 6) return setError('Password must be at least 6 characters.');
    if (form.role === 'college' && documents.length < 1) return setError('Please upload at least one verification document.');
    setLoading(true);
    try {
      if (form.role === 'college') {
        const fd = new FormData();
        Object.keys(form).forEach(k => fd.append(k, form[k]));
        for (let i = 0; i < documents.length; i++) fd.append('documents', documents[i]);
        await api.post('/colleges/register', fd);
      } else {
        await api.post('/auth/register', form);
      }
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedRole = ROLES.find(r => r.value === form.role);

  /* ── Success ── */
  if (success) return (
    <>
      <style>{STYLES}</style>
      <div className="cs-reg">
        <div className="cs-grid-bg" /><div className="cs-orb cs-orb-1" /><div className="cs-orb cs-orb-2" /><div className="cs-orb cs-orb-3" />
        <div className="cs-wrap" style={{ maxWidth: 420 }}>
          <div className="cs-brand">
            <div className="cs-brand-logo">
              <div className="cs-brand-icon"><svg viewBox="0 0 20 20" fill="none"><path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 2v12M3 6l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/></svg></div>
              <span className="cs-brand-name">Club<span>Sphere</span></span>
            </div>
          </div>
          <div className="cs-card" style={{ textAlign: 'center', padding: '44px 36px' }}>
            <div className="cs-success-icon-wrap">
              <svg className="cs-success-check" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
            </div>
            <p className="cs-success-title">{form.role === 'college' ? 'Application Submitted!' : 'Account Created!'}</p>
            <p className="cs-success-sub">
              {form.role === 'college'
                ? "Your college registration is under review by our admin team. You'll receive an email once approved — typically within 1–2 business days."
                : 'Your account is ready. Sign in to get started on ClubSphere.'}
            </p>
            <Link to="/login" className="cs-btn" style={{ display: 'flex', textDecoration: 'none' }}>
              <div className="cs-btn-shine" />
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  /* ── Step 1: Role selection ── */
  if (step === 1) return (
    <>
      <style>{STYLES}</style>
      <div className="cs-reg">
        <div className="cs-grid-bg" /><div className="cs-orb cs-orb-1" /><div className="cs-orb cs-orb-2" /><div className="cs-orb cs-orb-3" />
        <div className="cs-wrap">
          <div className="cs-brand">
            <div className="cs-brand-logo">
              <div className="cs-brand-icon"><svg viewBox="0 0 20 20" fill="none"><path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 2v12M3 6l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/></svg></div>
              <span className="cs-brand-name">Club<span>Sphere</span></span>
            </div>
            <p className="cs-brand-sub">Who are you joining as?</p>
          </div>
          <div className="cs-card">
            {ROLES.map(role => (
              <button key={role.value} className="cs-role-btn" onClick={() => selectRole(role.value)}>
                <div className="cs-role-icon">{role.icon}</div>
                <div style={{ flex: 1 }}>
                  <p className="cs-role-title">{role.label}</p>
                  <p className="cs-role-desc">{role.desc}</p>
                </div>
                <div className="cs-role-arrow">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </div>
              </button>
            ))}
            <p className="cs-footer-text" style={{ marginTop: 18 }}>
              Already have an account? <Link to="/login" className="cs-footer-link">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );

  /* ── Step 2: Registration form ── */
  return (
    <>
      <style>{STYLES}</style>
      <div className="cs-reg">
        <div className="cs-grid-bg" /><div className="cs-orb cs-orb-1" /><div className="cs-orb cs-orb-2" /><div className="cs-orb cs-orb-3" />
        <div className="cs-wrap">

          <div className="cs-brand">
            <div className="cs-brand-logo">
              <div className="cs-brand-icon"><svg viewBox="0 0 20 20" fill="none"><path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 2v12M3 6l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/></svg></div>
              <span className="cs-brand-name">Club<span>Sphere</span></span>
            </div>
          </div>

          <div className="cs-card">

            {/* header */}
            <div className="cs-form-header">
              <div className="cs-selected-role">
                <div className="cs-sel-icon">{selectedRole?.icon}</div>
                <div>
                  <p className="cs-sel-label">Registering as</p>
                  <p className="cs-sel-value">{selectedRole?.label}</p>
                </div>
              </div>
              <button className="cs-back-btn" onClick={() => { setStep(1); setError(''); }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                Change
              </button>
            </div>

            {/* error */}
            {error && (
              <div className="cs-error">
                <svg className="cs-error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span className="cs-error-text">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* ── BASIC INFO ── */}
              <p className="cs-section-label">Basic Information</p>

              <Field label={form.role === 'college' ? 'College Name' : 'Full Name'}>
                <div className="cs-input-wrap">
                  <span className="cs-input-icon"><Icon d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></span>
                  <input className="cs-input" type="text" required
                    placeholder={form.role === 'college' ? 'e.g. GNDEC Ludhiana' : 'Your full name'}
                    value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
              </Field>

              <Field label={form.role === 'college' ? 'Official Email' : 'Email Address'}
                hint={form.role === 'student' ? '📌 Use your college email — your institution is detected automatically' : null}>
                <div className="cs-input-wrap">
                  <span className="cs-input-icon"><Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6"/></span>
                  <input className="cs-input" type="email" required
                    placeholder={form.role === 'college' ? 'admin@yourcollege.ac.in' : form.role === 'student' ? 'yourname@college.ac.in' : 'you@example.com'}
                    value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
              </Field>

              {form.role !== 'college' && (
                <Field label="Password">
                  <div className="cs-input-wrap">
                    <span className="cs-input-icon"><Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></span>
                    <input className="cs-input" type="password" required minLength={6}
                      placeholder="Min 6 characters"
                      value={form.password} onChange={e => set('password', e.target.value)} />
                  </div>
                </Field>
              )}

              {/* ── COLLEGE-ONLY FIELDS ── */}
              {form.role === 'college' && (<>

                {/* Contact */}
                <p className="cs-section-label">Contact & Location</p>

                <div className="cs-two-col">
                  <Field label="Phone Number">
                    <div className="cs-input-wrap">
                      <span className="cs-input-icon"><Icon d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></span>
                      <input className="cs-input" type="tel" required placeholder="+91 98765 43210"
                        value={form.phone} onChange={e => set('phone', e.target.value)} />
                    </div>
                  </Field>

                  <Field label="Official Website URL">
                    <div className="cs-input-wrap">
                      <span className="cs-input-icon"><Icon d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 0c-1.66 2.84-2.55 5.84-2.55 9s.89 6.16 2.55 9M12 2c1.66 2.84 2.55 5.84 2.55 9s-.89 6.16-2.55 9M2 12h20"/></span>
                      <input className="cs-input" type="url" placeholder="https://yourcollege.ac.in"
                        value={form.website} onChange={e => set('website', e.target.value)} />
                    </div>
                  </Field>
                </div>

                <Field label="Full Address (Street, City, State, PIN)">
                  <div className="cs-input-wrap">
                    <span className="cs-input-icon-top"><Icon d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z"/></span>
                    <textarea className="cs-textarea" placeholder="e.g. GT Road, Gill, Ludhiana, Punjab — 141006"
                      value={form.address} onChange={e => set('address', e.target.value)} />
                  </div>
                </Field>

                {/* Email domain */}
                <Field label="College Email Domain"
                  hint="Students with this email domain will be automatically linked to your college">
                  <div className="cs-input-wrap">
                    <span className="cs-input-icon" style={{ color: '#3e3d5c', fontSize: 15 }}>@</span>
                    <input className="cs-input" type="text" required placeholder="gndec.ac.in"
                      value={form.domain} onChange={e => set('domain', e.target.value)} />
                  </div>
                </Field>

                {/* Institutional Details */}
                <p className="cs-section-label">Institutional Details</p>

                <div className="cs-two-col">
                  <Field label="College Type">
                    <div className="cs-select-wrap">
                      <span className="cs-input-icon"><Icon d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 11v4M12 11v4M16 11v4"/></span>
                      <select className="cs-select" required value={form.collegeType} onChange={e => set('collegeType', e.target.value)}>
                        <option value="">Select type</option>
                        <option value="government">Government</option>
                        <option value="private">Private</option>
                        <option value="autonomous">Autonomous</option>
                      </select>
                      <span className="cs-select-arrow"><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg></span>
                    </div>
                  </Field>

                  <Field label="Year of Establishment">
                    <div className="cs-input-wrap">
                      <span className="cs-input-icon"><Icon d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/></span>
                      <input className="cs-input" type="number" min="1800" max={new Date().getFullYear()}
                        placeholder="e.g. 1956"
                        value={form.yearEstablished} onChange={e => set('yearEstablished', e.target.value)} />
                    </div>
                  </Field>
                </div>

                <Field label="Official Registration Number" hint="Government or University-issued registration / approval number">
                  <div className="cs-input-wrap">
                    <span className="cs-input-icon"><Icon d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></span>
                    <input className="cs-input" type="text" placeholder="e.g. UGC/2019/GNDE/001"
                      value={form.regNumber} onChange={e => set('regNumber', e.target.value)} />
                  </div>
                </Field>

                <div className="cs-two-col">
                  <Field label="Accreditation" hint="e.g. NAAC A+, NBA, NIRF">
                    <div className="cs-input-wrap">
                      <span className="cs-input-icon"><Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></span>
                      <input className="cs-input" type="text" placeholder="e.g. NAAC A+"
                        value={form.accreditation} onChange={e => set('accreditation', e.target.value)} />
                    </div>
                  </Field>

                  <Field label="University Affiliation" hint="Leave blank if autonomous">
                    <div className="cs-input-wrap">
                      <span className="cs-input-icon"><Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></span>
                      <input className="cs-input" type="text" placeholder="e.g. PTU, IKG"
                        value={form.university} onChange={e => set('university', e.target.value)} />
                    </div>
                  </Field>
                </div>

                {/* Document upload */}
                <p className="cs-section-label">Verification Documents</p>

                <div className="cs-field">
                  <label className={`cs-upload-label ${documents.length > 0 ? 'cs-upload-active' : ''}`}>
                    <input type="file" multiple className="hidden" style={{ display: 'none' }}
                      onChange={e => setDocuments(e.target.files)} />
                    {documents.length > 0 ? (
                      <>
                        <svg className="cs-upload-icon" style={{ color: '#7F77DD' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                        <p className="cs-upload-txt">{documents.length} file{documents.length > 1 ? 's' : ''} selected</p>
                        <p className="cs-upload-sub">Click to change selection</p>
                      </>
                    ) : (
                      <>
                        <svg className="cs-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                        <p className="cs-upload-txt">Click to upload documents</p>
                        <p className="cs-upload-sub">NAAC certificate, UGC approval, affiliation letter, etc.</p>
                      </>
                    )}
                  </label>

                  {documents.length > 0 && (
                    <div className="cs-file-list">
                      {Array.from(documents).map((f, i) => (
                        <div key={i} className="cs-file-item">
                          <svg width="14" height="14" fill="none" stroke="#7F77DD" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                          <span className="cs-file-name">{f.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Review notice */}
                <div className="cs-notice">
                  <svg className="cs-notice-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
                  <div>
                    <p className="cs-notice-title">Manual review required</p>
                    <p className="cs-notice-body">College accounts are reviewed by our admin team before activation. You'll be notified by email — typically within 1–2 business days.</p>
                  </div>
                </div>

              </>)}

              <button type="submit" disabled={loading} className="cs-btn">
                <div className="cs-btn-shine" />
                {loading
                  ? <><div className="cs-spinner" /> Please wait…</>
                  : form.role === 'college' ? 'Submit for Review' : 'Create Account'}
              </button>
            </form>

            <p className="cs-footer-text">
              Already have an account? <Link to="/login" className="cs-footer-link">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}