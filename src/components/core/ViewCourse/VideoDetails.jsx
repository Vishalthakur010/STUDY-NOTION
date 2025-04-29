import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

function VideoDetails (){

    const {courseId, sectionId, subSectionId}=useParams()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const playerRef=useRef()
    const {token}=useSelector((state)=>state.auth)
    const {courseEntireData, courseSectionData, completedLectures}=useSelector((state)=>state.viewCourse)

    const [videoData, setVideoData]=useState([])
    const [videoEnded, setVideoEnded]=useState(false)
    const {loading, setLoading}=useState(false)

    const isFirstVideo =()=>{

    }
    const isLastVideo=()=>{

    }
    const goToNextVideo=()=>{

    }
    const goToPrevVideo=()=>{

    }
    const handleLectureCompletion =()=>{

    }
    return (
        <div>
            hello
        </div>
    )
}
export default VideoDetails
// 169 :- 1:52 