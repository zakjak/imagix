import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Post from './pages/Post'
import SearchIterms from './pages/SearchIterms'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile/:id' element={<Profile />} />
      <Route path='/post/:id' element={<Post />} />
      <Route path='/search' element={<SearchIterms />} />
    </Routes>
    </>
  )
}

export default App
