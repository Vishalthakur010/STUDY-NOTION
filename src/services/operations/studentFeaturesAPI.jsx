import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice"
import { resetCart } from "../../slices/cartSlice"
import { studentEndpoints } from "../api"

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }

        document.body.appendChild(script)
    })
}

export async function buyCourse(courses, token, navigate, dispatch, userDetails) {
    const toastid = toast.loading("Loading")
    try {
        // Load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!res) {
            toast.error("Razorpay SDK failed to load")
            return
        }

        // Initiate the order
        const orderResponse = await apiconnector("POST", COURSE_PAYMENT_API,
            { courses },
            {
                Authorization: `Bearer ${token}`
            }
        )
        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message)
        }

        // Option
        const option = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            // key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank you for purchasing the course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email
            },
            handler: async function (response) {
                try {
                    // Send successful email
                    await sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)

                    // Verify payment
                    await verifyPayment({ ...response, courses }, token, navigate, dispatch)
                } catch (error) {
                    console.error("Error in payment handler:", error)
                    toast.error("Payment completed but verification failed. Please contact support.")
                }
            },
            modal: {
                ondismiss: function() {
                    toast.dismiss(toastid)
                }
            }
        }

        const paymentObject = new window.Razorpay(option)
        paymentObject.open()
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops, payment failed")
            console.log(response.error)
        })
    }
    catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error(error.message || "Could not initiate Payment");
    }
    toast.dismiss(toastid);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiconnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount
            },
            {
                Authorization: `Bearer ${token}`
            }
        )
    }
    catch (error) {
        console.log("error in sendPaymentSuccessEmail : ", error)
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastid = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true))

    try {
        const response = await apiconnector("POST", COURSE_VERIFY_API, bodyData,
            {
                Authorization: `Bearer ${token}`
            }
        )
        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success("Payment successful, You are now added to the course")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
    }
    catch (error) {
        console.log("error while varifying payment : ", error)
        toast.error(error.message || "Could not verify payment")
    }
    finally {
        toast.dismiss(toastid)
        dispatch(setPaymentLoading(false))
    }
}