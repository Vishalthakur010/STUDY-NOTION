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
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur text-richblack-25 bg-richblack-800 
        bg-opacity-55 flex items-center justify-center z-10">

            <div className="flex flex-col gap-4 items-center justify-center bg-richblack-800 rounded-md">
                {/* Heading and cross button */}
                <div className="bg-richblack-700 w-full flex justify-between p-3 font-semibold text-lg rounded-md">
                    <p>Add Review</p>
                    <button
                        onClick={() => setReviewModal(false)}
                    >
                        <RxCross1 />
                    </button>
                </div>

                {/* Image */}
                <div className="flex gap-2">
                    <img
                        src={user?.image}
                        alt={`${user?.firstName} ${user?.lastName} image`}
                        className="rounded-full aspect-square w-[40px]"
                    />

                    <div>
                        <p className="text-sm font-semibold">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs font-semibold">Posting Publicly</p>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 items-center -mt-2 p-6"
                >
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />

                    <div className="flex flex-col gap-2">
                        <label htmlFor="courseExperience" className="label-style">
                            Add your Experence
                        </label>
                        <textarea
                            id="courseExperience"
                            placeholder="Add your Experience"
                            {...register("courseExperience", { required: true })}
                            className="form-style w-[450px]"
                        />
                        {
                            errors.courseExperience && (
                                <span>
                                    Please add your Experience
                                </span>
                            )
                        }
                    </div>

                        {/* Cancel and save Button */}
                        <div className="flex gap-2 self-end mt-4">
                        <button
                            onClick={() => setReviewModal(false)}
                            className="px-4 py-2 bg-richblack-400 text-richblack-900 rounded-md"
                        >
                            Cancel
                        </button>
                        <IconBtn
                            text={"Save"}
                        />
                    </div>

                </form>
            </div>

        </div>
    )
}
export default CourseReviewModal