import React from 'react'
import { Outlet } from 'react-router-dom' 
import NavComponent from './NavComponent'

function Navbar() {
  return (
    <div className=''>
        <NavComponent />
        <Outlet />
    </div>
  )
}

export default Navbar