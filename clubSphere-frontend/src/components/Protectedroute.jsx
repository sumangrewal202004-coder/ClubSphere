import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  const storedToken = localStorage.getItem('token');
  const storedRole  = localStorage.getItem('role');
  if (!user && storedToken && storedRole) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  const effectiveRole = user.sessionRole || user.role;

  if (roles && !roles.includes(effectiveRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}