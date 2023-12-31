import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App