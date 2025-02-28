import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CTAButton from '../components/core/HomePage/Button'
import { FaArrowLeft } from 'react-icons/fa';
import { getresetPasswordToken } from '../services/operations/authAPI';
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {
    const loading = useSelector((state) => state.auth.loading)
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(getresetPasswordToken(email, setEmailSent))
    }

    return (
        <div className='h-[90vh] w-screen flex justify-center items-center'>
            {
                loading ?
                    (
                        <div className='spinner'></div>
                    ) :
                    (
                        <div className='flex flex-col gap-4 w-[100%] md:w-[500px] p-7'>
                            <h1 className='text-richblack-25 text-3xl font-semibold'>
                                {
                                    emailSent ? "Check Email" : "Reset your Password"
                                }
                            </h1>

                            <p className='text-richblack-100 text-lg'>
                                {
                                    emailSent ? `We have sent the reset email to ${email}` :
                                        "Have no fear. We will email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                }
                            </p>

                            <form onSubmit={submitHandler}>
                                {
                                    !emailSent && (
                                        <label>
                                            <p className='text-sm text-richblack-100 m-2 ml-0'>
                                                Email Address <sup className='text-pink-200'>*</sup>
                                            </p>
                                            <input
                                                className='w-full rounded-[8px] bg-richblack-800 text-richblack-5 py-[12px] px-[12px] mb-7'
                                                type="email"
                                                name='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder='Enter Your Email'
                                                required
                                            />
                                        </label>
                                    )
                                }

                                <button type='submit'
                                    className='text-center text-[16px] px-6 py-3 rounded-lg font-bold shadow-white shadow-sm bg-yellow-50 text-blac w-full'>
                                    {
                                        emailSent ? "Resend Email" : "Reset Password"
                                    }
                                </button>

                            </form>

                            <div className='text-richblack-25 w-fit'>
                                <Link to="/login" className='flex items-center'>
                                    <FaArrowLeft className="mr-2" />
                                    <p>Back to Login</p>
                                </Link>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default ForgotPassword