import React from 'react'
import { HighlightText } from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-[16px] text-richblack-300'>
        We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightText text={" Combines technology"}/>
        <span className='text-yellow-100'>
            {" "}
            expertise
        </span>
        , and community to create an
        <span className='bg-clip-text text-transparent bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]'>
            unparalleled educational experience
        </span>
    </div>
  )
}

export default Quote