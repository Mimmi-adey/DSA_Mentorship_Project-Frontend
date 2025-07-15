import {Route,Routes} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Login from "./auth/Login";
import Profile from "./pages/profile";
import ForgotPassword from './pages/ForgotPassword'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import AdminRoute from './AdminRoute'
import AdminUsers from './pages/AdminUsers'

function App () {

  return (
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/admin/dashboard" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>} />
      <Route path="/admin/users" element={
        <AdminRoute>
          <AdminUsers />
        </AdminRoute>} />

    </Routes>
  )
}

export default App