import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { markLectureAsCompleted } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import ReactPlayer from 'react-player'
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

    const [videoData, setVideoData] = useState(null)
    const [videoEnded, setVideoEnded] = useState(false)
    const [loading, setLoading] = useState(false)

    // on first render it is set to first subsection of first section
    useEffect(() => {
        const setVideoSpecificDetails = async () => {
            if (!courseSectionData?.length) {
                return
            }
            if (!courseId || !sectionId || !subSectionId) {
                navigate("/dashboard/enrolled-courses")
                return
            }

            // find the current section
            const currentSection = courseSectionData.find(
                (section) => section._id === sectionId
            )

            if (!currentSection) {
                console.error("Section not found")
                return
            }

            // find the current subsection
            const currentSubSection = currentSection.subSection.find(
                (subSec) => subSec._id === subSectionId
            )

            if (!currentSubSection) {
                console.error("Subsection not found")
                return
            }

            setVideoData(currentSubSection)
            setVideoEnded(false)
        }

        setVideoSpecificDetails()
    }, [courseSectionData, courseId, sectionId, subSectionId, navigate, location.pathname])

    // if this is first video
    const isFirstVideo = () => {
        if (!courseSectionData?.length) return false

        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )
        return currentSectionIndex === 0 && currentSubSectionIndex === 0
    }

    // if this is last video
    const isLastVideo = () => {
        if (!courseSectionData?.length) return false

        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        return currentSectionIndex === courseSectionData.length - 1 &&
            currentSubSectionIndex === noOfSubSection - 1
    }

    // To go next video
    const goToNextVideo = () => {
        if (!courseSectionData?.length) return

        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if (currentSubSectionIndex !== noOfSubSection - 1) {
            // if this is not the last video of the same section
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        } else if (currentSectionIndex !== courseSectionData.length - 1) {
            // if this is the last video of the section, go to first video of next section
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
            const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
    }

    // To go previous video
    const goToPrevVideo = () => {
        if (!courseSectionData?.length) return

        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if (currentSubSectionIndex !== 0) {
            // if this is not the first video of the same section
            const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        } else if (currentSectionIndex !== 0) {
            // if this is the first video of the section, go to last video of previous section
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id
            const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length
            const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }
    }

    // To handle Lecture completion
    const handleLectureCompletion = async (courseId, subSectionId) => {
        if (!courseId || !subSectionId) return

        setLoading(true)
        const res = await markLectureAsCompleted({ courseId: courseId, subSectionId: subSectionId }, token)
        if (res) {
            dispatch(updateCompletedLectures(subSectionId))
        }
        setLoading(false)
    }

    if (!videoData) {
        return <div>Loading video...</div>
    }

    return (
        <div className="w-full">
            <div className="relative pt-[56.25%]">
                <ReactPlayer
                    ref={playerRef}
                    url={videoData.videoUrl}
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                    controls
                    onEnded={() => setVideoEnded(true)}
                />
                {videoEnded && (
                    <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] p-4 flex flex-col items-center justify-center gap-2">
                        {!completedLectures.includes(subSectionId) && (
                            <IconBtn
                                disabled={loading}
                                text={loading ? "Loading..." : "Mark as completed"}
                                onclick={() => handleLectureCompletion(courseId, subSectionId)}
                            />
                        )}

                        {/* Rewatch button */}
                        <div>
                            <IconBtn
                                text="Rewatch"
                                disabled={loading}
                                onclick={() => {
                                    if (playerRef?.current) {
                                        playerRef.current.seekTo(0)
                                        setVideoEnded(false)
                                    }
                                }}
                            />
                        </div>

                        {/* Previous and Next button */}
                        <div className="flex gap-4 mt-4">
                            {!isFirstVideo() && (
                                <button
                                    disabled={loading}
                                    onClick={goToPrevVideo}
                                    className="blackButton"
                                >
                                    Previous
                                </button>
                            )}
                            {!isLastVideo() && (
                                <button
                                    disabled={loading}
                                    onClick={goToNextVideo}
                                    className="blackButton"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-4">
                <h1 className="mt-4 text-3xl font-semibold text-richblack-5">{videoData.title}</h1>
                <p className="pt-2 pb-6 text-richblack-5">{videoData.description}</p>
            </div>
        </div>
    )
}

export default VideoDetails
// 170 :- 1:05