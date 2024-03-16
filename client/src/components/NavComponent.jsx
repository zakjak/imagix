import { Outlet }from 'react-router-dom'
import Navbar from './Navbar'

function NavComponent() {

  return (
    <div className='w-full h-screen'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default NavComponent