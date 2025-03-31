import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI"


export const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm()

    const dispatch = useDispatch()
    const {course, editCourse} = useSelector((state)=> state.course)
    const {loading, setLoading} =useState(false)
    const {courseCategory, setCourseCategory} = useState([])

        useEffect(()=>{
        const getCategories = async()=>{
            setLoading(true)
            const categories= await fetchCourseCategories()
            if(categories.length >0){
                setCourseCategory(categories)
            }
            setLoading(false)
        }

        if(editCourse){
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instruction)
            setValue("courseImage", course.thumbnail)
        }

        getCategories()
    })                      
                        // 42:00

    return (
        <div>
            <h1>Course Information</h1>
        </div>
    )
}