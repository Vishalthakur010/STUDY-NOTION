import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { CourseSubSectionAccordion } from "./CourseSubSectionAccordion"

export const CourseAccordionBar =({course, isActive, handleActive})=>{

    const contentEl = useRef(null)

    const [active, setActive]= useState(false)
    useEffect(()=>{
        setActive(isActive.includes(course._id))
    },[isActive])

    const [sectionHeight, setSectionHeight] = useState(0)
    useEffect(()=>{
        setSectionHeight(active ? contentEl.current.scrollHeight : 0)
    },[active])

    return (
        <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 last:mb-0">

            {/* section Part */}
            <div
            className="flex cursor-pointer justify-between items-start px-7 py-6 bg-opacity-20 transition-[0.3s]"
            onClick={()=> handleActive(course._id)}
            >
                <div className="flex items-center gap-2">
                    <i
                    className={
                        isActive.includes(course._id) ? "rotate-180" : "rotate-0"
                    }
                    >
                        <AiOutlineDown/>
                    </i>
                    <p>
                        {course?.sectionName}
                    </p>
                </div>

                <div className="text-yellow-50">
                    {course?.subSection.length || 0 } lecture(s)
                </div>

            </div>

            <div 
            ref={contentEl}
            className="overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]"
            style={{
                height:sectionHeight
            }}
            >
                <div
                className="flex flex-col gap-2 px-7 py-6 font-semibold"
                >
                    {
                        course?.subSection?.map((subSec, i)=>(
                            <CourseSubSectionAccordion subSec={subSec} key={i}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}