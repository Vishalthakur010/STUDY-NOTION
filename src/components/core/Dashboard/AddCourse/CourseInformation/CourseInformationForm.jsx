import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import ChipInput from "./ChipInput"
import { Upload } from "../Upload"
import { RequirementField } from "./RequirementField"


export const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm()

    const dispatch = useDispatch()
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
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }

        getCategories()
    }, [])

    const onSubmit = async (data) => {

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
                    id="courseTitle"
                    placeholder="Enter Course Title"
                    {...register("courseTitle", { required: true })}
                    className="form-style"
                />
                {
                    errors.courseTitle &&
                    <p className="text-red-400 text-sm">{errors.courseTitle.message}</p>
                }
            </div>

            {/* course short description */}
            <div className="flex flex-col gap-2">
                <label htmlFor="courseShortDesc" className="label-style">
                    Course Short Description <sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    id="courseShortDesc"
                    placeholder="Enter Description"
                    rows={4}
                    {...register("courseShortDesc", { required: true })}
                    className="form-style" />
                {
                    errors.courseShortDesc &&
                    <p className="text-red-400 text-sm">{errors.courseShortDesc.message}</p>
                }
            </div>

            {/* course price */}
            <div className="flex flex-col gap-2 relative">
                <label htmlFor="coursePrice" className="label-style">
                    Price <sup className="text-pink-200">*</sup>
                </label>
                <input
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
                    <p className="text-red-400 text-sm">{errors.coursePrice.message}</p>
                }
            </div>

            {/* course category */}
            <div className="flex flex-col gap-2">
                <label htmlFor="courseCategory" className="label-style">
                    Category <sup className="text-pink-200">*</sup>
                </label>
                <select
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
                    <p className="text-red-400 text-sm">{errors.courseCategory.message}</p>
                }
            </div>

            {/* course tags*/}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and press Enter"
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
                {...register("courseBenefits", {required:true})}
                className="form-style"
                >

                </textarea>
                {
                    errors.courseBenefits &&
                        <p className="text-red-400 text-sm">{errors.courseBenefits.message}</p>
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
            <div>
                {
                    editCourse && (
                        <button
                        onClick={()=> dispatch(setStep(2))}
                        >
                            Continue without Saving
                        </button>
                    )
                }
            </div>
        </form>
    )
}