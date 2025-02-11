import React from 'react'
import Template from '../components/core/Auth/Template'
import loginimg from '../assets/Images/login.webp'

const Login = () => {
  return (
    <Template 
    title="Welcome back"
    desc1="Build Skills for Today, Tomorrow, and Beyond."
    desc2=" Education to future-proof your career."
    image={loginimg}
    formtype="login"
    />
  )
}

export default Login