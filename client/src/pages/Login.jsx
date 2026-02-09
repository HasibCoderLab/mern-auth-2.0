import React, { useState } from 'react'
import { assets } from '../assets/assets';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400'>
      <img
        className='absolute left-5 sm:left-20 top-5 w-12 sm:w-32 cursor-pointer'
        src={assets.logo1} alt="" />
      <div className=" bg-slate-900 p-10 rounded-lg text-indigo-300 w-full sm:w-96 text-sm">
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>

        <p className='text-center text-sm mb-6'>{state === 'Sign Up' ? 'Create your account' : 'Login to your account'}</p>
        {/*  Form Section */}

        <form action="">
          {/* Name */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.person_icon} alt="" />
            <input
              className='bg-transparent outline-none'
              type="text" placeholder='Full Name' required />
          </div>
          {/* Email */}
          <div
            className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
                        rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="email-icon" />
            <input className='bg-transparent outline-none' type="email"
              placeholder="Email ID" required />
          </div>
          {/* Password */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="email-icon" />
            <input
              className='bg-transparent outline-none'
              type="password" placeholder='Password' required />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
