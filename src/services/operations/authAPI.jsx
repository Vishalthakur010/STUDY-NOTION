import toast from "react-hot-toast";

import { endpoints } from "../api";
import { apiconnector } from "../apiconnector";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";


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
                console.log("SENDOTP API response ... ", response)
                console.log(response.data.success)

                if(!response.data.success){
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