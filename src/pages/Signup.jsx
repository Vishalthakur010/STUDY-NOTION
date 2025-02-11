import React from 'react'
import Template from '../components/core/Auth/Template'
import signupimg from '../assets/Images/signup.webp'

const SignUp = () => {
  return (
        <Template 
        title="Join the millions learning to code with studyNotion for free"
        desc1="Build skills for today, Tomorrow, and beyond."
        desc2=" Education to future-proof your career."
        image={signupimg}
        formtype="signup"
        />
  )
}

export default SignUp