import { Outlet }from 'react-router-dom'
import Navbar from './Navbar'

function NavComponent() {

  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default NavComponent