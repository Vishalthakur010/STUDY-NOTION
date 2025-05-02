import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { getFullCourseDetails } from "../services/operations/courseDetailsAPI"
import { setComplatedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../slices/viewCourseSlice"
import { VideoDetailsSideBar } from "../components/core/ViewCourse/VideoDetailsSideBar"
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"

export const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false)
    const { courseId } = useParams()
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            const courseData = await getFullCourseDetails(courseId, token)
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent))
            dispatch(setEntireCourseData(courseData?.courseDetails))
            dispatch(setComplatedLectures(courseData?.completedVideos))
            let lectures = 0
            courseData?.courseDetails?.courseContent.forEach((sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))
        }
        setCourseSpecificDetails()
    }, [])


    return (
        <div>

            <div className="flex h-[calc(100vh-3.5rem)] bg-richblack-600 overflow-hidden">
                <VideoDetailsSideBar setReviewModal={setReviewModal} />
                <div className="w-full bg-richblack-900 overflow-y-auto">
                    <Outlet />
                </div>
            </div>

            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </div>
    )
}