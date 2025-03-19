import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { OpenRoute } from "./components/core/Auth/OpenRoute";


import Home from "./pages/Home"
import Login from './pages/Login'
import SignUp from "./pages/Signup"
import Navbar from './components/common/Navbar'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
import ContactUs from './pages/ContactUs';
import { MyProfile } from './components/core/Dashboard/MyProfile';
import { Dashboard } from './pages/Dashboard';
import { PrivateRoute } from './components/core/Auth/PrivateRoute';
import Error from './pages/Error'
import Settings from './components/core/Dashboard/Settings';
import { EnrolledCourses } from './components/core/Dashboard/EnrolledCourses';
import { Cart } from "./components/core/Dashboard/Cart/index"
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';

function App() {

  const { user } = useSelector((state) => state.profile)

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
            <OpenRoute>
              <About />
            </OpenRoute>
          } />

        <Route
          path='/contact'
          element={
            <OpenRoute>
              <ContactUs />
            </OpenRoute>
          } />

        <Route path='*' element={<Error />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path='/dashboard/my-profile' element={<MyProfile />} />
          <Route path='/dashboard/settings' element={<Settings />} />

          {
          user?.accountType == ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses />} />
              <Route path='/dashboard/cart' element={<Cart />} />
            </>
          )
        }

        </Route>

        

      </Routes>
    </div>
  )
}

export default App