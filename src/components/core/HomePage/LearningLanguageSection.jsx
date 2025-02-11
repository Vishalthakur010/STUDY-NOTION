import React from 'react'
import { HighlightText } from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/compare_with_others.png'
import plan_your_lessions from '../../../assets/Images/plan_your_lessons.png'
import CTAbutton from './Button'

const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col items-center justify-between mt-16'>

      {/* Heading-subheading section */}
      <div className='w-[70%]'>
        <h1 className='text-4xl font-semibold text-center'>
          Your swiss knife for
          <HighlightText text='learning any language' />
        </h1>

        <p className=' text-center text-richblack-600 font-semibold text-lg  mt-4'>
          Using spin making learning multiple languages easy. With 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </p>
      </div>

      {/* image section */}
      <div className='flex flex-col lg:flex-row items-center justify-center mt-8'>

        <img
          src={know_your_progress}
          alt="know_your_progress"
          className='object-contain -mr-32'
        />
        <img
          src={compare_with_others}
          alt="compare_with_others"
          className='object-contain'
        />
        <img
          src={plan_your_lessions}
          alt="plan_your_lessions"
          className='object-contain -ml-36'
        />
      </div>

      {/* cta button */}
      <div className='mt-8 mb-20'>
        <CTAbutton active={true} linkto='/signup'>
          Learn More
        </CTAbutton>
      </div>
    </div>
  )
}

export default LearningLanguageSection