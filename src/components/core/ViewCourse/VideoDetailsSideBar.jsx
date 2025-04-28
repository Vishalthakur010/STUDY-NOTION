import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { IconBtn } from "../../common/IconBtn"

export const VideoDetailsSideBar = ({setReviewModal}) => {

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

    useEffect(()=>{
        const setActiveFlag =()=>{
            if(!courseSectionData.length)
                return

            const currentSectionIndex= courseSectionData?.findIndex(
                (data)=>data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data)=>data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id

            // set current section to open the subsection options
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)

            // set current subSection to highlight it and show the video
            setVideoBarActive(activeSubSectionId)
        }
        setActiveFlag
    },[courseSectionData, courseEntireData, location.pathname])

    return (
        <div>
            {/* Buttons*/}
            <div>

                {/* Back Button */}
                <div
                onClick={()=>{
                    navigate("/dashboard/enrolled-courses")
                }}
                >
                    Back
                </div>

                {/* Add Review Button */}
                <div>
                    <IconBtn
                    text={"Add Review"}
                    onclick={()=>setReviewModal(true)}
                    />
                </div>
            </div>

            {/* Heading and title */}
            <div>
                <p>{courseEntireData?.courseName}</p>
                <p>{completedLectures?.length}/{totalNoOfLectures}</p>
            </div>
        </div>
    )
}
// 52