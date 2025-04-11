import { useForm } from "react-hook-form"
import { IconBtn } from "../../../../common/IconBtn";
import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
import { NestedView } from "./NestedView";
import toast from "react-hot-toast";

export const CourseBuilderForm = () => {

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm()

    const { course } = useSelector((state) => state.course)
    const [editSectionName, setEditSectionName] = useState(null)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const {token} = useSelector((state) => state.auth)

    const cancelEdit = () => {
        setEditSectionName(null)
        setValue("sectionName", "")
    }

    const goToBack = () => {
        // Logic to go to the previous step
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }
    const goToNext = () => {
        // Logic to go to the next step

        // if no section is added
        if(course.courseContent.length === 0){
            toast.error("Please add atleast one section to the course")
            return
        }
        // if no lecture is added in any section
        if(course.courseContent.some((section) => section.subSection.length === 0)){
            toast.error("Please add atleast one lecture in each section")
            return
        }
        dispatch(setStep(3))
    }

    const onSubmit = async (data) => {
        setLoading(true)
        let result

        if(editSectionName){
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId:editSectionName,
                    courseId:course._id
                },
                token
            )
        }
        else{
            result = await createSection(
                {
                    sectionName: data.sectionName,
                    courseId:course._id
                },
                token
            )
        }

        //update values 
        if(result){
            setEditSectionName(null)
            setValue("sectionName", "")
            dispatch(setCourse(result))
        }

        setLoading(false)
    }

    const handleChangeEditSectionName =(sectionId, sectionName)=>{

        if(editSectionName === sectionId){
            cancelEdit()
            return
        }
        setEditSectionName(sectionId)
        setValue("sectionName", sectionName)
    }

    return (
        <div className="flex flex-col gap-5 w-full rounded-lg border-richblack-700 bg-richblack-800 p-6 ">
            <h2 className="text-richblack-5 text-2xl font-semibold">Course Builder</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="sectionName" className="label-style">
                        Section Name <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        type="text"
                        name="sectionName"
                        id="sectionName"
                        placeholder="Add a section to build your course "
                        {...register("sectionName", { required: true })}
                        className="form-style"
                    />
                    {
                        errors.sectionName &&
                        <span className="text-pink-200 text-sm ml-2 tracking-wide">
                            sectionName is required
                        </span>
                    }
                </div>
                <div className="mt-4 flex items-center gap-4">
                    <IconBtn
                        type={"submit"}
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        outline={true}
                        customClasses="text-yellow-50"
                    >
                        <MdAddCircleOutline className="text-2xl" />
                    </IconBtn>
                    {
                        editSectionName && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="text-richblack-300 text-sm underline"
                            >
                                cancel edit
                            </button>
                        )
                    }
                </div>

            </form>
            {
                course?.courseContent?.length > 0 && (
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
                )
            }
            <div className="flex justify-end gap-3">
                <button
                onClick={goToBack}
                className="cursor-pointer rounded-md bg-richblack-500 px-5 py-2 text-richblack-900 font-semibold"
                >
                    Back
                </button>
                <IconBtn
                    text={"Next"}
                    onclick={goToNext}
                >
                    <MdNavigateNext className="text-2xl" />
                </IconBtn>
            </div>
        </div>
    )
}