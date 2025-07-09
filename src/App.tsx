import {Route,Routes} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Login from "./auth/Login";
import Profile from "./pages/profile";
import ForgotPassword from './pages/ForgotPassword'
import Register from './pages/Register'

function App () {

  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/register" element={<Register/>} />
    </Routes>
  )
}

export default App