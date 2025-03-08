const BASE_URL= "http://localhost:4000/api/v1" 

//AUTH ENDPOINTS
export const endpoints = {
        SENDOTP_API : BASE_URL + "/auth/sendOTP",
        SIGNUP_API : BASE_URL + "/auth/signup",
        LOGIN_API : BASE_URL + "/auth/login",
        RESETPASSTOKEN_API: BASE_URL + "/auth/reset-Password-Token",
        RESETPASSWORD_API: BASE_URL + "/auth/reset-Password"
}

//CATEGORIES API
export const categories = {
        CATEGORIES_API: BASE_URL + "/course/showAllCategory"
}

//CONTACT API
export const contact = {
        CONTACT_API: BASE_URL + "/reach/contact"
}