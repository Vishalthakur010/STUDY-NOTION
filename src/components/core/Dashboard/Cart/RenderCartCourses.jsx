import { IoIosStarOutline } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { RiDeleteBin6Fill } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";
import { RatingStars } from "../../../common/RatingStars";

export const RenderCartCourses = () => {

    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    return (
        <div className="w-full">
            {
                cart.map((course, index) => (
                    <div key={index}
                        className="flex gap-28 border-t-2 border-richblack-600 mb-6 pt-6"
                    >
                        <div className="flex gap-4">
                            {/* image */}
                            <img
                                src={course.thumbnail}
                                alt="Course Thumbnail"
                                className="h-[150px] w-[250px] "
                            />

                            {/* description */}
                            <div className="flex flex-col gap-2">
                                <p className="text-xl font-semibold text-richblack-25">
                                    {course?.courseName}
                                </p>
                                <p className="text-sm font-semibold text-richblack-300">
                                    {course?.category?.name}
                                </p>
                                <div className="flex gap-2 text-richblack-200">
                                    <span>4.8</span>

                                    <RatingStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<IoIosStarOutline />}
                                        fullIcon={<IoIosStarOutline />}
                                    />

                                    <span>
                                        {course?.ratingAndReview?.length} Ratings
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => dispatch(removeFromCart(course._id))}
                                className="flex items-center gap-1 text-lg font-semibold text-pink-200 p-3 bg-richblack-700"
                            >
                                <RiDeleteBin6Fill />
                                <span>
                                    Remove
                                </span>
                            </button>
                            <p className="grid place-items-end text-2xl font-bold text-yellow-200">
                                Rs {course?.price}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}