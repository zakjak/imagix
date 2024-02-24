import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavComponent from './components/NavComponent'
import Profile from './pages/Profile'

function App() {

  return (
    <Routes>
      <Route path='/' element={<NavComponent />}>
        <Route index element={<Home />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
