import { Outlet }from 'react-router-dom'
import Navbar from './Navbar'

function NavComponent() {

  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}

export default NavComponent