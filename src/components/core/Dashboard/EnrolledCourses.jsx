import { useSelector } from "react-redux"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import loginimg from "../../../assets/Images/login.webp"

export const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth)
    const [enrolledCourses, setEnrolledCourses] = useState(null)

     // Mock Data for Design
     const mockData = [
        {
            thumbnail: loginimg,
            courseName: "The Complete Python",
            coursedescription: "Short Description",
            totalDuration: "2hr 30mins",
            progressPercentage: 75
        },
        {
            thumbnail: loginimg,
            courseName: "The Complete Python",
            coursedescription: "Short Description",
            totalDuration: "2hr 30mins",
            progressPercentage: 94
        },
        {
            thumbnail: loginimg,
            courseName: "The Complete Python",
            coursedescription: "Short Description",
            totalDuration: "2hr 30mins",
            progressPercentage: 25
        },
        {
            thumbnail: loginimg,
            courseName: "The Complete Python",
            coursedescription: "Short Description",
            totalDuration: "2hr 30mins",
            progressPercentage: 60
        },
    ]

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
        // getEnrolledCourses()
        setEnrolledCourses(mockData)
    }, [])

    return (
        <div className="flex flex-col gap-6 w-[90%] text-richblack-25 mx-auto mt-6">

            <h1 className="text-3xl font-semibold">
                Enrolled Courses
            </h1>

            {
                !enrolledCourses ?
                    (
                        <div>loading...</div>
                    ) :
                    // !enrolledCourses.length ? (<p>You have not enrolled in any course yet </p>) :
                        (
                            <div className="flex flex-col rounded-xl border border-richblack-700 overflow-hidden">
                                <div className="flex bg-richblack-700 p-4 ">
                                    <p className="w-[50%]">Course Name</p>
                                    <p className="w-[20%]">Duration</p>
                                    <p className="w-[25%]">Progress</p>
                                </div>

                                {/* Cards starts from here */}
                                {
                                    enrolledCourses.map((course, index) => (
                                        <div key={index}
                                        className="flex flex-row items-center p-4  border border-richblack-700"
                                        >
                                            <div className="flex flex-row gap-6 w-[50%]">
                                                <img 
                                                src={course.thumbnail} 
                                                alt="course-thumbnail" 
                                                className="w-[50px] rounded-lg"
                                                />
                                                <div>
                                                    <p className="text-richblack-25 font-semibold">
                                                        {course.courseName}
                                                        </p>
                                                    <p className="text-richblack-300">
                                                        {course.coursedescription}
                                                        </p>
                                                </div>
                                            </div>

                                            <div className="w-[20%]">
                                                {course?.totalDuration}
                                            </div>

                                            <div className="flex flex-col ">
                                                <p className="text-sm">Progress {course?.progressPercentage || 0}%</p>

                                                <ProgressBar
                                                completed={course?.progressPercentage || 0}
                                                height="8px"
                                                width="150px"
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