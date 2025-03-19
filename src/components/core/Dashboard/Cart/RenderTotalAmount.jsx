import { useSelector } from "react-redux"
import {IconBtn} from "../../../common/IconBtn"

export const RenderTotalAmount = () => {
    const {total} = useSelector( (state) => state.cart)

    const handleBuyCourse = () => {
        const course = cart.map((course) => course._id)
        console.log("Bought these courses : ", course)

        //Todo: API integration for payment
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