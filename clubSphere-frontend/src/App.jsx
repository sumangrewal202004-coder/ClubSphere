import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Protectedroute';
import Navbar from './components/Navbar';
import './App.css';
// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Notifications from './pages/Notifications';

// College
import CollegeDashboard from './pages/college/Collegedashboard';
import CreateClub from './pages/college/Createclub';

// Manager
import ManagerDashboard from './pages/manager/Managerdashboard';
import ApplicationsReview from './pages/manager/Applicationsreview';
import CreateEvent from './pages/manager/Createevent';

// Student
import BrowseClubs from './pages/student/Browseclubs';
import MyApplications from './pages/student/Myapplications';
import StudentEvents from './pages/student/Studentevents';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Shared - any logged in user */}
            <Route path="/notifications" element={
              <ProtectedRoute roles={['college', 'club_manager', 'student']}>
                <Notifications />
              </ProtectedRoute>
            } />

            {/* College */}
            <Route path="/college/dashboard" element={
              <ProtectedRoute roles={['college']}>
                <CollegeDashboard />
              </ProtectedRoute>
            } />
            <Route path="/college/create-club" element={
              <ProtectedRoute roles={['college']}>
                <CreateClub />
              </ProtectedRoute>
            } />

            {/* Manager */}
            <Route path="/manager/dashboard" element={
              <ProtectedRoute roles={['club_manager']}>
                <ManagerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/manager/clubs/:clubId/applications" element={
              <ProtectedRoute roles={['club_manager']}>
                <ApplicationsReview />
              </ProtectedRoute>
            } />
            <Route path="/manager/events/create" element={
              <ProtectedRoute roles={['club_manager']}>
                <CreateEvent />
              </ProtectedRoute>
            } />

            {/* Student */}
            <Route path="/student/clubs" element={
              <ProtectedRoute roles={['student']}>
                <BrowseClubs />
              </ProtectedRoute>
            } />
            <Route path="/student/applications" element={
              <ProtectedRoute roles={['student']}>
                <MyApplications />
              </ProtectedRoute>
            } />
            <Route path="/student/events" element={
              <ProtectedRoute roles={['student']}>
                <StudentEvents />
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}