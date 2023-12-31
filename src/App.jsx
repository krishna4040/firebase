import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Navbar from './components/miscellaneous/Navbar'
import { useSelector } from 'react-redux'

const App = () => {
  const { user } = useSelector(state => state.user);
  return (
    <div>
      {user && <Navbar />}
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </div>
  )
}

export default App