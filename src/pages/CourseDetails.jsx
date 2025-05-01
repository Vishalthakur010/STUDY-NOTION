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
import { Footer } from "../components/common/Footer"
import { CourseAccordionBar } from "../components/core/Course/CourseAccordionBar"

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

    const [isActive, setIsActive] = useState(Array(0))
    const handleActive = (id) => {
        // If id is an array, directly set it as the new state
        if (Array.isArray(id)) {
            setIsActive(id)
            return
        }
        
        // Toggle individual section
        setIsActive(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id]
        )
    }


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

    if (loading || !courseData || paymentLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
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
        ratingAndReview,
        createdAt
    } = courseData?.data?.courseDetails

    return (
        <div className="text-white w-full overflow-y-auto">

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

                    <div className="lg:absolute lg:top-[80px] lg:right-0 bg-richblack-700 rounded-lg">
                        <CourseDetailsCard
                            course={courseData?.data?.courseDetails}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>
                </div>
            </div>

            {/* section 2 */}
            <div className="w-11/12 max-w-maxContent mx-auto mb-12">

                <div className=" w-[65%] flex flex-col gap-10">

                    {/* What you will learn */}
                    <div className=" p-6 border-[1px] border-richblack-400 mt-[50px] flex flex-col gap-4">
                        <p className="text-4xl font-bold">What you'll learn</p>
                        <p className="text-xl font-bold text-richblack-300">{whatYouWillLearn}</p>
                    </div>

                    {/* course content */}
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-4">
                            <p className="text-4xl font-bold">Course Content</p>
                            <div className="flex gap-2 text-richblack-300 font-semibold">
                                <span>{courseContent.length} section(s)</span>
                                <span>{totalLecture} lecture(s)</span>
                                <span>{courseData?.data?.totalDuration} total length</span>
                            </div>
                        </div>

                        <button
                            onClick={() => handleActive([])}
                            className="font-semibold text-yellow-50"
                        >
                            Collapse all Sections
                        </button>
                    </div>

                    {/* Course Details Accordion*/}
                    {
                        courseContent?.map((course, index) => (
                            <CourseAccordionBar
                                key={index}
                                course={course}
                                isActive={isActive}
                                handleActive={handleActive}
                            />
                        ))
                    }


                    {/* Author Detail */}
                    <div className="flex flex-col gap-4">
                        <p className="text-3xl font-bold">Author</p>

                        <div className="flex items-center gap-3">
                            <img
                                src={
                                    instructor?.image ?
                                        instructor?.image
                                        : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor?.firstName} ${instructor?.lastName}`
                                }
                                className="w-14 h-14 rounded-full"
                            />
                            <p className="font-bold">{instructor?.firstName} {instructor?.lastName}</p>
                        </div>

                        <p className="text-richblack-50 font-semibold">{instructor?.additionalDetails?.about}</p>
                    </div>

                </div>
            </div>

            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }

            <Footer />
        </div>
    )
}
// 168 - 16 min