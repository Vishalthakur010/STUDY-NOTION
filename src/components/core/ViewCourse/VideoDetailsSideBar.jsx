import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { IconBtn } from "../../common/IconBtn"
import { AiOutlineDown } from "react-icons/ai"
import { FaArrowLeft } from "react-icons/fa"

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
            if (!courseSectionData?.length) return

            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id

            // set current section to open the subsection options
            setActiveStatus(courseSectionData[currentSectionIndex]?._id)

            // set current subSection to highlight it and show the video
            setVideoBarActive(activeSubSectionId)
        }
        setActiveFlag()
    }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId])

    return (
        <div className="flex h-[calc(100vh-3.5rem)] w-[320px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
            {/* Buttons */}
            <div className="flex items-center justify-between p-4 border-b border-richblack-700">
                <button
                    onClick={() => navigate("/dashboard/enrolled-courses")}
                    className="flex items-center gap-2 text-richblack-300 hover:text-richblack-25"
                >
                    <FaArrowLeft />
                    <span>Back</span>
                </button>

                <IconBtn
                    text="Add Review"
                    onclick={() => setReviewModal(true)}
                />
            </div>

            {/* Course Info */}
            <div className="p-4 border-b border-richblack-700">
                <p className="text-lg font-semibold text-richblack-25">{courseEntireData?.courseName}</p>
                <p className="text-sm text-richblack-300">
                    {completedLectures?.length}/{totalNoOfLectures} Lectures Completed
                </p>
            </div>

            {/* Sections and Subsections */}
            <div className="flex-1 overflow-y-auto">
                {courseSectionData?.map((section, index) => (
                    <div key={index} className="border-b border-richblack-700">
                        {/* Section Header */}
                        <div 
                            className="flex cursor-pointer items-center justify-between p-4 hover:bg-richblack-700"
                            onClick={() => setActiveStatus(activeStatus === section._id ? "" : section._id)}
                        >
                            <p className="font-medium text-richblack-25">{section?.sectionName}</p>
                            <AiOutlineDown className={`transition-transform ${activeStatus === section._id ? "rotate-180" : ""}`} />
                        </div>

                        {/* Subsections */}
                        {activeStatus === section._id && (
                            <div className="bg-richblack-900">
                                {section?.subSection?.map((subSec, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex cursor-pointer items-center gap-3 p-4 hover:bg-richblack-800
                                            ${videoBarActive === subSec._id
                                                ? "bg-yellow-50 text-richblack-900"
                                                : "text-richblack-25"
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
                                            onChange={() => {}}
                                            className="h-4 w-4 rounded border-richblack-300 text-yellow-50 focus:ring-0"
                                        />
                                        <p className="text-sm">{subSec?.title}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}