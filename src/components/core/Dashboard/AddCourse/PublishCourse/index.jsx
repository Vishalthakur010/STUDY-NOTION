import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { IconBtn } from "../../../../common/IconBtn"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import { useNavigate } from "react-router-dom"
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"

export const PublishCourse = () => {

    const { register, handleSubmit, setValue, getValues } = useForm()
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true)
        }
    }, [course?.status])

    const goBack = () => {
        dispatch(setStep(2))
    }

    const goToCourse = () => {
        dispatch(resetCourseState())
        // navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async () => {
        if (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
            course?.status === COURSE_STATUS.DRAFT && getValues("public") === false) {
            // No updation in form
            // No need to make API call
            goToCourse()
            return
        }

        //if form is updated
        const formData = new FormData()
        formData.append("courseId", course._id)
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        formData.append("status", courseStatus)

        //API call
        setLoading(true)
        const result = await editCourseDetails(formData, token)

        if(result){
            goToCourse()
        }
        setLoading(false)
    }
    const onsubmit = async (data) => {
        handleCoursePublish()
        navigate("/dashboard/my-courses")
    }

    return (
        <div className="flex flex-col gap-5 w-full rounded-lg border-richblack-700 bg-richblack-800 p-6 ">
            <h2 className="text-richblack-5 text-2xl font-semibold">Publish Course</h2>

            <form
                onSubmit={handleSubmit(onsubmit)}
                className="flex flex-col gap-2"
            >
                <div
                    className="flex gap-2 items-center"
                >
                    <input
                        type="checkbox"
                        id="public"
                        {...register("public")}
                        className="w-4 h-4"
                    />
                    <label htmlFor="public" className="label-style">
                        Make this course as public
                    </label>
                </div>

                <div className="flex gap-3 place-self-end">
                    <button
                        disabled={loading}
                        onClick={goBack}
                        className="cursor-pointer rounded-md bg-richblack-500 px-5 py-2 text-richblack-900 font-semibold"
                    >
                        Back
                    </button>
                    <IconBtn
                        disabled={loading}
                        text={"Save Changes"}
                    />
                </div>

            </form>

        </div>
    )
}