import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavComponent from './components/NavComponent'

function App() {

  return (
    <Routes>
      <Route path='/' element={<NavComponent />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
