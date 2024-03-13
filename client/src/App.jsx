import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavComponent from './components/NavComponent'
import Profile from './pages/Profile'
import Post from './pages/Post'
import FollowPage from './pages/FollowPage'
import SearchIterms from './pages/SearchIterms'

function App() {

  return (
    <Routes>
      <Route path='/' element={<NavComponent />}>
          <Route index element={<Home />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/search' element={<SearchIterms />} />
      </Route>
    </Routes>
  )
}

export default App
