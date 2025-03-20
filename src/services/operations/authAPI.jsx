import toast from "react-hot-toast";

import { endpoints } from "../api";
import { apiconnector } from "../apiconnector";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";

const {
        SENDOTP_API,
        SIGNUP_API,
        LOGIN_API,
        RESETPASSTOKEN_API,
        RESETPASSWORD_API
} = endpoints


export const sendOTP = (email, navigate) => async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
                const response = await apiconnector("POST", SENDOTP_API, {
                        email,
                        checkuserPresent: true
                })
                // console.log("SENDOTP API response ... ", response)
                // console.log(response.data.success)

                if (!response.data.success) {
                        throw new Error(response.data.message)
                }

                toast.success("OTP Sent Successfully")
                navigate("/verify-email")
        }
        catch (error) {
                console.log("SENDOTP API ERROR............", error)
                toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
}

export const signUp = (firstName,lastName,email,password,confirmPassword,accountType,otp,navigate) => async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
                const response = await apiconnector("POST", SIGNUP_API, {
                        firstName,
                        lastName,
                        email,
                        password,
                        confirmPassword,
                        accountType,
                        otp
                })
                console.log("SIGNUP API response ... ", response)

                if (!response.data.success) {
                        throw new Error(response.data.message)
                }

                toast.success("Sign Up Successful")
                navigate("/login")
        }
        catch (error) {
                console.log("SIGNUP API ERROR............", error)
                toast.error("Could not Sign Up")
        }

        toast.dismiss(toastId)
        dispatch(setLoading(false))
}

export const login = (email, password, navigate) => async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
                const response = await apiconnector("POST", LOGIN_API, { email, password })
                // console.log("LOGIN API response ... ", response)

                if (!response.data.success) {
                        throw new Error(response.data.message)
                }
                toast.success("Login Successful")
                dispatch(setToken(response.data.token))

                const userImage = response.data?.user?.image
                ? response.data?.user?.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

                dispatch(setUser({
                        ...response.data.user,
                        image: userImage
                }))

                localStorage.setItem("user", JSON.stringify(response.data.user))
                localStorage.setItem("token", JSON.stringify(response.data.token))

                navigate("/dashboard/my-profile")
        }
        catch (error) {
                console.log("LOGIN API ERROR............", error)
                toast.error("Could not Login")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
}

export function logout(navigate){
        return async (dispatch) => {
                dispatch(setToken(null))
                dispatch(setUser(null))
                dispatch(resetCart(null))
                localStorage.clear()
                // localStorage.removeItem("user")
                // localStorage.removeItem("token")
                toast.success("Logged Out Successfully")
                navigate("/")
        }
}

export function getresetPasswordToken(email, setEmailSent) {
        return async (dispatch) => {
                const toastId = toast.loading("Loading...")
                dispatch(setLoading(true))
                try {
                        const response = await apiconnector("POST", RESETPASSTOKEN_API, { email })
                        console.log("RESETPASSTOKEN API response ... ", response)

                        if (!response.data.success) {
                                throw new Error(response.data.message)
                        }

                        setEmailSent(true)
                        toast.success("Token Sent Successfully")
                }
                catch (error) {
                        console.log("RESETPASSTOKEN API ERROR............", error)
                        toast.error("Could Not Send Token")
                }
                toast.dismiss(toastId)
                dispatch(setLoading(false))
        }
}

export function resetPassword(password, confirmPassword, token, navigate) {
        return async (dispatch) => {
                const toastId = toast.loading("Loading...")
                dispatch(setLoading(true))

                try {
                        const response = await apiconnector("POST", RESETPASSWORD_API, { password, confirmPassword, token })
                        console.log("ResetPassword API response ... ", response)
                        if (!response.data.success) {
                                throw new Error(response.data.message)
                        }
                        toast.success("Password Reset Successfully")
                        navigate("/login")
                }
                catch (error) {
                        console.log("ResetPassword API ERROR............", error)
                        toast.error("Could not Reset Password")
                }

                toast.dismiss(toastId)
                dispatch(setLoading(false))
        }
}

