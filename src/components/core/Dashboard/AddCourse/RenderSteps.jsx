import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { CourseInformationForm } from "./CourseInformation/CourseInformationForm";
import { CourseBuilderForm } from "./CourseBuilder/CourseBuilderForm";
import { PublishCourse } from "./PublishCourse";

export const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="mb-2 flex w-full items-center justify-between">
        {steps.map((item, index) => (
          <div key={item.id} className="flex items-center w-full">
            {/* steps id */}
            <div className="flex flex-col items-center">
              <button
                className={`grid cursor-default aspect-square w-[34px] rounded-full place-items-center border-[1px] 
                  ${step === item.id ? "bg-yellow-900 border-yellow-50 text-yellow-50" : "bg-richblack-800 border-richblack-700 text-richblack-300"} 
                  ${step > item.id ? "bg-yellow-50 text-yellow-50" : ""}`}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
            </div>
            {/* Dashed line */}
            {index !== steps.length - 1 && (
              <div
                className={`flex-grow border-dashed border-b-2 mx-2 h-[1px] 
                  ${step > item.id ? "border-yellow-50" : "border-richblack-500"}`}
              ></div>
            )}
          </div>
        ))}
      </div>

        {/* steps title */}
      <div className="flex w-full gap-16 mb-16 select-none">
        {steps.map((item) => (
          <div key={item.id} className="min-w-[120px] flex flex-col items-center gap-y-2">
            <p className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}>{item.title}</p>
          </div>
        ))}
      </div>

      {/* Render specific component */}
      <div>
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </>
  );
};