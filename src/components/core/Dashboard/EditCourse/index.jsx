import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RenderSteps } from "../AddCourse/RenderSteps"
import { getFullCourseDetails } from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"

export default function EditCourse() {

    const { courseId } = useParams()
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        const populateCourseDetails = async () => {
            setLoading(true)
            const result = await getFullCourseDetails(courseId, token)
            if (result?.courseDetails) {
                dispatch(setCourse(result?.courseDetails))
                dispatch(setEditCourse(result?.courseDetails))
            }
            setLoading(false)
        }
        populateCourseDetails()
    },[])
    return (
        <div className="flex flex-col gap-6 w-[90%] text-richblack-25 mx-auto mt-6">

            <h1 className="text-3xl font-semibold">
                Edit Course
            </h1>

            <div>
                {
                    course ? (<RenderSteps />)
                        : (
                            <div className="flex items-center justify-center h-[80vh]">
                                <p className="text-richblack-300 text-lg font-semibold">
                                    No Course Found
                                </p>
                            </div>
                        )
                }
            </div>
        </div>
    )
}