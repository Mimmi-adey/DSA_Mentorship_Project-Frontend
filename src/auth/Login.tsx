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
    setError('');

    console.log("Sending to backend:", { email, password });

    try {
      const response = await axios.post<LoginResponse>(`${backendUrl}/api/auth/login`, {
        email,
        password,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const user = response.data.user;
        console.log("Login Response:", response.data);
        localStorage.setItem('role', user.role);
        localStorage.setItem('token', response.data.token);

        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error(error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-400 via-yellow-200 to-blue-300 animate-gradient-x bg-[length:300%_300%] flex items-center w-full px-4'>
      <div className='mt-10 justify-self-center mx-auto'>
        <h1 className='text-5xl font-bold text-green-700 text-center'>WELCOME ONBOARD, MENTOR MATCH</h1>

        <div className='mt-10'>
          <h1 className='text-center font-bold text-2xl'>Mentorship Login Page</h1>
          <form onSubmit={submit} className='max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg'>
            <h1 className='text-xl font-bold text-center mb-3'>Login To Your Account</h1>

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
              type='submit'
              className='mt-6 text-xl bg-green-500 p-2 w-full rounded-2xl focus:outline-none hover:bg-green-900'
            >
              Login
            </button>

            <div className='text-center mt-6 text-lg'>
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