import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IconBtn } from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export const RenderTotalAmount = () => {
    const { total, cart } = useSelector((state) => state.cart)
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleBuyCourse = () => {
        const courseIds = cart.map((course) => course._id)
        console.log("Bought these courses : ", courseIds)
        buyCourse(courseIds, token, navigate, dispatch, user)
    }

    return (
        <div className="bg-richblack-800 p-4 h-fit w-[300px] space-y-2 rounded-md">
            <p className="text-richblack-100 text-sm">
                Total
            </p>
            <p className="text-yellow-50 pb-4 text-2xl font-bold">
                Rs {total}
            </p>

            <div className="">
                <IconBtn
                    text="Buy Now"
                    onclick={handleBuyCourse}
                    customClasses={"w-full text-center flex justify-center items-center"}
                />
            </div>
        </div>
    )
}