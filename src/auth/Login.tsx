import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useShopContext } from '../context'


function Login() {
  const navigate = useNavigate();

  interface LoginResponse {
    token: string;
    user: {
      id: string;
      name?: string;
      email: string;
      role: string;
    };
  }

  const context = useShopContext();
  const backendUrl = context?.backendUrl || '';
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [, setIsLoading] = useState<boolean>(false);
  const [, setError] = useState<string>('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  console.log("Backend URL:", backendUrl);

  try {
    const response = await axios.post<LoginResponse>(`${backendUrl}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    const user = response.data.user;
    const token = response.data.token;

    localStorage.setItem("role", user.role);
    localStorage.setItem("token", token);

    // ✅ Fetch user profile to check if it's complete
    const profileRes = await axios.get(`${backendUrl}/api/profile`, {
      withCredentials: true
    });

    const profile = profileRes.data;
    const isProfileComplete =
      profile.bio && profile.skills?.length && profile.goals;

    // ✅ Navigate based on role and profile completeness
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user.role === "mentor") {
      if (!isProfileComplete) {
        navigate('/complete-profile');
      } else {
        navigate("/mentor/dashboard");
      }
    } else {
      navigate("/dashboard");
    }
  } catch (error) {
    console.error("Login Error:", error);
    setError("Login failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-400 via-yellow-200 to-blue-300 animate-gradient-x bg-[length:300%_300%] flex items-center w-full px-4'>
      <div className='mt-10 justify-self-center mx-auto'>
        <h1 className='text-5xl font-bold text-green-700 text-center'>WELCOME BACK, MENTOR MATCH</h1>

        <div className='mt-10'>
          <h2 className='text-2xl font-bold mb-6 text-green-700 text-center'>Mentorship Login Form</h2>
          
          <form onSubmit={submit} className='max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg'>
            <h2 className='text-2xl font-bold mb-6 text-green-700 text-center'>Login To Your Account</h2>

            <div className='mb-4'>
              <label htmlFor='email' className='block text-green-600 mb-3'>Email Address</label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='Your Email Address'
                required
                className='w-full px-9 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-5'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='password' className='block text-green-600 mb-3'>Password</label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Your Password'
                required
                className='w-full px-9 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Login
          </button>

            <div className='mt-4 text-lg text-center text-gray-600'>
              Don’t have an account?{' '}
              <Link to="/register" className='text-green-600 hover:underline'>Create Here</Link>
            </div>

            <div className='text-right mt-6'>
              <Link to="/ForgotPassword" className='text-green-600 hover:underline'>
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;