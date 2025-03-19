import { IoIosStarOutline } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { RiDeleteBin6Fill } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";

export const RenderCartCourses = () => {

    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    return (
        <div>
            {
                cart.map((course, index) => (
                    <div>
                        <div>
                            <img
                                src={course.thumbnail}
                                alt="Course Thumbnail" />
                        </div>

                        <div>
                            <p>
                                {course?.courseName}
                            </p>
                            <p>
                                {course?.category?.name}
                            </p>
                            <div>
                                <span>4.8</span>

                                <ReactStars
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

                        <div>
                            <button
                            onClick={dispatch(removeFromCart(course._id))}
                            >
                                <RiDeleteBin6Fill />
                                <span>
                                    Remove
                                </span>
                            </button>
                            <p>
                                Rs {course?.price}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}