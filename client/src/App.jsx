import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Post from './pages/Post'
import SearchIterms from './pages/SearchIterms'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='h-screen w-full'>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile/:id' element={<Profile />} />
      <Route path='/post/:id' element={<Post />} />
      <Route path='/search' element={<SearchIterms />} />
    </Routes>
    </div>
  )
}

export default App
