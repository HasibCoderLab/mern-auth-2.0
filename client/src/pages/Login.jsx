import React, { useState } from 'react'
import { assets } from '../assets/assets';

const Login = () => {
 const [state,setState] = useState('sign up');
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400'>
      <img 
      className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
      src={assets.logo1} alt="" />
      <div className=" bg-slate-900 p-10 rounded-lg text-indigo-300 w-full sm:w-96 text-sm">
        <h2>{state === 'Sign Up' ? 'Create Account'  : 'Login'}</h2>
        <p>{state === 'Sign Up' ? 'Create your account'  : 'Login to youe account'}</p>
        {/*  Form Section */}
       <div className="">
         <form action=""></form>
       </div>
      </div>
    </div>
  )
}

export default Login
