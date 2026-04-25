import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [redirectRole, setRedirectRole] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { loginFromOtp, user } = useAuth();

  const email = location.state?.email || localStorage.getItem('otp_email');

  useEffect(() => {
    if (!email) navigate('/login');
  }, [email, navigate]);

  useEffect(() => {
    if (!redirectRole || !user) return;

    switch (redirectRole) {
      case 'super_admin':   navigate('/admin/dashboard');    break;
      case 'student':       navigate('/student/clubs');      break;
      case 'club_manager':  navigate('/manager/dashboard');  break;
      case 'college':       navigate('/college/dashboard');  break;
      default:              navigate('/login');
    }
  }, [redirectRole, user, navigate]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/verify-otp', { email, otp });

      loginFromOtp(res.data.token, res.data.role);
      setRedirectRole(res.data.role);
      localStorage.removeItem('otp_email');

    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setResendSuccess(false);
    try {
      await api.post('/auth/send-otp', { email });
      setResendSuccess(true);
      setCountdown(60);
      setOtp('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Club<span className="text-indigo-600">Sphere</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Check your email for the OTP</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 mb-6">
            <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-indigo-700">
              OTP sent to <span className="font-semibold">{email}</span>
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {resendSuccess && (
            <div className="mb-5 p-3 bg-green-50 border border-green-100 text-green-700 text-sm rounded-xl flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              New OTP sent successfully!
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Enter 6-digit OTP
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center
                           text-2xl font-bold tracking-[0.5em] text-gray-800
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder:text-gray-200 placeholder:text-base placeholder:tracking-normal transition"
                placeholder="······"
              />
              <p className="text-xs text-gray-400 mt-1.5 text-center">OTP expires in 5 minutes</p>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm
                         hover:bg-indigo-700 active:scale-[0.99] transition-all
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          <div className="mt-5 text-center">
            {countdown > 0 ? (
              <p className="text-sm text-gray-400">
                Resend OTP in <span className="text-gray-600 font-medium">{countdown}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {resending ? 'Sending...' : 'Resend OTP'}
              </button>
            )}
          </div>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-gray-400 hover:text-gray-600 transition">
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}