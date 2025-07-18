import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShopContext } from "../context";
import type { FormEvent } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  name: "", 
  email: "", 
  password: "", 
  role: "", 
  agree: false
});

  const [error, setError] = useState('');

  const { backendUrl } = useShopContext()!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch(`${backendUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    localStorage.setItem("token", data.token);  
    localStorage.setItem("userId", data.user._id);
    navigate("/complete-profile");

  } catch (err: any) {
    console.error(err.message);
    setError(err.message || "Something went wrong");
  }};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-yellow-200 to-blue-300 animate-gradient-x bg-[length:300%_300%] flex flex-col items-center justify-center px-4">

      <div className='mt-10 justify-self-center mx-auto'>
        <h1 className='text-5xl font-bold text-green-700 text-center'>WELCOME ONBOARD, MENTOR MATCH</h1>

        <div className='mt-10'>
          <h2 className='text-2xl font-bold mb-6 text-green-700 text-center'>Mentorship Registration Form</h2>

          <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg'>
            <h2 className='text-2xl font-bold mb-6 text-green-700 text-center'>Create Your Account</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-green-600 mb-3">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email Address"
                  className="w-full px-9 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-5"
                />
              </div>

              <div>
                <label className="block text-green-600 mb-3">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Your Password"
                  className="w-full px-9 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-5"
                />
              </div>

              <div>
                <label className="block text-green-600 mb-3">Register as</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-9 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-5"
                >
                  <option className="block text-green-600 mb-3" value="Mentee">Mentee</option>
                  <option className="block text-green-600 mb-3" value="Mentor">Mentor</option>
                </select>
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                Register
              </button>

              <p className="mt-4 text-lg text-center text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-green-600 hover:underline">
                  Login here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}