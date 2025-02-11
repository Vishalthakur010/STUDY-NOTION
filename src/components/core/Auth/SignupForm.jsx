import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { setSignupData } from '../../../slices/authSlice'
import { sendOTP } from '../../../services/operations/authApi'
import Tab from '../../common/Tab'

const SignupForm = () => {
        const navigate = useNavigate()
        const dispatch = useDispatch()

        // account type student or instructor
        const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

        const [showPassword, setShowPassword] = useState(false)
        const [confirmPassword, setConfirmPassword] = useState(false)

        const [formData, setFormData] = useState({
                firstName: "",
                lastName: "",
                email: "",
                // phoneNo: "",
                password: "",
                confirmPassword: ""
        })

        const changeHandler = (event) => {
                setFormData((prevData) => (
                        {
                                ...prevData,
                                [event.target.name]: event.target.value
                        }
                ))
        }

        //submit the form
        function submitHandler(event) {
                event.preventDefault();
                // console.log(formData)

                if (formData.password !== formData.confirmPassword) {
                        toast.error("Passwords do not match!");
                        return;
                }

                const signupData = {
                        ...formData,
                        accountType
                }

                // Setting signup data to state
                // To be used after otp verification
                dispatch(setSignupData(signupData))
                //send otp to user
                dispatch(sendOTP(formData.email, navigate))


                setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        // phoneNo: "",
                        password: "",
                        confirmPassword: ""
                })

                setAccountType(ACCOUNT_TYPE.STUDENT)
        }

        // data to be sent to the tab component
        const tabData = [
                {
                        id: 1,
                        tabName: "Student",
                        type: ACCOUNT_TYPE.STUDENT
                },
                {
                        id: 2,
                        tabName: "Instructor",
                        type: ACCOUNT_TYPE.INSTRUCTOR
                }
        ]

        return (
                <div>
                        <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

                        <form onSubmit={submitHandler}
                                className='flex flex-col gap-5 mt-10'>

                                {/* Name */}
                                <div className='flex flex-row gap-x-12'>
                                        <label>
                                                <p className='text-richblack-25 text-base mb-2'>
                                                        First Name <sup className='text-pink-200'>*</sup>
                                                </p>
                                                <input
                                                        required
                                                        type='text'
                                                        name='firstName'
                                                        value={formData.firstName}
                                                        onChange={changeHandler}
                                                        placeholder='Enter first name'
                                                        className='w-[110%] text-richblack-5 bg-richblack-800 p-3 rounded-lg shadow-sm shadow-richblack-100'
                                                />
                                        </label>

                                        <label>
                                                <p className='text-richblack-25 text-base mb-2'>
                                                        Last Name <sup className='text-pink-200'>*</sup>
                                                </p>
                                                <input
                                                        required
                                                        type='text'
                                                        name='lastName'
                                                        value={formData.lastName}
                                                        onChange={changeHandler}
                                                        placeholder='Enter last name'
                                                        className='w-[110%] text-richblack-5 bg-richblack-800 p-3 rounded-lg shadow-sm shadow-richblack-100'
                                                />
                                        </label>
                                </div>

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

                                {/* Phone number */}
                                {/* <label>
                                        <p className='text-richblack-25 text-base mb-2'>
                                                Phone Number <sup className='text-pink-200'>*</sup>
                                        </p>
                                        <input
                                                required
                                                type='tel'
                                                name='phoneNo'
                                                value={formData.phoneNo}
                                                onChange={changeHandler}
                                                placeholder='123456789'
                                                className='w-full text-richblack-5 bg-richblack-800 p-3 rounded-lg shadow-sm shadow-richblack-100'
                                        />
                                </label> */}

                                {/* Password */}
                                <div className='flex flex-row gap-x-12'>

                                        <label className='relative'>
                                                <p className='text-richblack-25 text-base mb-2'>
                                                        Create Password <sup className='text-pink-200'>*</sup>
                                                </p>
                                                <input
                                                        required
                                                        type={showPassword ? ('text') : ('password')}
                                                        name='password'
                                                        value={formData.password}
                                                        onChange={changeHandler}
                                                        placeholder='Enter Password'
                                                        className='w-[110%] text-richblack-5 bg-richblack-800 p-3 rounded-lg shadow-sm shadow-richblack-100'
                                                />

                                                {/* Eye symbol */}
                                                <span
                                                        className='absolute top-11 -right-2 cursor-pointer'
                                                        onClick={() => setShowPassword((prev) => !prev)}>
                                                        {showPassword ?
                                                                (<AiOutlineEyeInvisible fontSize={24} className="fill-richblack-50" />) :
                                                                (<AiOutlineEye fontSize={24} className="fill-richblack-50" />)
                                                        }
                                                </span>
                                        </label>

                                        <label className='relative'>
                                                <p className='text-richblack-25 text-base mb-2'>
                                                        Confirm Password <sup className='text-pink-200'>*</sup>
                                                </p>
                                                <input
                                                        required
                                                        type={confirmPassword ? ('text') : ('password')}
                                                        name='confirmPassword'
                                                        value={formData.confirmPassword}
                                                        onChange={changeHandler}
                                                        placeholder='Enter Password'
                                                        className='w-[110%] text-richblack-5 bg-richblack-800 p-3 rounded-lg shadow-sm shadow-richblack-100'
                                                />

                                                {/* Eye symbol */}
                                                <span
                                                        className='absolute top-11 -right-2 cursor-pointer'
                                                        onClick={() => setConfirmPassword((prev) => !prev)}>
                                                        {confirmPassword ?
                                                                (<AiOutlineEyeInvisible fontSize={24} className="fill-richblack-50" />) :
                                                                (<AiOutlineEye fontSize={24} className="fill-richblack-50" />)
                                                        }
                                                </span>
                                        </label>
                                </div>

                                {/* Button */}
                                <button
                                        type='submit'
                                        className='mt-4 font-semibold bg-yellow-50 py-3  rounded-lg shadow-sm hover:bg-yellow-100'>
                                        Create Account
                                </button>

                        </form>
                </div>
        )
}

export default SignupForm