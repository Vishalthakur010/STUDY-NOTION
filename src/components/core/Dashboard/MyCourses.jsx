import { useSelector } from "react-redux";
import { IconBtn } from "../../common/IconBtn"
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import CourseTable from "./instructorCourses/CourseTable"

export const MyCourses = () => {

    const {token}= useSelector((state)=> state.auth)
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchCourses = async () => {
            const response = await fetchInstructorCourses(token)
            if(response){
                setCourses(response)
            }
        }
        fetchCourses()
    },[])

    return (
        <div className="flex flex-col gap-6 w-[90%] text-richblack-25 mx-auto mt-6">

            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">
                    My Courses
                </h1>

                <IconBtn
                    text="Add Course"
                    customClasses="p-6"
                    onclick={()=> navigate("/dashboard/add-course")}
                >
                    <IoIosAddCircleOutline/>   
                </IconBtn>
            </div>

            {courses && <CourseTable courses={courses} setCourses={setCourses} />}
        </div>
    )
}