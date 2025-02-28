import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { resetPassword } from '../services/operations/authAPI'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import toast from 'react-hot-toast'

const UpdatePassword = () => {
    const location = useLocation()
    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })

    const changeHandler = (event) => {
        setFormData(prevData => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))  
    }

    const token = location.pathname.split("/").at(-1)

    const submitHandler = (event) => {
        event.preventDefault()

        if(formData.password !== formData.confirmPassword){
            toast.error("Passwords do not match!")
            return;
        }
        dispatch(resetPassword(formData.password, formData.confirmPassword, token, navigate))
    }

    return (
        <div className='h-[90vh] w-screen flex justify-center items-center'>
            {
                loading ?
                    (
                        <div className='spinner'></div>
                    ) :
                    (
                        <div className='flex flex-col gap-4 w-[90%] md:w-[470px] p-7'>

                            <h1 className='text-richblack-25 text-3xl font-semibold'>
                                Choose new Password
                            </h1>

                            <p className='text-richblack-100 text-lg'>
                                Almost done. Enter your new password and you're all set
                            </p>

                            <form onSubmit={submitHandler} className='flex flex-col gap-4'>

                                {/* Password */}
                                    <label className='relative'>
                                        <p className='text-richblack-25 text-base mb-2'>
                                            New password <sup className='text-pink-200'>*</sup>
                                        </p>
                                        <input
                                            required
                                            type={showPassword ? ('text') : ('password')}
                                            name='password'
                                            value={formData.password}
                                            onChange={changeHandler}
                                            placeholder='Enter new password'
                                            className='w-[100%] text-richblack-5 bg-richblack-800 p-3 rounded-lg shadow-sm shadow-richblack-100'
                                        />

                                        {/* Eye symbol */}
                                        <span
                                            className='absolute top-11 right-2 cursor-pointer'
                                            onClick={() => setShowPassword((prev) => !prev)}>
                                            {showPassword ?
                                                (<AiOutlineEyeInvisible fontSize={24} className="fill-richblack-50" />) :
                                                (<AiOutlineEye fontSize={24} className="fill-richblack-50" />)
                                            }
                                        </span>
                                    </label>

                                    <label className='relative'>
                                        <p className='text-richblack-25 text-base mb-2'>
                                            Confirm new password <sup className='text-pink-200'>*</sup>
                                        </p>
                                        <input
                                            required
                                            type={confirmPassword ? ('text') : ('password')}
                                            name='confirmPassword'
                                            value={formData.confirmPassword}
                                            onChange={changeHandler}
                                            placeholder='Enter confirm password'
                                            className='w-[100%] text-richblack-5 bg-richblack-800 p-3 rounded-lg shadow-sm shadow-richblack-100'
                                        />

                                        {/* Eye symbol */}
                                        <span
                                            className='absolute top-11 right-2 cursor-pointer'
                                            onClick={() => setConfirmPassword((prev) => !prev)}>
                                            {confirmPassword ?
                                                (<AiOutlineEyeInvisible fontSize={24} className="fill-richblack-50" />) :
                                                (<AiOutlineEye fontSize={24} className="fill-richblack-50" />)
                                            }
                                        </span>
                                    </label>

                                <button type='submit'
                                    className='text-center text-[16px] px-6 py-3 rounded-lg font-bold shadow-white shadow-sm bg-yellow-50 text-blac w-full'>
                                    Reset Password
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

export default UpdatePassword