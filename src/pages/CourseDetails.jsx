import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import { useEffect, useState } from "react"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import GetAvgRating from "../utils/avgRating"

export const CourseDetails = () => {

    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { courseId } = useParams()

    // get courseData
    const [courseData, setCourseData] = useState(null)
    useEffect(() => {
        const getCourseFullDetails = async () => {
            const result = await fetchCourseDetails(courseId)
            setCourseData(result)
        }
        getCourseFullDetails()
    }, [courseId])
    console.log("courseData : ", courseData)

    // get review count
    const [avgReviewCount, setAvgReviewCount] = useState(0)
    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReview)
        setAvgReviewCount(count)
    }, [courseData])
    console.log("avgReviewCount : ", avgReviewCount)

    //get total lecture
    const [totalLecture, setTotalLecture] = useState(0)
    useEffect(() => {
        let lectures = 0
        courseData?.data?.courseDetails?.courseContent.forEach((sec)=>{
            lectures += sec.subSection?.length || 0
        })
        setTotalLecture(lectures)
    }, [courseData])
    

    const handleBuyCourse = () => {
        if (token) {
            buyCourse([courseId], token, navigate, dispatch, user)
            return
        }
    }

    return (
        <div className="flex items-center justify-center">
            <button className="bg-yellow-50 p-6"
                onClick={() => handleBuyCourse()}
            >
                Buy Now
            </button>
        </div>
    )
}