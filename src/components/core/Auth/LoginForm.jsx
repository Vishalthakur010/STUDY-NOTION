import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const LoginForm = () => {

        const [showPassword, setShowPassword] = useState(false)

        const [formData, setFormData] = useState({
                email: "",
                password: ""
        })

        const changeHandler = (event) => {
                setFormData( (prevData) => (
                        {
                                ...prevData,
                                [event.target.name]: event.target.value
                        }
                ))
        }

        function submitHandler(event){
                event.preventDefault();
                console.log(formData)
        }

        return (
                <form onSubmit={submitHandler} 
                className='flex flex-col gap-5 mt-10'>

                        {/* email */}
                        <label>
                                <p className='text-richblack-25 text-base mb-2'>
                                        Email Address <sup className='text-pink-200'>*</sup>
                                </p>
                                <input
                                        required
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={changeHandler}
                                        placeholder='Enter email address'
                                        className='w-full text-richblack-5 bg-richblack-800 p-3 rounded-lg shadow-sm shadow-richblack-100'
                                />
                        </label>

                        {/* password */}
                        <label className='relative'>
                                <p className='text-richblack-25 text-base mb-2'>
                                        Password <sup className='text-pink-200'>*</sup>
                                </p>
                                <input
                                        required
                                        type={showPassword ? ('text') : ('password')}
                                        name='password'
                                        value={formData.password}
                                        onChange={changeHandler}
                                        placeholder='Enter Password'
                                        className='w-full text-richblack-5 bg-richblack-800 p-3 rounded-lg shadow-sm shadow-richblack-100'
                                />

                                {/* Eye symbol */}
                                <span
                                        className='absolute top-11 right-3 cursor-pointer'
                                        onClick={() => setShowPassword((prev) => !prev)}>
                                        {showPassword ?
                                                (<AiOutlineEyeInvisible fontSize={24} className="fill-richblack-50" />) :
                                                (<AiOutlineEye fontSize={24} className="fill-richblack-50" />)
                                        }
                                </span>

                                <Link to='/forgot-password'>
                                        <p className='text-blue-100 text-sm mt-1 text-right'>
                                                Forgot Password
                                        </p>
                                </Link>
                        </label>

                        {/* Button */}
                        <button className='mt-4 font-semibold bg-yellow-50 py-3  rounded-lg shadow-sm hover:bg-yellow-100'>
                                Sign in
                        </button>

                </form>
        )
}

export default LoginForm