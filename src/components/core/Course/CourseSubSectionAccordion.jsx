import { HiOutlineVideoCamera } from "react-icons/hi"


export const CourseSubSectionAccordion =({subSec})=>{
    return(
        <div className="flex items-center gap-2 p-2">
            <HiOutlineVideoCamera/>
            <p>{subSec?.title}</p>
        </div>
    )
}