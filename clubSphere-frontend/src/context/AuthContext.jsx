import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) setUser({ token, role });
    setLoading(false);
  }, []);

  // Call this after OTP verify to update context immediately
  const loginUser = (token, role) => {
    console.log('AuthContext: loginUser called with role:', role);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setUser({ token, role });
    console.log('AuthContext: user state updated to:', { token, role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);