import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { buyCourse } from "../services/operations/studentFeaturesAPI"

export const CourseDetails = ()=>{

    const {user} = useSelector((state)=> state.profile)
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {courseId} = useParams()

    const handleBuyCourse =()=>{
        if(token){
            buyCourse([courseId], token, navigate, dispatch, user)
            return
        }
    }

    return (
        <div className="flex items-center justify-center">
            <button className="bg-yellow-50 p-6"
                onClick={()=> handleBuyCourse()}
            >
                Buy Now
            </button>
        </div>
    )
}