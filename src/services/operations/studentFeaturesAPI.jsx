import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice"
import { resetCart } from "../../slices/cartSlice"

const { studentEndpoints } = require("../api")

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src

        script.onload = ()=>{
            resolve(true)
        }
        script.onerror = ()=>{
            resolve(false)
        }

        document.body.appendChild(script)
    })
}

export async function buyCourse(courses, token, navigate, dispatch, userDetails){
    const toastid = toast.loading("Loading")
    try{
        // Load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            toast.error("Razorpay SDK failed to load")
            return
        }

        // Initiate the order
        const orderResponse = await apiconnector("POST", COURSE_PAYMENT_API,
            {courses},
            {
                Authorization : `Bearer ${token}`
            }
        )
        if(!orderResponse){
            throw new Error(orderResponse.data.message)
        }

        // Option
        const option ={
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank you for purchasing the course",
            image: rzpLogo,
            prefill:{
                name: `${userDetails.name}`,
                email: userDetails.email
            },
            handler: function(response){
                // Send successfull email
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)

                // verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch)
            }
        }
    }
    catch(error){
        console.log("Payment API error : ", error)
        toast.error("Could not make payment")
    }
    toast.dismiss(toastid)
}

async function sendPaymentSuccessEmail(response, amount, token){
    try{
        await apiconnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId:response.razorpay_order_id,
                paymentId:response.razorpay_payment_id,
                amount
            },
            {
                Authorization : `Bearer ${token}`
            }
        )
    }
    catch(error){
        console.log("error in sendPaymentSuccessEmail : ", error)
    }
}

async function verifyPayment(dispatch){
    const toastid = toast.loading("Loading...")
    dispatch(setPaymentLoading(true))

    try{
        const response = await apiconnector("POST",COURSE_VERIFY_API,bodyData, 
            {
                Authorization: `Bearer ${token}`
            }
        )
        if(!response.data.success){
            throw new Error(response,data.message)
        }

        toast.success("Payment successful, You are now added to the course")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
    }
    catch(error){
        console.log("error while varifying payment : ", error)
        toast.error("Could not verify payment")
    }
    toast.dismiss(toastid)
    dispatch(setPaymentLoading(false))
}
// 1:29