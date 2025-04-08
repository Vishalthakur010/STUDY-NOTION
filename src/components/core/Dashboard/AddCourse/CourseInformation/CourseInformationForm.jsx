import { useEffect, useState } from "react"
import { Form, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md";
import ChipInput from "./ChipInput"
import { Upload } from "../Upload"
import { RequirementField } from "./RequirementField"
import { IconBtn } from "../../../../common/IconBtn"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import toast from "react-hot-toast"
import { COURSE_STATUS } from "../../../../../utils/constants"


export const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm()

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { course, editCourse } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])

    //function for fetching category
    const getCategories = async () => {
        setLoading(true)
        try {
            const categories = await fetchCourseCategories()
            if (categories.length > 0) {
                setCourseCategories(categories)
            }
            // console.log(categories)
        } catch (error) {
            console.error("Error fetching categories:", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (editCourse) {
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.coursedescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tags)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }

        getCategories()
    }, [])

    const isFormUpdated = () => {
        const currentValue = getValues()
        if (currentValue.courseTitle !== course.courseName ||
            currentValue.courseShortDesc !== course.coursedescription ||
            currentValue.coursePrice !== course.price ||
            currentValue.courseTags.toString() !== course.tags.toString() ||
            currentValue.courseBenefits !== course.whatYouWillLearn ||
            currentValue.courseCategory._id !== course.category.id ||
            currentValue.courseRequirements.toString() !== course.instructions.toString() ||
            currentValue.courseImage !== course.thumbnail
        )
            return true
        else
            return false
    }

    // function for handling form submission
    const onSubmit = async (data) => {

        // edit an existing course
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValue = getValues()
                const formData = new FormData()

                formData.append("courseId", course._id)

                if (currentValue.courseTitle != course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValue.courseShortDesc != course.coursedescription) {
                    formData.append("coursedescription", data.courseShortDesc)
                }
                if (currentValue.coursePrice != course.price) {
                    formData.append("price", data.coursePrice)
                }
                if (currentValue.courseTags.toString() != course.tags.toString()) {
                    formData.append("tags", JSON.stringify(data.courseTags))
                }
                if (currentValue.courseBenefits != course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValue.courseCategory._id != course.category._id) {
                    formData.append("category", data.courseCategory)
                }
                if (currentValue.courseRequirements.toString() != course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements))
                }
                if (currentValue.courseImage != course.thumbnailImage) {
                    formData.append("thumbnailImage", data.courseImage)
                }

                setLoading(true)
                const result = await editCourseDetails(formData, token)
                        console.log("edit courseDetails Result:", result)
                if (result) {
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                    // toast.success("Course details updated successfully")
                }
                setLoading(false)
            }
            else {
                toast.error("No changes made to the course details")
            }
            return
        }

        // create a new course
        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("coursedescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tags", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("status", COURSE_STATUS.DRAFT)

        // Handle file upload
        if (data.courseImage && data.courseImage instanceof File) {
            formData.append("thumbnailImage", data.courseImage);
        }

        // console.log("Form Data Contents:", Array.from(formData.entries()));

        setLoading(true)
        const result = await addCourseDetails(formData, token)
        // console.log("Result:", result)
        if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
            // toast.success("Course details added successfully")
        }
        setLoading(false)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full rounded-lg border-richblack-700 bg-richblack-800 p-6 flex flex-col gap-5">

            {/* course title */}
            <div className="flex flex-col gap-2">
                <label htmlFor="courseTitle" className="label-style">
                    Course Title <sup className="text-pink-200">*</sup>
                </label>
                <input
                    type="text"
                    name="courseTitle"
                    id="courseTitle"
                    placeholder="Enter Course Title"
                    {...register("courseTitle", { required: true })}
                    className="form-style"
                />
                {
                    errors.courseTitle &&
                    <span className="text-xs text-pink-200 tracking-wide ml-2">
                        Course Title is required
                    </span>
                }
            </div>

            {/* course short description */}
            <div className="flex flex-col gap-2">
                <label htmlFor="courseShortDesc" className="label-style">
                    Course Short Description <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    name="courseShortDesc"
                    id="courseShortDesc"
                    placeholder="Enter Description"
                    rows={4}
                    {...register("courseShortDesc", { required: true })}
                    className="form-style" />
                {
                    errors.courseShortDesc &&
                    <span className="text-xs text-pink-200 tracking-wide ml-2">
                        Course Short Description is required
                    </span>
                }
            </div>

            {/* course price */}
            <div className="flex flex-col gap-2 relative">
                <label htmlFor="coursePrice" className="label-style">
                    Price <sup className="text-pink-200">*</sup>
                </label>
                <input
                    name="coursePrice"
                    type="number"
                    id="coursePrice"
                    placeholder={`Enter Price`}
                    {...register("coursePrice", {
                        required: true,
                        valueAsNumber: true,
                    })}
                    className="text-richblack-5 placeholder:text-richblack-400 text-[16px] leading-[24px] 
                    focus:outline-none bg-richblack-700 p-3 pl-7 rounded-lg shadow-sm shadow-richblack-100" />
                <HiOutlineCurrencyRupee className="absolute top-11 left-2 text-richblack-400" />
                {
                    errors.coursePrice &&
                    <span className="text-xs text-pink-200 tracking-wide ml-2">
                        Course Price is required
                    </span>
                }
            </div>

            {/* course category */}
            <div className="flex flex-col gap-2">
                <label htmlFor="courseCategory" className="label-style">
                    Category <sup className="text-pink-200">*</sup>
                </label>
                <select
                    name="courseCategory"
                    id="courseCategory"
                    defaultValue=""
                    {...register("courseCategory", { required: true })}
                    className="form-style"
                >
                    <option value="" disabled>Choose Category</option>
                    {
                        !loading && courseCategories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
                {
                    errors.courseCategory &&
                    <span className="text-xs text-pink-200 tracking-wide ml-2">
                        Course Category is required
                    </span>
                }
            </div>

            {/* course tags*/}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and press ',' or Enter"
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
            />

            {/* course thumbnail image*/}
            <Upload
                label="Course Thumbnail"
                name="courseImage"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />

            {/* Benefits of course */}
            <div className="flex flex-col gap-2">
                <label htmlFor="courseBenefits" className="label-style">
                    Benefits of the course <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    name="courseBenefits"
                    id="courseBenefits"
                    rows={4}
                    placeholder="Enter Benefits of the course"
                    {...register("courseBenefits", { required: true })}
                    className="form-style"
                >

                </textarea>
                {
                    errors.courseBenefits &&
                    <span className="text-xs text-pink-200 tracking-wide ml-2">
                        Course Benefits are required
                    </span>
                }
            </div>

            {/* Requirements/Instructions */}
            <RequirementField
                label="Requirements/Instructions"
                name="courseRequirements"
                placeholder="Enter Requirements/Instructions"
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
            />

            {/* buttons */}
            <div className="flex gap-2  justify-end">
                {
                    editCourse && (
                        <button
                            onClick={() => dispatch(setStep(2))}
                            className="flex items-center gap-2 p-2 rounded-md text-richblack-900 font-semibold bg-richblack-400"
                        >
                            Continue without Saving
                        </button>
                    )
                }
                <IconBtn
                    text={editCourse ? "Save Changes" : "Next"}
                    type="submit"
                >
                    <MdNavigateNext />
                </IconBtn>
            </div>
        </form>
    )
}