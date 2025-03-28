import toast from "react-hot-toast"
import {apiconnector} from "../apiconnector"
import {courseEndpoints} from "../api"

const {
    CREATE_COURSE_API,
    GET_ALL_COURSE_API,
    COURSE_DETAILS_API,
    EDIT_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICSTED,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,

    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,

    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,

    COURSE_CATEGORIES_API,

    LECTURE_COMPLETION_API,

    CREATE_RATING_API
}= courseEndpoints