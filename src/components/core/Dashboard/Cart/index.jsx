import { useSelector } from "react-redux"
import { RenderCartCourses } from "./RenderCartCourses"
import { RenderTotalAmount } from "./RenderTotalAmount"


export const Cart = () => {

    const {total, totalItems}= useSelector((state) => state.cart)

    return (
        <div className="flex flex-col gap-6 w-[88%] text-richblack-25 mx-auto mt-6">
            <h1 className="text-3xl font-semibold">
                Your Cart
            </h1>

            <p className="text-richblack-300 font-bold">
                {totalItems} Courses in Cart
            </p>

            {
                total > 0 ? 
                (
                    <div className="lg:flex  gap-5">
                        <RenderCartCourses/>
                        <RenderTotalAmount/>
                    </div>
                )
                :(
                    <p>
                        Your cart is empty
                    </p>
                )
            }
            
        </div>
    )
}