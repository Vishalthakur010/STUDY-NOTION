import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import { CourseInformationForm } from "./CourseInformation/CourseInformationForm"


export const RenderSteps = () => {

    const { step } = useSelector((state) => state.course)

    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        },
    ]
    return (
        <>
            <div className="mb-2 flex w-full justify-center">
                {
                    steps.map((item) => (
                        <>
                            <div
                                key={item.id}
                                className="flex flex-col items-center"
                            >
                                <button className={`grid cursor-default aspect-square w-[34px] rounded-full place-items-center border-[1px]
                            ${step === item.id
                                        ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                                        : "bg-richblack-800  border-richblack-700 text-richblack-300"}
                                    ${step > item.id && "bg-yellow-50 text-yellow-50"}}`}>
                                    {
                                        step > item.id ?
                                            (<FaCheck className="font-bold text-richblack-900" />)
                                            : (item.id)
                                    }
                                </button>
                            </div>
                            {/* dashed lines */}
                            {
                                item.id != steps.length && (
                                    <div
                                        className={`border-dashed border-b-2 w-[33%] h-[calc(34px/2)]
                                        ${step > item.id ? "border-yellow-50" : "border-richblack-500"}`}
                                    ></div>
                                )
                            }
                        </>
                    ))
                }
            </div>

            <div className="flex w-full mb-16 justify-between select-none">
                {
                    steps.map((item) => (
                        <div
                            className="min-w-[130px] flex flex-col items-center gap-y-2"
                            key={item.id}>
                            <p
                            className={`text-sm
                                ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}
                                `}
                            >
                                {item.title}
                            </p>
                        </div>
                    ))
                }
            </div>

                {/* Render specific component */}
            <div>
                {step === 1 && <CourseInformationForm />}
                {/* {step === 2 && <CourseBuilderForm />} */}
                {/* {step === 3 && <PublishCourse />} */}
            </div>
        </>
    )
}