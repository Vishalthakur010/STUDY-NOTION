import React from 'react'
import frameImg from '../../../assets/Images/frame.png'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { useSelector } from 'react-redux'

const Template = ({ title, desc1, desc2, formtype, image }) => {

        const { loading } = useSelector((state) => state.auth)

        return (
                <div>
                        {
                                loading ?
                                        (
                                                <div className='h-screen w-screen flex justify-center items-center'>
                                                        <div className='spinner'></div>
                                                </div>
                                        ) :
                                        (
                                                <div>
                                                        <div className='w-11/12 min-h-full  flex flex-col-reverse md:flex-row md:gap-x-12 items-center justify-between mx-auto mt-10 px-7'>

                                                                {/* left */}
                                                                <div className='w-11/12 max-w-[480px] h-[562px] mx-auto'>

                                                                        {/* heading */}
                                                                        <h1 className='text-richblack-5 font-semibold text-4xl leading-[2.375rem]'>
                                                                                {title}
                                                                        </h1>

                                                                        {/* description */}
                                                                        <p className=' text-xl mt-5'>
                                                                                <span className='text-richblack-100'>
                                                                                        {desc1}
                                                                                </span>
                                                                                <span className='text-blue-100 italic text-[16px]'>
                                                                                        {desc2}
                                                                                </span>
                                                                        </p>

                                                                        {/* form */}
                                                                        {formtype === 'login' ? <LoginForm /> : <SignupForm />
                                                                        }
                                                                </div>

                                                                {/* right */}
                                                                <div className='relative w-11/12 max-w-[585px] h-[531px] mx-auto'>
                                                                        <img src={frameImg}
                                                                                alt='pattern'
                                                                                loading='lazy'
                                                                                className='absolute'
                                                                        />

                                                                        <img src={image}
                                                                                alt="loginImage"
                                                                                loading='lazy'
                                                                                className='absolute -top-5 right-5 lg:right-12 object-cover'
                                                                        />
                                                                </div>

                                                        </div>

                                                        {/* for bottom background color */}
                                                        <div className='bg-richblack-900 h-[200px]'></div>
                                                </div>
                                        )
                        }



                </div>
        )
}

export default Template