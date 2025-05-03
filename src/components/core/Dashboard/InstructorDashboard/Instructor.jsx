import { useState } from "react"
import { useEffect } from "react"
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { useSelector } from "react-redux"
import { getInstrutorData } from "../../../../services/operations/profileAPI"
import { Link } from "react-router-dom"
import { InstructorChart } from "./InstructorChart"
import { IconBtn } from "../../../common/IconBtn"

export const Instructor = () => {

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true)
            const instructorApiData = await getInstrutorData(token)
            const result = await fetchInstructorCourses(token)

            console.log("instructorApiData : ", instructorApiData)
            if (instructorApiData.length) {
                setInstructorData(instructorApiData)
            }
            if (result) {
                setCourses(result)
            }
            setLoading(false)
        }
        getCourseDataWithStats()
    }, [])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentEnrolled, 0)

    return (
        <div className="flex flex-col gap-2 w-[90%] text-richblack-25 mx-auto mt-6">

            <div>
                <h1 className="text-3xl font-semibold">
                    Hi {user?.firstName}
                </h1>
                <p className="text-sm font-bold text-richblack-50">Let's start something new</p>
            </div>

            {
                loading ? (<div>Loading...</div>)
                    : courses.length > 0
                        ? (
                            <div className="flex flex-col gap-4">

                                {/* Charts and Statistics */}
                                <div className="flex gap-4">
                                    {totalAmount > 0 || totalStudents > 0 ? (
                                        <InstructorChart courses={instructorData} />
                                    )
                                        : (
                                            <div className="flex-1 rounded-md bg-richblack-800 p-6">
                                                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                                                <p className="mt-4 text-xl font-medium text-richblack-50">
                                                    Not Enough Data To Visualize
                                                </p>
                                            </div>
                                        )
                                    }
                                    <div className="bg-richblack-800 p-5 flex flex-col gap-3 w-[22%] rounded-lg">
                                        <p className="font-extrabold ">Statistics</p>

                                        <div>
                                            <p className="text-richblack-300 font-bold">Total Courses</p>
                                            <p className="font-extrabold text-3xl text-richblack-25">{courses.length}</p>
                                        </div>

                                        <div>
                                            <p className="text-richblack-300 font-bold">Total Students</p>
                                            <p className="font-extrabold text-3xl text-richblack-25">{totalStudents}</p>
                                        </div>

                                        <div>
                                            <p className="text-richblack-300 font-bold">Total Income</p>
                                            <p className="font-extrabold text-3xl text-richblack-25">Rs. {totalAmount}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 3 courses */}
                                <div className="bg-richblack-800 p-5 flex flex-col gap-2 rounded-lg">
                                    <div className="flex justify-between">
                                        <p className="font-bold">View Courses</p>
                                        <Link to={"/dashboard/my-courses"}>
                                            <p className="text-sm text-yellow-50 font-bold">View All</p>
                                        </Link>
                                    </div>

                                    <div className="flex gap-4">
                                        {
                                            courses.slice(0, 3).map((course, index) => (
                                                <div className="flex flex-col gap-1">
                                                    <img
                                                        src={course.thumbnail}
                                                        alt="course thumbnail"
                                                        className="w-[550px]"
                                                    />

                                                    <p className="font-bold">{course.courseName}</p>
                                                    <div className="flex text-sm text-richblack-300 font-bold gap-2">
                                                        <p>{course.studentEnrolled.length} Students</p>
                                                        <p>|</p>
                                                        <p>Rs{course?.price}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            <div className="flex flex-col gap-2">
                                <p className="text-xl font-bold">You have not created any course</p>
                                <Link to={"/dashboard/add-course"}>
                                    <IconBtn
                                        text={"Create a course"}
                                    />
                                </Link>
                            </div>
                        )
            }

        </div>
    )
}
// 171 :- 45