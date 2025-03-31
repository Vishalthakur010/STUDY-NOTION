import { RenderSteps } from "./RenderSteps"
import { BsFillLightningChargeFill } from "react-icons/bs";

export const AddCourse = () => {
    return (
        <>
            <div className="flex flex-row gap-6 w-[90%] text-richblack-5 mx-auto mt-6">

                <div className=" flex flex-1 flex-col gap-6">
                    <h1 className="text-3xl font-medium text-richblack-5">
                        Add Course
                    </h1>
                    <div className="flex-1">
                        <RenderSteps />
                    </div>
                </div>

                <div className=" sticky top-10 hidden h-fit max-w-[380px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
                    <p className="text-richblack-5 text-lg font-semibold mb-6 flex items-center gap-1">
                        <BsFillLightningChargeFill className="text-yellow-50 text-sm"/>
                        Course Upload Tips
                    </p>

                    <ul className="list-disc pl-4 text-xs leading-relaxed font-semibold text-richblack-25 flex flex-col gap-3">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576. </li>
                        <li>Video section controls the course overview video. </li>
                        <li>Course Builder is where you create & organize a course. </li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments. </li>
                        <li>Information from the Additional Data section shows up on the course single page. </li>
                        <li>Make Announcements to notify any important </li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>

            </div>
        </>
    )
}