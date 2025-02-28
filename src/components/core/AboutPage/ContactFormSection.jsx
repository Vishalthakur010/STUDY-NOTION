import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto flex flex-col items-center'>
        <h2>
            Get in Touch
        </h2>
        <p>
            We'd love to hear for you, please fill out this form.
        </p>
        <div>  
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactFormSection