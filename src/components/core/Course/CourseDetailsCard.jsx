import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaShareFromSquare } from "react-icons/fa6";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";

export const CourseDetailsCard = ({
    course,
    setConfirmationModal,
    handleBuyCourse
}) => {

    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor, you can not buy a course")
            return
        }
        if(token){
            dispatch(addToCart(course))
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

    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link Copied to Clipboard")
    }

    return (
        <div className="m-4">
            <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="max-h-[300px] min-h-[180px] w-[400px] rounded-xl"
            />

            <p>
                Rs {course?.price}
            </p>

            <div className="flex flex-col">
                <button
                    onClick={
                        user && course?.studentEnrolled.includes(user._id)
                            ? (() => navigate("/dashboard/enrolled-courses"))
                            : handleBuyCourse
                    }
                >
                    {
                        user && course?.studentEnrolled.includes(user._id)
                            ? "Go to Course"
                            : "Buy Now"
                    }
                </button>

                {
                    !course?.studentEnrolled.includes(user._id) &&
                    <button onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                }
            </div>

            <div>
                <p>
                    30-Day Money-Back Guarantee
                </p>
                <p>
                    This Course includes :
                </p>

                <div>
                    {
                        course?.instructions.map((item, index) => (
                            <p key={index} className="text-caribbeangreen-300 font-bold">
                                <span>{item}</span>
                            </p>
                        ))
                    }
                </div>
            </div>

            <button
            onClick={handleShare}
            className="flex items-center gap-2 text-yellow-100 font-semibold"
            >
                <FaShareFromSquare/>
                Share
            </button>
        </div>
    )
}
// 168 :- 1:12 