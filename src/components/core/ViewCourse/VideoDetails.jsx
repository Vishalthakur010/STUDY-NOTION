import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { markLectureAsCompleted } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import { Player } from 'video-react';
import '~video-react/dist/video-react.css';
import { BsPlayCircle } from "react-icons/bs";
import { IconBtn } from "../../common/IconBtn"

function VideoDetails() {

    const { courseId, sectionId, subSectionId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const playerRef = useRef()
    const { token } = useSelector((state) => state.auth)
    const { courseEntireData, courseSectionData, completedLectures } = useSelector((state) => state.viewCourse)

    const [videoData, setVideoData] = useState([])
    const [videoEnded, setVideoEnded] = useState(false)
    const { loading, setLoading } = useState(false)

    // on first render it is set to first subsection of first section
    useEffect(() => {
        const setVideoSpecificDetails = async () => {
            if (courseSectionData.length) {
                return
            }
            if (!courseId && !sectionId && !subSectionId) {
                navigate("/dashboard/enrolled-courses")
            }
            else {
                // assume all three fields are present
                const filteredData = courseSectionData.filter(
                    (section) => section._id === sectionId
                )
                const filteredVideoData = filteredData[0].subSection.filter(
                    (subSec) => subSec._id === subSectionId
                )

                setVideoData(filteredData)
                setVideoEnded(false)
            }
        }
    }, [courseEntireData, courseSectionData, location.pathname])

    // if this is first video
    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )
        if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true
        }
        else {
            return false
        }
    }

    // if this is last video
    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if (currentSectionIndex === courseSectionData.length - 1
            && currentSubSectionIndex === noOfSubSection - 1) {
            return true
        }
    }

    // To go next video
    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if (currentSubSectionIndex != noOfSubSection - 1) {
            // if this is not the last video of the same section
            // Go to next video of same section
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }
        else {
            // if this is the last video of the section
            // Go to first video of next section
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
            const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id
            // Go to this video
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
    }

    // To go previous video
    const goToPrevVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if (currentSubSectionIndex != 0) {
            // if this is not the first video of the same section
            // Go to previous video of same section
            const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex - 1]._id
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
        else {
            // if this is the first video of the section
            // Go to last video of previous section
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id
            const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length
            const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id
            // Go to this video
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }
    }

    // To handle Lecture completion
    const handleLectureCompletion = async (courseId, subSectionId) => {
        setLoading(true)
        const res = await markLectureAsCompleted({ courseId, subSectionId }, token)
        if (res) {
            dispatch(updateCompletedLectures())
        }
        setLoading(false)
    }
    return (
        <div>
            {
                !videoData
                    ? (
                        <div>No Video Found</div>
                    )
                    : (
                        <Player
                            ref={playerRef}
                            aspectRatio="16:9"
                            playsInline
                            onEnded={() => setVideoEnded(true)}
                            src={videoData?.videoUrl}
                        >

                            <BsPlayCircle/>

                            {
                                videoEnded && (
                                    <div>
                                        {/* Mark as completed button */}
                                        {
                                            completedLectures.includes(subSectionId) &&(
                                                <IconBtn
                                                disabled={loading}
                                                text={loading ? "Loading..." : "Mark as completed"}
                                                onclick={()=> handleLectureCompletion()}
                                                />
                                            )
                                        }

                                        {/* Rewatch button */}
                                        <IconBtn
                                        text={"Rewatch"}
                                        disabled={loading}
                                        onclick={()=>{
                                            if(playerRef?.current){
                                                playerRef.current?.seek(0)
                                                setVideoEnded(false)
                                            }
                                        }}
                                        />

                                        <div>
                                        {/* previous button */}
                                            {
                                                !isFirstVideo && (
                                                    <button
                                                    disabled={loading}
                                                    onClick={()=>goToPrevVideo}
                                                    className="blackbutton"
                                                    >
                                                        Previous
                                                    </button>
                                                )
                                            }

                                            {/* Next button */}
                                            {
                                                !isLastVideo &&(
                                                    <button
                                                    disabled={loading}
                                                    onClick={()=>goToNextVideo}
                                                    >
                                                        Next
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }

                        </Player>
                    )
            }

            <div>
                <h1>{videoData?.title}</h1>
                <p>{videoData?.description}</p>
            </div>
        </div>
    )
}
export default VideoDetails
// 169 :- 1:52 