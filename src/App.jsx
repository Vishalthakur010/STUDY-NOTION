import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import SignUp from "./pages/Signup"
import Navbar from './components/common/Navbar'

function App() {

  return (
    <div className='w-screen min-h-screen flex flex-col bg-richblack-900'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
  )
}

export default App