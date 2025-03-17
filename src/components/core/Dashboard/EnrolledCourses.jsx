import { useSelector } from "react-redux"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { useEffect, useState } from "react"

export const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth)
    const [enrolledCourses, setEnrolledCourses] = useState(null)

    const getEnrolledCourses = async () => {
        try{
            const response=  await getUserEnrolledCourses(token)
            setEnrolledCourses(response)
        }
        catch(error){
            console.log("unable to fetch enabled courses : ", error.message)
        }
    }

    useEffect(()=>{
        getEnrolledCourses()
    },[])

    return (
        <div className="flex flex-col gap-6 w-[70%] text-richblack-25 mx-auto mt-6">

            <h1 className="text-3xl font-semibold">
                Enrolled Courses
            </h1>

            {
                !enrolledCourses ? 
                (
                    <div>loading...</div>
                ):
                !enrolledCourses.length?(<p>You have not enrolled in any course yet </p>):
                (
                    <div>
                        <div>
                            <p>Course Name</p>
                        </div>
                    </div>
                )
            }

        </div>
    )
}