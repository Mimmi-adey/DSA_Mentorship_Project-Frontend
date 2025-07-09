import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useShopContext } from '../context'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'


function Login() {
    const navigate = useNavigate 

    interface LoginResponse {
        token:string,
        user:{
            id:string,
            name?:string,
            email:string,
            role:string
        }
    }

    const context = useShopContext()
    const backendUrl=context?.backendUrl || ""
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
 
    const submit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setIsLoading(true)
        setError("")
        try {
            const response = await axios.post<LoginResponse>(`${backendUrl}/api/auth/login`,{
                email,password
            })
            if (response.status === 200) {
                navigate("/")
            }
            // if (response.data.user.role === "admin") {
            //     navigate("/admin")
            // }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    }
  return (
    <div className='min-h-screen bg-gradient-to-br from-green-400 via-yellow-200 to-blue-300 animate-gradient-x bg-[length:300%_300% flex items-center w-full px-4'>
    
    <div className='mt-10 justify-self-center mx-auto'>
        <h1 className='justify-self-center justify-center font-bold text-5xl text-green-700'>WELCOME ONBOARD, MENTOR MATCH </h1>

    <div className='mt-10 justify-self-center mx-auto'>
        <h1 className='justify-self-center justify-center font-bold text-2-3xl'>Mentorship Login Page</h1>
        <form className='max-w-md mx-auto mt-10 p-8 bg-white- rounded-xl shadow-lg' onSubmit={submit}>
            <h1 className='text-xl font-bold text-center mb-3'>Login To Your Account</h1>
            <div className='mb-4'>
                <label htmlFor='email' className='block text-green-600 mb-3'>Email Address</label>
                <input value={email} 
                onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Your Email Address' required 
                className='w-full px-9 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb 5'>
                </input>


            <div className='mt-5'>
                <label htmlFor='password' className='block text-green-600 mb-3'>Password</label>
                <input value={password} 
                onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Your Password' required 
                className='w-full px-9 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'>
                </input>

            </div>
                
            </div>
            <button type='submit' className='mt-6 ml-1 text-xl bg-green-500 p-2 w-full rounded-2xl focus:outline-none hover:bg-green-900'>Login</button>

            <div className='text-center mt-6 mb-4 text-l'>
                Don’t have an account?{' '}
                <Link to="/register" className='text-green-600 hover:underline'>Create Here</Link>
            </div>
            <div className='text-right mb-6'>
                    <Link to="/ForgotPassword" className='text-l text-green-600 hover:underline'>
                        Forgot Password?
                    </Link>
                </div>

        </form>
      
    </div>
    </div>
    </div>
  )
}

export default Login
