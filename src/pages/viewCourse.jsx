import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { getFullCourseDetails } from "../services/operations/courseDetailsAPI"
import { setComplatedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../slices/viewCourseSlice"

export const viewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false)
    const {courseId}=useParams()
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()

    useEffect(()=>{
        const setCourseSpecificDetails=async()=>{
            const courseData = await getFullCourseDetails(courseId, token)
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent))
            dispatch(setEntireCourseData(courseData?.courseDetails))
            dispatch(setComplatedLectures(courseData?.complatedVideos))
            let lectures =0
            courseData?.courseDetails?.courseContent.forEach((sec)=>{
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))
        }
        setCourseSpecificDetails()
    },[])


    return (
        <div>

            <div>
                <VideoDetailsSideBar setReviewModal={setReviewModal} />
                <div>
                    <Outlet />
                </div>
            </div>

            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </div>
    )
}