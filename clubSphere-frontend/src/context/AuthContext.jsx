import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { token, role }
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Restore session from localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role  = localStorage.getItem('role');
    if (token && role) setUser({ token, role });
    setLoading(false);
  }, []);

  // ── Called by VerifyOTP after a successful OTP login ──
  const loginFromOtp = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setUser({ token, role }); // ← this is what ProtectedRoute reads
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);
    setUser({ token: res.data.token, role: res.data.role });
    if (res.data.role === 'college')      navigate('/college/dashboard');
    else if (res.data.role === 'club_manager') navigate('/manager/dashboard');
    else if (res.data.role === 'super_admin')  navigate('/admin/dashboard');
    else navigate('/student/clubs');
  };

  const register = async (data) => {
    await api.post('/auth/register', data);
    navigate('/login');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loginFromOtp, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);