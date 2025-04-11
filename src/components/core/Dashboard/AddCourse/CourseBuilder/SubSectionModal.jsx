import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { createSubsection, updateSubsection } from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import { RxCross1 } from "react-icons/rx"
import { Upload } from "../Upload"
import { IconBtn } from "../../../../common/IconBtn"
import { useState } from "react"
import toast from "react-hot-toast"

export const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    edit = false,
    view = false
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm()

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData?.title)
            setValue("lectureDesc", modalData?.description)
            setValue("lectureVideo", modalData?.videoUrl)
        }
    }, [])

    // to check if any changes have made to the form or not
    const isFormUpdated = () => {
        const currentValues = getValues()
        if (currentValues.lectureTitle !== modalData?.title ||
            currentValues.lectureDesc !== modalData?.description ||
            currentValues.lectureVideo !== modalData?.videoUrl
        ) {
            return true
        }
        else {
            return false
        }
    }

    const handleEditSubsection = async () => {
        const currentValues = getValues()
        const formData = new FormData()

        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)

        if (currentValues.lectureTitle !== modalData?.title) {
            formData.append("title", currentValues.lectureTitle)
        }
        if (currentValues.lectureDesc !== modalData?.description) {
            formData.append("description", currentValues.lectureDesc)
        }
        if (currentValues.lectureVideo !== modalData?.videoUrl) {
            formData.append("videoFile", currentValues.lectureVideo)
        }

        setLoading(true)
        //API CALL
        const result = await updateSubsection(formData, token)
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
    }

    const onSubmit = async (data) => {
        if (view) {
            return
        }
        if (edit) {
            if (!isFormUpdated) {
                toast.error("No changes made to the form")
                return
            }
            else {
                handleEditSubsection()
                return
            }
        }

        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("videoFile", data.lectureVideo)

        setLoading(true)
        //API CALL
        const result = await createSubsection(formData, token)

        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }

        setModalData(null)
        setLoading(false)
    }

    return (
        <div className="z-10 fixed top-0 left-0 w-full h-full rounded-lg backdrop-blur
         bg-richblack-700 bg-opacity-55 flex items-center justify-center">

            <div className="max-h-[90vh] overflow-y-auto rounded-lg bg-richblack-900">

                <div className="flex items-center rounded-t-lg bg-richblack-700  justify-between p-2">
                    <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                    <button
                        onClick={() => (!loading && setModalData(null))}
                        className="cursor-pointer"
                    >
                        <RxCross1 />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full border-richblack-700 rounded-lg bg-richblack-900 p-6 flex flex-col gap-4"
                >

                    <Upload
                        name="lectureVideo"
                        label={"Upload Lecture Video"}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        editData={edit ? modalData?.videoUrl : null}
                        viewData={view ? modalData?.videoUrl : null}
                    />

                    <div className="flex flex-col gap-2">
                        <label htmlFor="lectureTitle" className="label-style">
                            Lecture Title {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <input
                            type="text"
                            name="lectureTitle"
                            id="lectureTitle"
                            placeholder="Enter Lecture Title "
                            {...register("lectureTitle", { required: true })}
                            className="form-style"
                        />
                        {
                            errors.lectureTitle &&
                            <span className="text-pink-200 text-sm ml-2 tracking-wide">
                                Lecture Title is required
                            </span>
                        }
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="lectureDesc" className="label-style">
                            Lecture Description {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <textarea
                            name="lectureDesc"
                            id="lectureDesc"
                            placeholder="Enter Lecture Description "
                            {...register("lectureDesc", { required: true })}
                            className="form-style"
                        />
                        {
                            errors.lectureDesc &&
                            <span className="text-pink-200 text-sm ml-2 tracking-wide">
                                Lecture Description is required
                            </span>
                        }
                    </div>

                    {
                        !view && (
                            <div className="grid place-items-end">
                                <IconBtn
                                    text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                                />
                            </div>
                        )
                    }

                </form>
            </div>

        </div>
    )
}