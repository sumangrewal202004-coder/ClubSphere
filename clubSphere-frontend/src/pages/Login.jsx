import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/send-otp', { email });
      localStorage.setItem('otp_email', email);
      navigate('/verify-otp');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        .cs-login-root * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Sora', system-ui, sans-serif; }

        @keyframes cs-fadeUp   { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cs-fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes cs-orbA     { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(18px,-16px) scale(1.06);} }
        @keyframes cs-orbB     { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-14px,12px) scale(1.04);} }
        @keyframes cs-spin     { to { transform:rotate(360deg); } }
        @keyframes cs-shake    { 0%,100%{transform:translateX(0);} 20%{transform:translateX(-6px);} 40%{transform:translateX(6px);} 60%{transform:translateX(-4px);} 80%{transform:translateX(4px);} }
        @keyframes cs-pulse    { 0%,100%{opacity:.5;transform:scale(1);} 50%{opacity:.9;transform:scale(1.1);} }

        .cs-login-root {
          min-height: 100vh;
          background: #0d0b1a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          position: relative;
          overflow: hidden;
        }

        /* ambient orbs — darker, more vivid on dark bg */
        .cs-orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(72px);
          z-index: 0;
        }
        .cs-orb-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(83,74,183,0.45) 0%, transparent 70%);
          top: -140px; left: -140px;
          animation: cs-orbA 10s ease-in-out infinite;
        }
        .cs-orb-2 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(15,110,86,0.35) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation: cs-orbB 12s ease-in-out infinite;
        }
        .cs-orb-3 {
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(132,79,11,0.3) 0%, transparent 70%);
          top: 38%; right: 10%;
          animation: cs-orbA 14s ease-in-out 2s infinite reverse;
        }

        /* grid texture */
        .cs-grid-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(127,119,221,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127,119,221,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .cs-card-wrap {
          position: relative; z-index: 1;
          width: 100%; max-width: 440px;
          animation: cs-fadeUp 0.6s cubic-bezier(.22,1,.36,1) both;
        }

        /* brand header */
        .cs-brand {
          text-align: center;
          margin-bottom: 28px;
          animation: cs-fadeUp 0.5s ease 0.05s both;
        }
        .cs-brand-logo {
          display: inline-flex; align-items: center; gap: 10px;
          margin-bottom: 10px;
        }
        .cs-brand-icon {
          width: 42px; height: 42px; border-radius: 12px;
          background: linear-gradient(135deg, #534AB7 0%, #7F77DD 100%);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 20px rgba(83,74,183,0.5);
        }
        .cs-brand-icon svg { width: 22px; height: 22px; }
        .cs-brand-name {
          font-size: 27px; font-weight: 700; letter-spacing: -0.6px;
          color: #f0eeff;
        }
        .cs-brand-name span { color: #7F77DD; }
        .cs-brand-sub {
          font-size: 16px; color: #5a5880; font-weight: 400; letter-spacing: 0.01em;
        }

        /* card */
        .cs-card {
          background: rgba(20,17,40,0.8);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(127,119,221,0.18);
          border-radius: 22px;
          padding: 38px 38px 34px;
          box-shadow:
            0 0 0 1px rgba(127,119,221,0.06),
            0 8px 32px rgba(0,0,0,0.5),
            0 32px 64px rgba(0,0,0,0.35);
        }

        /* card inner title */
        .cs-card-title {
          font-size: 22px; font-weight: 600; color: #eceaff;
          letter-spacing: -0.4px; margin-bottom: 6px;
        }
        .cs-card-hint {
          font-size: 16px; color: #5a5880; margin-bottom: 28px; line-height: 1.5;
        }

        /* divider row */
        .cs-divider {
          display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
        }
        .cs-divider-line { flex: 1; height: 1px; background: rgba(127,119,221,0.15); }
        .cs-divider-text { font-size: 12px; color: #3e3d5c; font-weight: 500; letter-spacing: 0.07em; text-transform: uppercase; }

        /* error */
        .cs-error {
          display: flex; align-items: flex-start; gap: 10px;
          background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25);
          border-radius: 12px; padding: 12px 16px;
          margin-bottom: 20px;
          animation: cs-shake 0.4s ease, cs-fadeIn 0.25s ease;
        }
        .cs-error-icon { width: 17px; height: 17px; color: #f87171; flex-shrink: 0; margin-top: 1px; }
        .cs-error-text { font-size: 16px; color: #fca5a5; line-height: 1.5; }

        /* label */
        .cs-label {
          display: block; font-size: 16px; font-weight: 600;
          color: #4a4870; text-transform: uppercase; letter-spacing: 0.09em;
          margin-bottom: 8px;
        }

        /* input */
        .cs-input-wrap { position: relative; margin-bottom: 20px; }
        .cs-input-icon {
          position: absolute; left: 15px; top: 50%; transform: translateY(-50%);
          width: 17px; height: 17px; color: #3e3d5c; pointer-events: none;
        }
        .cs-input {
          width: 100%; padding: 14px 14px 14px 44px;
          border: 1.5px solid rgba(127,119,221,0.2);
          border-radius: 12px;
          font-size: 16px; color: #eceaff;
          background: rgba(255,255,255,0.04);
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          outline: none;
          font-family: 'Sora', system-ui, sans-serif;
        }
        .cs-input::placeholder { color: #2e2d4a; }
        .cs-input:focus {
          border-color: #7F77DD;
          background: rgba(127,119,221,0.07);
          box-shadow: 0 0 0 3px rgba(83,74,183,0.2);
        }
        .cs-input:hover:not(:focus) { border-color: rgba(127,119,221,0.35); }

        /* submit button */
        .cs-btn {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #534AB7 0%, #7F77DD 100%);
          color: #fff; border: none; border-radius: 12px;
          font-size: 16px; font-weight: 600;
          cursor: pointer; letter-spacing: 0.02em;
          position: relative; overflow: hidden;
          transition: transform 0.14s, box-shadow 0.14s, opacity 0.14s;
          box-shadow: 0 4px 20px rgba(83,74,183,0.45);
          font-family: 'Sora', system-ui, sans-serif;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .cs-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(83,74,183,0.55);
        }
        .cs-btn:active:not(:disabled) { transform: scale(0.98); }
        .cs-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .cs-btn-shine {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
          transform: translateX(-100%); transition: transform 0.45s;
        }
        .cs-btn:hover:not(:disabled) .cs-btn-shine { transform: translateX(100%); }

        /* spinner */
        .cs-spinner {
          width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: cs-spin 0.65s linear infinite;
        }

        /* footer link */
        .cs-footer-text {
          text-align: center; font-size: 16px; color: #3e3d5c; margin-top: 22px;
        }
        .cs-footer-link {
          color: #7F77DD; font-weight: 600; text-decoration: none;
          transition: color 0.15s;
        }
        .cs-footer-link:hover { color: #AFA9EC; text-decoration: underline; }

        /* info strip */
        .cs-info-strip {
          display: flex; align-items: center; gap: 10px;
          background: rgba(127,119,221,0.08);
          border: 1px solid rgba(127,119,221,0.12);
          border-radius: 10px;
          padding: 11px 15px; margin-top: 22px;
        }
        .cs-info-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #1D9E75; flex-shrink: 0;
          animation: cs-pulse 2.2s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(29,158,117,0.6);
        }
        .cs-info-txt { font-size: 16px; color: #4a4870; line-height: 1.5; }
        .cs-info-txt strong { color: #7F77DD; font-weight: 600; }
      `}</style>

      <div className="cs-login-root">
        <div className="cs-grid-bg" />
        <div className="cs-orb cs-orb-1" />
        <div className="cs-orb cs-orb-2" />
        <div className="cs-orb cs-orb-3" />

        <div className="cs-card-wrap">

          {/* brand */}
          <div className="cs-brand">
            <div className="cs-brand-logo">
              <div className="cs-brand-icon">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L3 6v8l7 4 7-4V6L10 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M10 2v12M3 6l7 4 7-4" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="cs-brand-name">Club<span>Sphere</span></span>
            </div>
            <p className="cs-brand-sub">Campus club management, reimagined</p>
          </div>

          {/* card */}
          <div className="cs-card">
            <p className="cs-card-title">Welcome back</p>
            <p className="cs-card-hint">Enter your email — we'll send you a one-time code</p>

            <div className="cs-divider">
              <div className="cs-divider-line" />
              <span className="cs-divider-text">OTP Login</span>
              <div className="cs-divider-line" />
            </div>

            {error && (
              <div className="cs-error">
                <svg className="cs-error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="cs-error-text">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label className="cs-label" htmlFor="cs-email">Email Address</label>
              <div className="cs-input-wrap">
                <svg className="cs-input-icon" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M1 5.5l7 4.5 7-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <input
                  id="cs-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="cs-input"
                  placeholder="you@college.ac.in"
                />
              </div>

              <button type="submit" disabled={loading} className="cs-btn">
                <div className="cs-btn-shine" />
                {loading ? (
                  <>
                    <div className="cs-spinner" />
                    Sending OTP…
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8h12M10 4l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Send OTP
                  </>
                )}
              </button>
            </form>

            <div className="cs-info-strip">
              <div className="cs-info-dot" />
              <p className="cs-info-txt">
                <strong>Passwordless &amp; secure.</strong> A 6-digit code will be sent to your registered email.
              </p>
            </div>

            <p className="cs-footer-text">
              Don't have an account?{' '}
              <Link to="/register" className="cs-footer-link">Create one</Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}