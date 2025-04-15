import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import { COURSE_STATUS } from "../../../../utils/constants"
import { RiDeleteBin6Line } from "react-icons/ri"
import { MdEdit } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { ConfirmationModal } from "../../../common/ConfirmationModal"
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { formDate } from "../../../../services/operations/formDate"

export default function CourseTable({ courses, setCourses }) {

    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCourseDelete = async (courseId) => {
        setLoading(true)

        await deleteCourse({ courseId: courseId }, token)
        const result = await fetchInstructorCourses(token)

        if (result) {
            setCourses(result)
        }

        setConfirmationModal(null)
        setLoading(false)
    }

    return (
        <div>
            <Table className="w-full text-left text-richblack-100 rounded-md">

                <Thead>
                    <Tr>
                        <Th>
                            Courses
                        </Th>
                        <Th>
                            Duration
                        </Th>
                        <Th>
                            Price
                        </Th>
                        <Th>
                            Actions
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        courses.length === 0 ? (
                            <Tr>
                                <Td>
                                    No Courses Found
                                </Td>
                            </Tr>
                        )
                            : (
                                courses.map((course) => (
                                    <Tr key={course._id}
                                        className=" border-richblack-800 p-8"
                                    >
                                        <Td className="flex gap-4 mt-10">
                                            <img
                                                src={course.thumbnail}
                                                alt="course image"
                                                className="w-[256px] h-[144px] rounded-md"
                                            />
                                            <div className="flex flex-col justify-around">
                                                <p className="text-richblack-5 font-semibold text-xl">
                                                    {course.courseName}
                                                </p>
                                                <p className="text-sm">
                                                    {course.coursedescription}
                                                </p>
                                                <p className="text-richblack-5 text-sm">
                                                    Created: {formDate(course.createdAt)}
                                                </p>
                                                {
                                                    course.status === COURSE_STATUS.DRAFT ?
                                                        (
                                                            <p className="text-pink-50 text-sm">Drafted</p>
                                                        )
                                                        : (
                                                            <p className="text-yellow-50 text-sm">Published</p>
                                                        )
                                                }
                                            </div>
                                        </Td>

                                        <Td>
                                            2hr 30min
                                        </Td>

                                        <Td>
                                            ${course.price}
                                        </Td>

                                        <Td className="text-xl">
                                            <button
                                                disabled={loading}
                                                className="mr-2"
                                            onClick={()=> navigate(`/dashboard/edit-course/${course._id}`)}
                                            >
                                                <MdEdit />
                                            </button>
                                            <button
                                                disabled={loading}
                                                onClick={() => setConfirmationModal({
                                                    text1: "Do you want to delete this course?",
                                                    text2: "All the data related to this course will be deleted",
                                                    btn1text: "Delete",
                                                    btn2text: "Cancel",
                                                    btn1handler: () => handleCourseDelete(course._id),
                                                    btn2handler: () => setConfirmationModal(null)
                                                })}
                                            >
                                                <RiDeleteBin6Line />
                                            </button>
                                        </Td>
                                    </Tr>
                                ))
                            )
                    }
                </Tbody>

            </Table>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}