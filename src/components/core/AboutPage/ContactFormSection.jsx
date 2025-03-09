import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto flex flex-col items-center mt-[170px] mb-[150px]'>
        <h2 className='text-4xl font-semibold'>
            Get in Touch
        </h2>
        <p className='text-richblack-300 mt-4 mb-2 font-semibold text-base'>
            We'd love to hear for you, please fill out this form.
        </p>
        <div className='w-[90%] md:w-[70%] lg:w-[50%] max-w-maxContent mx-auto'>  
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactFormSection