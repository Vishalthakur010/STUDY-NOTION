import { useSelector } from "react-redux"


export const Cart = () => {

    const {total, totalItems}= useSelector((state) => state.cart)

    return (
        <div className="flex flex-col gap-6 w-[70%] text-richblack-25 mx-auto mt-6">
            <h1 className="text-3xl font-semibold">
                Your Cart
            </h1>

            <p>
                {totalItems} Courses in Wishlist
            </p>

            {
                total > 0 ? 
                (
                    <div>
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