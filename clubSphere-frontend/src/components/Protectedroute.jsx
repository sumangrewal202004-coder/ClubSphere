// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function ProtectedRoute({ children, roles }) {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" replace />;
//   if (roles && !roles.includes(user.role)) return <Navigate to="/login" replace />;
//   return children;
// }

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  console.log('ProtectedRoute check:', { user, loading, roles });

  if (loading) return <div>Loading...</div>;
  if (!user) {
    console.log('No user → redirecting to /login');
    return <Navigate to="/login" replace />;
  }
  if (roles && !roles.includes(user.role)) {
    console.log(`Role mismatch: user.role="${user.role}", required=${JSON.stringify(roles)}`);
    return <Navigate to="/login" replace />;
  }
  return children;
}