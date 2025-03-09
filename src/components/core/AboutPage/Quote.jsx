import React from 'react'
import { HighlightText } from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='w-11/12 mx-auto leading-[1.5] text-center m-24 text-4xl font-bold text-richblack-100'>
        We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightText text={" Combines technology"}/>
        <span className='bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-[#f97316] via-[#fdba74] to-[#ffedd5] bg-clip-text text-transparent'>
            {" "}
            expertise
        </span>
        , and community to create an
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] via-[#fcd34d] to-[#fef9c3]'>
            {" "}
            unparalleled educational experience
        </span>
    </div>
  )
}

export default Quote