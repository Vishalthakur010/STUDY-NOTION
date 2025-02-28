import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false)
    const {
        register, 
        handleSubmit, 
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm()

    useEffect( () => {
        if(isSubmitSuccessful){
            reset({
                firstName: "",
                lastName: "",
                email: "",
                message: "",
                phoneNo: "",
            })
        }
    },[isSubmitSuccessful])

    return (
        <form>
                {/* 1:21 */}
        </form>
    )
}

export default ContactUsForm