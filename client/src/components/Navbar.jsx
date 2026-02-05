import React from 'react'
import {assets} from "../assets/assets"
const Navbar = () => {
  return (
    <div>
      <img src={assets.logo} alt="Logo" className='w-22 sm:w-32' />
    </div>
  )
}

export default Navbar
