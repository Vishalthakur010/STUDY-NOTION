const BASE_URL= "http://localhost:4000/api/v1" 

//AUTH ENDPOINTS
export const endpoints = {
        SENDOTP_API : BASE_URL + "/auth/sendOTP", //checked
        SIGNUP_API : BASE_URL + "/auth/signup", //checked
        LOGIN_API : BASE_URL + "/auth/login", //checked
        RESETPASSTOKEN_API: BASE_URL + "/auth/reset-Password-Token", //checked
        RESETPASSWORD_API: BASE_URL + "/auth/reset-Password" //checked
}

//PROFILE ENDPOINTS
export const PROFILE_ENDPOINT={
        GET_USER_ENROLLED_COURSES_API : BASE_URL + "/profile/getEnrolledCourses", //checked
        GET_USER_DETAILS_API : BASE_URL + "/profile/getAllUserDetails"
}

//COURSE ENDPOINTS
export const courseEndpoints = {
        CREATE_COURSE_API: BASE_URL + "/course/createCourse",
        GET_ALL_COURSE_API: BASE_URL + "/course/showAllCourses",
        COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetail",
        EDIT_COURSE_API: BASE_URL + "/course/editCourse",
        GET_FULL_COURSE_DETAILS_AUTHENTICSTED:
                BASE_URL + "/course/getFullCourseDetails",
        GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
        DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",

        CREATE_SECTION_API: BASE_URL + "/course/createSection",
        UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
        DELETE_SECTION_API: BASE_URL + "/course/deleteSection",

        CREATE_SUBSECTION_API: BASE_URL + "/course/createSubsection",
        UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubsection",
        DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubsection",

        COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategory",

        LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",

        CREATE_RATING_API: BASE_URL + "/course/createRating"
}

//CATEGORIES API
export const categories = {
        CATEGORIES_API: BASE_URL + "/course/showAllCategory" //checked
}

//CONTACT API
export const contact = {
        CONTACT_API: BASE_URL + "/reach/contact" //checked
}

//SETTINGS API
export const settingsEndpoints = {
        UPDATE_DISPLAY_PICTURE: BASE_URL + "/profile/updateDisplayPicture", //checked
        UPDATE_PROFILE: BASE_URL + "/profile/updateProfile", //checked
        CHANGE_PASSWORD: BASE_URL +"/auth/changePassword", //checked
        DELETE_ACCOUNT: BASE_URL + "/profile/deleteAccount" //checked
}

