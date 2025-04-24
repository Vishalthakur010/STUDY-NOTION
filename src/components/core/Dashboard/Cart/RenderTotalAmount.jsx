import { useSelector } from "react-redux"
import {IconBtn} from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export const RenderTotalAmount = () => {
    const {total} = useSelector( (state) => state.cart)

    const handleBuyCourse = () => {
        const course = cart.map((course) => course._id)
        console.log("Bought these courses : ", course)
        const {token}=useSelector((state)=>state.auth)
        const {user} = useSelector((state)=>state.profile)

        //Todo: API integration for payment
        buyCourse(course, token, navigate, dispatch, user)
    }

    return(
        <div>
            <p>
                Total
            </p>
            <p>
                Rs {total}
            </p>

            <IconBtn
            text="Buy Now"
            onclick={handleBuyCourse}
            customClasses={"w-full justify-centre"}
            />
        </div>
    )
}