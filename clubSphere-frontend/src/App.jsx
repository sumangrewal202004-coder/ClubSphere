
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import './App.css';

// Pages
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import Notifications from './pages/Notifications';
import VerifyOTP from './pages/VerifyOTP';
import ChooseRole from './pages/ChooseRole';
import AdminDashboard from './pages/admin/AdminDashboard';


// College
import CollegeDashboard from './pages/college/CollegeDashboard';
import CreateClub from './pages/college/CreateClub';

// Manager
import ManagerDashboard from './pages/manager/ManagerDashboard';
import ApplicationsReview from './pages/manager/ApplicationsReview';
import CreateEvent from './pages/manager/CreateEvent';
import ClubRegistrations from './pages/manager/ClubRegistrations';

// Student
import BrowseClubs from './pages/student/BrowseClubs';
import MyApplications from './pages/student/MyApplications';
import StudentEvents from './pages/student/StudentEvents';

// 🔥 Wrapper to control Navbar
function Layout() {
  const location = useLocation();

  const hideNavbarRoutes = ['/login', '/register', '/verify-otp', '/choose-role'];

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/choose-role" element={<ChooseRole />} />
<Route path="/manager/clubs/:clubId/registrations" element={<ClubRegistrations />} />
        {/* Shared */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute roles={['super_admin', 'college', 'club_manager', 'student']}>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* College */}
        <Route
          path="/college/dashboard"
          element={
            <ProtectedRoute roles={['college']}>
              <CollegeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college/create-club"
          element={
            <ProtectedRoute roles={['college']}>
              <CreateClub />
            </ProtectedRoute>
          }
        />

        {/* Manager */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute roles={['club_manager']}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/clubs/:clubId/applications"
          element={
            <ProtectedRoute roles={['club_manager']}>
              <ApplicationsReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/events/create"
          element={
            <ProtectedRoute roles={['club_manager']}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        {/* Student */}
        <Route
          path="/student/clubs"
          element={
            <ProtectedRoute roles={['student']}>
              <BrowseClubs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/applications"
          element={
            <ProtectedRoute roles={['student']}>
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/events"
          element={
            <ProtectedRoute roles={['student']}>
              <StudentEvents />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={['super_admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}