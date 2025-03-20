import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { sendOTP, signUp } from '../services/operations/authAPI'
import { RxCountdownTimer } from "react-icons/rx";

const VerifyEmail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    var [otp, setOtp] = useState("")
    const { loading, signupData } = useSelector((state) => state.auth)

    useEffect(() => {
        // if signupData is not present, navigate to signup page
        if(!signupData){
            navigate("/signup")
        }
    }, [])

    if(!signupData) return null
    
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType
    }=signupData

    const submithandler = (e) => {
        e.preventDefault()
        dispatch(signUp(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate))
    }

    return (
        <div className='h-[90vh] w-screen flex justify-center items-center'>
            {
                loading ? (
                    <div className='spinner'></div>
                ) : (
                    <div className='flex flex-col gap-4 w-[90%] md:w-[470px] p-7'>
                        <h1 className='text-richblack-25 text-3xl font-semibold'>
                            Verify email
                        </h1>
                        <p className='text-lg text-richblack-100'>
                            A verification code has been sent to you. Enter the code below
                        </p>

                        <form 
                        onSubmit={submithandler}
                        className='flex flex-col gap-4'>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                otpType="number"
                                // disabled={false}
                                separator={<span className='text-white'>-</span>}
                                renderInput={(props) => (
                                    <input
                                      {...props}
                                      placeholder="-"
                                      style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                      }}
                                      className="w-[45px] lg:w-[55px] border-0 bg-richblack-800 rounded-[0.5rem] 
                                      text-richblack-5 mr-4 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                    />
                                  )} 
                            />

                            <button type='submit'
                                className='text-center text-[16px] px-6 py-3 rounded-lg font-bold shadow-white shadow-sm bg-yellow-50 text-black'>
                                Verify email
                            </button>
                        </form>

                        <div className='flex flex-row justify-between'>
                            <div className='text-richblack-25 w-fit'>
                                <Link to="/login" className='flex items-center'>
                                    <FaArrowLeft className="mr-2" />
                                    <p>Back to Login</p>
                                </Link>
                            </div>

                                <button
                                onClick={() => { 
                                    setOtp("") // reset the otp field
                                    dispatch(sendOTP(signupData.email, navigate))
                                }}
                                className='flex items-center text-blue-100 gap-2'>
                                    <RxCountdownTimer/>
                                    <p>Resend it</p>
                                </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail