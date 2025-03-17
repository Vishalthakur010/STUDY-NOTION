import toast from "react-hot-toast"
import { PROFILE_ENDPOINT } from "../api"
import { apiconnector } from "../apiconnector"

const { GET_USER_ENROLLED_COURSES_API } = PROFILE_ENDPOINT

export const getUserEnrolledCourses = async (token) => {
    const toastId = toast.loading("Loading...")
    let result =[]

    try {
        const response = await apiconnector("GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("GET_USER_ENROLLED_COURSES_API response : ", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result=response.data.data
    }
    catch (error) {
        console.log("error in GET_USER_ENROLLED_COURSES_API : ", error)
        toast.error("Couldn't get user enrolled courses")
    }
    toast.dismiss(toastId)

    return result
}