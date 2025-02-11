import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import { HighlightText } from './HighlightText'
import CTAbutton from './Button'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
        return (
                <div className='flex flex-col lg:flex-row items-center justify-between gap-10'>

                        {/* left */}
                        <div className='lg:w-[50%]'>
                                <img
                                        src={Instructor}
                                        alt="Instructor Image"
                                        className='shadow-[-18px_-18px_2px_2px_rgba(255,255,255,1)]'
                                />
                        </div>

                        {/* Right */}
                        <div className='flex flex-col justify-between gap-8 lg:w-[50%] lg:pl-16'>
                                <div className='text-4xl font-semibold w-[50%]'>
                                        Become an
                                        {/* <br /> */}
                                        <HighlightText text={'instructor'} />
                                </div>

                                <p className='text-[16px] font-medium text-richblack-300 w-[480px]'>
                                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                                </p>

                                <div className='w-fit mt-5'>
                                        <CTAbutton active={true} linkto={"/signup"}>
                                                <div className='flex flex-row gap-2 items-center '>
                                                        Start Teaching Today
                                                        <FaArrowRight />
                                                </div>
                                        </CTAbutton>
                                </div>
                        </div>

                </div>
        )
}

export default InstructorSection