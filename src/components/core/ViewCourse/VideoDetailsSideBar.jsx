import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { IconBtn } from "../../common/IconBtn"
import { AiOutlineDown } from "react-icons/ai"


export const VideoDetailsSideBar = ({ setReviewModal }) => {

    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const { sectionId, subSectionId } = useParams()
    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures
    } = useSelector((state) => state.viewCourse)

    useEffect(() => {
        const setActiveFlag = () => {
            if (!courseSectionData.length)
                return

            const currentSectionIndex = courseSectionData?.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id

            // set current section to open the subsection options
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)

            // set current subSection to highlight it and show the video
            setVideoBarActive(activeSubSectionId)
        }
        setActiveFlag
    }, [courseSectionData, courseEntireData, location.pathname])

    return (
        <div>
            {/* Buttons*/}
            <div>

                {/* Back Button */}
                <div
                    onClick={() => {
                        navigate("/dashboard/enrolled-courses")
                    }}
                >
                    Back
                </div>

                {/* Add Review Button */}
                <div>
                    <IconBtn
                        text={"Add Review"}
                        onclick={() => setReviewModal(true)}
                    />
                </div>
            </div>

            {/* Heading and title */}
            <div>
                <p>{courseEntireData?.courseName}</p>
                <p>{completedLectures?.length}/{totalNoOfLectures}</p>
            </div>

            {/* sections and subsection */}
            <div>
                {
                    courseSectionData?.map((section, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveStatus(section?._id)}
                        >

                            {/* section */}
                            <div>
                                <p>{section?.sectionName}</p>
                                <AiOutlineDown />
                            </div>

                            {/* subsection */}
                            {
                                activeStatus === section?._id &&
                                (
                                    <div>
                                        {
                                            section?.map((subSec, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex gap-3 p-7
                                                    ${videoBarActive === subSec._id
                                                            ? "bg-yellow-50 text-richblack-900"
                                                            : "bg-richblack-900 text-white"
                                                        }
                                                    `}
                                                    onClick={() => {
                                                        navigate(`/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subSec._id}`)
                                                        setVideoBarActive(subSec._id)
                                                    }}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={completedLectures.includes(subSec._id)}
                                                    // onChange={()=>()}
                                                    />

                                                    <p>
                                                        {subSec?.title}
                                                    </p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
// 52