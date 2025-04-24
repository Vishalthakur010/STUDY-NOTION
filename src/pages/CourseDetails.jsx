import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import { useEffect, useState } from "react"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "../pages/Error"
import { ConfirmationModal } from "../components/common/ConfirmationModal"
import { RatingStars } from "../components/common/RatingStars"
import { formDate } from "../services/operations/formDate"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { CourseDetailsCard } from "../components/core/Course/CourseDetailsCard"

export const CourseDetails = () => {

    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { courseId } = useParams()
    const [confirmationModal, setConfirmationModal] = useState(null)

    // get courseData
    const [courseData, setCourseData] = useState(null)
    useEffect(() => {
        const getCourseFullDetails = async () => {
            const result = await fetchCourseDetails(courseId)
            setCourseData(result)
        }
        getCourseFullDetails()
    }, [courseId])
    // console.log("courseData : ", courseData)

    // get review count
    const [avgReviewCount, setAvgReviewCount] = useState(0)
    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReview)
        setAvgReviewCount(count)
    }, [courseData])
    // console.log("avgReviewCount : ", avgReviewCount)

    //get total lecture
    const [totalLecture, setTotalLecture] = useState(0)
    useEffect(() => {
        let lectures = 0
        courseData?.data?.courseDetails?.courseContent.forEach((sec) => {
            lectures += sec.subSection?.length || 0
        })
        setTotalLecture(lectures)
    }, [courseData])
    // console.log("totalLecture : ", totalLecture)


    const handleBuyCourse = () => {
        if (token) {
            buyCourse([courseId], token, navigate, dispatch, user)
            return
        }
        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to purchase the course",
            btn1text: "Login",
            btn2text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2handler: () => setConfirmationModal(null)
        })
    }

    if (loading || !courseData) {
        return (
            <div>Loading...</div>
        )
    }
    if (!courseData.success) {
        return (
            <Error />
        )
    }


    const {
        _id: course_id,
        courseName,
        coursedescription,
        thumbnail,
        price,
        courseContent,
        instructor,
        studentEnrolled,
        whatYouWillLearn,
        totalDuration,
        ratingAndReview,
        createdAt
    } = courseData?.data?.courseDetails

    return (
        <div className="text-white w-full">

            {/* Section 1 */}
            <div className="bg-richblack-800">

                <div className="flex flex-col gap-4 text-richblack-5 w-11/12 
                    max-w-maxContent mx-auto pt-[100px] pb-[100px] relative">
                    <p className="text-5xl text-richblack-5 font-bold">{courseName}</p>
                    <p className="text-richblack-300 text-lg font-semibold">{coursedescription}</p>

                    <div className="flex items-center gap-2 text-lg font-semibold">
                        <span className="text-yellow-50 ">{avgReviewCount}</span>
                        <span>{<RatingStars Review_Count={avgReviewCount} Star_Size={24} />}</span>
                        <span>{`(${ratingAndReview.length} reviews)`}</span>
                        <span>{`${studentEnrolled.length} Students enrolled`}</span>
                    </div>

                    <p className="text-lg font-semibold">
                        {`Created By ${instructor.firstName} ${instructor.lastName}`}
                    </p>

                    <div className="flex items-center gap-4 text-lg font-semibold">
                        <p className="flex items-center gap-2">

                            <BiInfoCircle /> {`Created at ${formDate(createdAt)}`}
                        </p>
                        <p className="flex items-center gap-2">
                            <HiOutlineGlobeAlt /> {" "} English
                        </p>
                    </div>

                    <div className="absolute right-0 bg-richblack-700">
                        <CourseDetailsCard
                            course={courseData?.data?.courseDetails}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>
                </div>
            </div>


            {/* <button className="bg-yellow-50 p-6"
                onClick={() => handleBuyCourse()}
            >
                Buy Now
            </button> */}

            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        </div>
    )
}
// 168 - 16 min