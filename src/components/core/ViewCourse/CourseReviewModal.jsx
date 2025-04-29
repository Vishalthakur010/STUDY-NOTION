import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross1 } from "react-icons/rx"
import { useSelector } from "react-redux"
import ReactStars from "react-rating-stars-component";
import { IconBtn } from "../../common/IconBtn";
import { createRating } from "../../../services/operations/courseDetailsAPI";


const CourseReviewModal = ({ setReviewModal }) => {

    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { courseEntireData } = useSelector((state) => state.viewCourse)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm()

    useEffect(() => {
        setValue("courseExperience", "")
        setValue("courseRating", 0)
    }, [])

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating)
    }

    const onSubmit = async (data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience
            },
            token
        )
        setReviewModal(false)
    }

    return (
        <div>

            {/* Heading and cross button */}
            <div>
                <p>Add Review</p>
                <button
                    onClick={() => setReviewModal(false)}
                >
                    <RxCross1 />
                </button>
            </div>

            <div>
                <img
                    src={user?.image}
                    alt={`${user?.firstName} ${user?.lastName} image`}
                />

                <div>
                    <p>{user?.firstName} {user?.lastName}</p>
                    <p>Posting Publicly</p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center"
            >
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                />

                <div>
                    <label htmlFor="courseExperience" className="label-style">
                        Add your Experence
                    </label>
                    <textarea
                        id="courseExperience"
                        placeholder="Add your Experience"
                        {...register("courseExperience", { required: true })}
                        className="form-style"
                    />
                    {
                        errors.courseExperience && (
                            <span>
                                Please add your Experience
                            </span>
                        )
                    }
                </div>

                <div>
                    <button
                        onClick={() => setReviewModal(false)}
                    >
                        Cancel
                    </button>
                    <IconBtn
                        text={Save}
                    />
                </div>

            </form>
        </div>
    )
}
export default CourseReviewModal