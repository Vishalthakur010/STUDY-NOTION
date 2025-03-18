import { useSelector } from "react-redux"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"

export const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth)
    const [enrolledCourses, setEnrolledCourses] = useState(null)

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token)
            setEnrolledCourses(response)
        }
        catch (error) {
            console.log("unable to fetch enabled courses : ", error.message)
        }
    }

    useEffect(() => {
        getEnrolledCourses()
    }, [])

    return (
        <div className="flex flex-col gap-6 w-[70%] text-richblack-25 mx-auto mt-6">

            <h1 className="text-3xl font-semibold">
                Enrolled Courses
            </h1>

            {
                !enrolledCourses ?
                    (
                        <div>loading...</div>
                    ) :
                    !enrolledCourses.length ? (<p>You have not enrolled in any course yet </p>) :
                        (
                            <div>
                                <div>
                                    <p>Course Name</p>
                                    <p>Duration</p>
                                    <p>Progress</p>
                                </div>

                                {/* Cards starts from here */}
                                {
                                    enrolledCourses.map((course, index) => (
                                        <div>
                                            <div>
                                                <img src={course.thumbnail} alt="" />
                                                <div>
                                                    <p>{course.courseName}</p>
                                                    <p>{course.coursedescription}</p>
                                                </div>
                                            </div>

                                            <div>
                                                {course?.totalDuration}
                                            </div>

                                            <div>
                                                <p>Progress {course?.progressPercentage || 0}%</p>
                                                <ProgressBar
                                                completed={course?.progressPercentage || 0}
                                                height="8px"
                                                isLabelVisible={false}
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
            }

        </div>
    )
}