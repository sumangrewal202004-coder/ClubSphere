// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios';

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const role  = localStorage.getItem('role');
//     const availableRoles = JSON.parse(localStorage.getItem('availableRoles') || '[]');
//     const sessionRole = localStorage.getItem('sessionRole');
//     if (token && role) setUser({ token, role, availableRoles, sessionRole: sessionRole || role });
//     setLoading(false);
//   }, []);

//   const loginFromOtp = (token, role, availableRoles = [role]) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', role);
//     localStorage.setItem('availableRoles', JSON.stringify(availableRoles));
//     localStorage.setItem('sessionRole', role);
//     setUser({ token, role, availableRoles, sessionRole: role });
//   };

//   const switchSessionRole = (sessionRole) => {
//     localStorage.setItem('sessionRole', sessionRole);
//     setUser(u => ({ ...u, sessionRole }));
//   };

//   const login = async (email, password) => {
//     const res = await api.post('/auth/login', { email, password });
//     localStorage.setItem('token', res.data.token);
//     localStorage.setItem('role', res.data.role);
//     setUser({ token: res.data.token, role: res.data.role });
//     if (res.data.role === 'college')           navigate('/college/dashboard');
//     else if (res.data.role === 'club_manager') navigate('/manager/dashboard');
//     else if (res.data.role === 'super_admin')  navigate('/admin/dashboard');
//     else navigate('/student/clubs');
//   };

//   const register = async (data) => {
//     await api.post('/auth/register', data);
//     navigate('/login');
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('availableRoles');
//     localStorage.removeItem('sessionRole');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loginFromOtp, switchSessionRole, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
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
    const role  = localStorage.getItem('role');
    const availableRoles = JSON.parse(localStorage.getItem('availableRoles') || '[]');
    const sessionRole = localStorage.getItem('sessionRole');
    if (token && role) setUser({ token, role, availableRoles, sessionRole: sessionRole || role });
    setLoading(false);
  }, []);

  const loginFromOtp = (token, role, availableRoles = [role]) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('availableRoles', JSON.stringify(availableRoles));
    localStorage.setItem('sessionRole', role);
    setUser({ token, role, availableRoles, sessionRole: role });
  };

  const switchSessionRole = (sessionRole) => {
    localStorage.setItem('sessionRole', sessionRole);
    setUser(u => ({ ...u, sessionRole }));
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);
    setUser({ token: res.data.token, role: res.data.role });
    if (res.data.role === 'college')           navigate('/college/dashboard');
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
    localStorage.removeItem('availableRoles');
    localStorage.removeItem('sessionRole');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loginFromOtp, switchSessionRole, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);