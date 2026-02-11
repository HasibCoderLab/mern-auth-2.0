import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router';
import { assets } from '../assets/assets';
import { AppContext } from '../components/context/AppContext';


const Login = () => {

  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, } = useContext(AppContext);

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ======= Function ==========

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
axi
    } catch (error) {

    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400'>
      <img
        onClick={() => navigate('/')}
        className='absolute left-5 sm:left-20 top-0  w-12 sm:w-32 cursor-pointer'
        src={assets.logo1} alt=""
      />

      <div className=" bg-slate-900 p-10 rounded-lg text-indigo-300 w-full sm:w-96 text-sm">
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>{
          state === 'Sign Up' ? 'Create Account' : 'Login'
        }</h2>

        <p className='text-center text-sm mb-6'>{state === 'Sign Up' ? 'Create your account' : 'Login to your account'}</p>
        {/*  Form Section */}

        <form onSubmit={onSubmitHandler}>

          {/* Name */}

          {state === 'Sign Up' && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                className='bg-transparent outline-none'
                type="text" placeholder='Full Name' required />
            </div>
          )}


          {/* Email */}
          <div
            className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 
                        rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="email-icon" />
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              className='bg-transparent outline-none' type="email"
              placeholder="Email ID" required />
          </div>
          {/* Password */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="email-icon" />
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              className='bg-transparent outline-none'
              type="password" placeholder='Password' required />
          </div>

          <p onClick={() => navigate('/reset-password')}
            className='mb-4 text-indigo-500 cursor-pointer'>Forget Password ?
          </p>
          <button className='w-full py-2.5 rounded-full bg-linear-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer'>{state}</button>

          {/*  Condition For state */}

          {
            state === 'Sign Up' ?
              (<p className="text-gray-400 text-center text-xs mt-4">Already have an accunt? {``}
                <span onClick={() => setState("Login")} className="text-blue-400 cursor-pointer">Login here</span> </p>)
              :
              (<p className="text-gray-400 text-center text-xs mt-4">Don't have an accunt? {``}
                <span onClick={() => setState('Sign Up')} className="text-blue-400 cursor-pointer underline">Sign up</span> </p>)
          }




        </form>
      </div>
    </div>
  )
}

export default Login 
