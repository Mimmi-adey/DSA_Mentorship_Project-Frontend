import { Routes, Route } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Login from "./auth/Login";
import Profile from "./pages/profile";
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './AdminRoute';
import AdminUsers from "./admin/Users";
import MentorRoute from './MentorRoute';
import MentorLayout from './pages/mentor/MentorLayout';
import MentorDashboard from './pages/mentor/MentorDashboard';
import MentorAvailability from './pages/mentor/MentorAvailability';
import MentorRequests from './pages/mentor/MentorRequests';
import MentorSessions from './pages/mentor/MentorSessions';
import MentorProfile from './pages/mentor/MentorProfile';
import LandingPage from './pages/LandingPage';
import CompleteProfile from "./pages/CompleteProfile";
import GiveFeedbackPage from "./pages/GiveFeedbackPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />

        {/* ✅ Admin Routes */}
        <Route path="/admin/dashboard" element={
          <AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={
          <AdminRoute><AdminUsers /></AdminRoute>} />

        {/* ✅ Mentor Routes with layout wrapper */}
        <Route path="/mentor" element={<MentorRoute><MentorLayout /></MentorRoute>}>
          <Route path="dashboard" element={<MentorDashboard />} />
          <Route path="availability" element={<MentorAvailability />} />
          <Route path="requests" element={<MentorRequests />} />
          <Route path="sessions" element={<MentorSessions />} />
          <Route path="profile" element={<MentorProfile />} />
        </Route>
            <Route path="/give-feedback/:sessionId" element={
              <GiveFeedbackPage />} />
      </Routes>

      {/* ✅ Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

<Route path="*" element={<div>404 - Page Not Found</div>} />

export default App;