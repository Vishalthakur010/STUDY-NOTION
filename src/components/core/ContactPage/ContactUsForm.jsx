import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { contact } from '../../../services/api'
import { apiconnector } from '../../../services/apiconnector'
import countryCode from '../../../data/countrycode.json'

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm()

    const submitContactForm = async (data) => {
        console.log("form data", data)

        try {
            setLoading(true)
            const result = await apiconnector("POST", contact.CONTACT_API, data)
            console.log("Contact API response ... ", result)
            toast.success("Message sent successfully")
            setLoading(false)
        }
        catch (error) {
            console.error("Error submitting contact form:", error)
            toast.error(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstname: "",
                lastname: "",
                email: "",
                message: "",
                phoneNo: "",
                countrycode:""
            })
        }
    }, [reset, isSubmitSuccessful])

    return (
        <form
            onSubmit={handleSubmit(submitContactForm)}
            className='flex flex-col gap-6 mt-10'>

            {/* Name */}
            <div className='flex flex-row gap-x-5 w-full'>
                <div className='flex flex-col'>
                    <label htmlFor="firstname" className='text-richblack-25 text-base mb-2'>First Name</label>
                    <input
                        type="text"
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        {...register("firstname", { required: true })}
                        className='text-richblack-5 w-full bg-richblack-800 p-3 rounded-lg shadow-sm shadow-richblack-100'
                    />
                    {
                        errors.firstname && (
                            <span>Please enter your first name</span>
                        )
                    }
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="lastname" className='text-richblack-25 text-base mb-2'>Last Name</label>
                    <input
                        type="text"
                        name='lastname'
                        id='lastname'
                        placeholder='Enter last name'
                        {...register("lastname", { required: true })}
                        className='text-richblack-5 w-full bg-richblack-800 p-3 rounded-lg shadow-sm shadow-richblack-100'
                    />
                    {
                        errors.lastname && (
                            <span>Please enter your last name</span>
                        )
                    }
                </div>
            </div>

            {/* Email */}
            <div className='flex flex-col'>
                <label htmlFor="email" className='text-richblack-25 text-base mb-2'>Email</label>
                <input
                    type="email"
                    name='email'
                    id='email'
                    placeholder='Enter email address'
                    {...register("email", { required: true })}
                    className='text-richblack-5 bg-richblack-800 p-3 rounded-lg shadow-sm shadow-richblack-100'
                />
                {
                    errors.email && (
                        <span>Please enter your email address</span>
                    )
                }
            </div>

            {/* Phone Number */}
            <div className='flex flex-col'>
                <label htmlFor="phoneNo" className='text-richblack-25 text-base mb-2'>Phone Number</label>

                <div className='flex flex-row justify-between gap-4'>
                    {/* dropdown */}
                    <select
                        name="countrycode"
                        id="countrycode"
                        {...register("countrycode", { required: true })}
                        className='w-[80px] text-richblack-5 bg-richblack-800 p-3 px-4 rounded-lg shadow-sm shadow-richblack-100'
                    >
                            {
                                countryCode.map( (country, index) => (
                                    <option value={country.code} key={index}>
                                        {country.code} -{country.country}
                                    </option>
                                ))
                            }
                    </select>

                    <input 
                    type="number"
                    name='phoneNo' 
                    id='phoneNo'
                    placeholder='12345 67890'
                    {...register("phoneNo", 
                        { required: {value:true, message:"please enter phone number"},
                            maxLength:{value:10 , message:"invalid phone number"},
                            minLength:{value:8, message:"invalid phone number"}
                        })}
                        className='text-richblack-5 w-full bg-richblack-800 p-3  rounded-lg shadow-sm shadow-richblack-100'
                    />
                </div>
                {
                    errors.phoneNo && (
                        <span>{errors.phoneNo.message}</span>
                    )
                }

            </div>

            {/* message */}
            <div className='flex flex-col'>
                <label htmlFor="message" className='text-richblack-25 text-base mb-2'>Message</label>
                <textarea
                    name='message'
                    id='message'
                    rows={5}
                    cols={30}
                    placeholder='Enter your message'
                    {...register("message", { required: true })}
                    className='text-richblack-5 bg-richblack-800 p-3 rounded-lg shadow-sm shadow-richblack-100'
                />
                {
                    errors.email && (
                        <span>Please enter your email address</span>
                    )
                }
            </div>

            {/* Button */}
            <button
                type='submit'
                className='mt-4 font-semibold bg-yellow-50 py-3 text-richblack-800 rounded-lg shadow-sm hover:bg-yellow-100'>
                Send Message
            </button>
        </form>
    )
}

export default ContactUsForm