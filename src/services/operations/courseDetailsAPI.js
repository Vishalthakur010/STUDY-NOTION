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

export const getAllCourses = async ()=>{
    const toastId = toast.loading("Loading")
    let result =[]
    try{
        const response = await apiconnector("GET", GET_ALL_COURSE_API)
        if(!response?.data?.success){
            throw new Error("Could not fetch all the courses")
        }
        result= response?.data?.data
    }
    catch(error){
        console.log("GET_ALL_COURSE_API ERROR ...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchCourseDetails =async (courseId) =>{
    const toastId= toast.loading("Loading")
    let result = null
    try{
        const response = await apiconnector("POST", COURSE_DETAILS_API,{courseId})
        console.log("COURSE_DETAILS_API response : ", response)

        if(!response?.data?.success){
            throw new Error("Could not fetch all the courses")
        }
        result= response?.data
    }catch(error){
        console.log("COURSE_DETAILS_API ERROR ...", error)
        result = error.response.data
        // toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//fetching the available course categories
export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await apiconnector("GET", COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API response : ", response)
        if (!response?.data?.success) {
            throw new Error("Could not fetch course categories")
        }
        result = response?.data?.allCategory
    } catch (error) {
        console.log("COURSE_CATEGORIES_API ERROR...", error)
        toast.error(error.message)
    }
    return result
}

//add the course details
export const addCourseDetails = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiconnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE_COURSE_API response : ", response)

        if (!response?.data?.success) {
            throw new Error("Could not create course details")
        }

        result = response?.data?.data
        toast.success("Course Details Added Successfully")
    } catch (error) {
        console.log("CREATE_COURSE_API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//edit the course details
export const editCourseDetails = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiconnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("EDIT_COURSE_API response : ", response)

        if (!response?.data?.success) {
            throw new Error("Could not edit course details")
        }

        result = response?.data?.data
        toast.success("Course Details Updated Successfully")
    } catch (error) {
        console.log("EDIT_COURSE_API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//create section
export const createSection = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result =null

    try{
        const response = await apiconnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE_SECTION_API response : ", response)

        if (!response?.data?.success) {
            throw new Error("Could not create section")
        }

        result = response?.data?.updatedCourseDetails
        toast.success("Section Created Successfully")
    }catch (error) {
        console.log("CREATE_SECTION_API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//create subsection
export const createSubsection = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result =null

    try{
        const response = await apiconnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE_SUBSECTION_API response : ", response)

        if (!response?.data?.success) {
            throw new Error("Could not create subsection")
        }

        result = response?.data?.UpdatedSection
        toast.success("Subsection Created Successfully")
    }catch (error) {
        console.log("CREATE_SUBSECTION_API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//update Section
export const updateSection = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result =null

    try{
        const response = await apiconnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("UPDATE_SECTION_API response : ", response)

        if (!response?.data?.success) {
            throw new Error("Could not update section")
        }

        result = response?.data?.data
        toast.success("Section Updated Successfully")
    }catch (error) {
        console.log("UPDATE_SECTION_API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//update subsection
export const updateSubsection= async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result =null

    try{
        const response = await apiconnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("UPDATE_SUBSECTION_API response : ", response)

        if (!response?.data?.success) {
            throw new Error("Could not update subsection")
        }

        result = response?.data?.data
        toast.success("Subsection Updated Successfully")
    }catch (error) {
        console.log("UPDATE_SUBSECTION_API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//delete section
export const deleteSection = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result =null

    try{
        const response = await apiconnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("DELETE_SUBSECTION_API response : ", response)

        if (!response?.data?.success) {
            throw new Error("Could not delete subSection")
        }

        result = response?.data?.data
        toast.success("Section Deleted Successfully")
    }catch (error) {
        console.log("DELETE_SECTION_API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//delete subSection
export const deleteSubsection = async (token)=>{
    const toastId = toast.loading("Loading...")
    let result =null

    try{
        const response = await apiconnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("DELETE_SECTION_API response : ", response)

        if (!response?.data?.success) {
            throw new Error("Could not delete subSection")
        }

        result = response?.data?.data
        toast.success("subSection Deleted Successfully")
    }catch (error) {
        console.log("DELETE_SUBSECTION_API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiconnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        })
        console.log("GET_ALL_INSTRUCTOR_COURSES_API response : ", response)

        if (!response?.data?.success) {
            throw new Error("Could not fetch instructor courses")
        }

        result = response?.data?.data
    } catch (error) {
        console.log("GET_ALL_INSTRUCTOR_COURSES_API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//delete course
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result =null

    try{
        const response = await apiconnector("POST", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("DELETE_COURSE_API response : ", response)

        if (!response?.data?.success) {
            throw new Error("Could not delete course")
        }

        result = response?.data?.data
        toast.success("Course Deleted Successfully")
    }catch (error) {
        console.log("DELETE_COURSE_API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
    
//get full details of a course
export const getFullCourseDetails = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiconnector(
            "POST", 
            GET_FULL_COURSE_DETAILS_AUTHENTICSTED, 
                {courseId}, 
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("GET_FULL_COURSE_DETAILS_AUTHENTICSTED response : ", response)

        if (!response?.data?.success) {
            throw new Error("Could not get full course details")
        }

        result = response?.data?.data
    } catch (error) {
        console.log("GET_FULL_COURSE_DETAILS_AUTHENTICSTED ERROR...", error)
        result=error.response.data
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}
    
// mark lecture as completed
export const markLectureAsCompleted = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result =null

    try{
        const response = await apiconnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("LECTURE_COMPLETION_API response : ", response)

        if (!response?.data?.success) {
            throw new Error("Could not mark lecture as completed")
        }

        result = response?.data?.data
        toast.success("Lecture Marked As Completed Successfully")
        result=true
    }catch (error) {
        console.log("LECTURE_COMPLETION_API ERROR...", error)
        toast.error(error.message)
        result=false
    }
    toast.dismiss(toastId)
    return result
}

//create rating for course
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result =null

    try{
        const response = await apiconnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE_RATING_API response : ", response)

        if (!response?.data?.success) {
            throw new Error("Could not create rating")
        }

        toast.success("Rating Created Successfully")
        result=true
    }catch (error) {
        console.log("CREATE_RATING_API ERROR...", error)
        toast.error(error.message)
        result=false
    }
    toast.dismiss(toastId)
    return result
}
