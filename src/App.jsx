import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { OpenRoute } from './components/core/Auth/openRoute'

import Home from "./pages/Home"
import Login from './pages/Login'
import SignUp from "./pages/Signup"
import Navbar from './components/common/Navbar'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'

function App() {

  return (
    <div className='w-screen min-h-screen flex flex-col bg-richblack-900'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route
          path='/login'
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          } />

        <Route
          path='/signup'
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          } />

        <Route 
        path='/forgot-password' 
        element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        } />
        
        <Route 
        path='/update-password/:id' 
        element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />

        <Route 
        path='/verify-email' 
        element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />

        <Route 
        path='/about' 
        element={
            <About />
        } />
        
      </Routes>
    </div>
  )
}

export default App