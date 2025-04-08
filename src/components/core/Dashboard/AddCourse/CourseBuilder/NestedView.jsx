import { useDispatch, useSelector } from "react-redux"
import { ConfirmationModal } from "../../../../common/ConfirmationModal"
import { useState } from "react"
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDownArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";

export const NestedView = ({ handleChangeEditSectionName }) => {

    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [addSubsection, setAddSubsection] = useState(null)
    const [editSubsection, setEditSubsection] = useState(null)
    const [viewSubsection, setViewSubsection] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState()

    const handleDeleteSection = (sectionId) => {

    }

    const handleDeleteSubSection = (subSectionId, sectionId) => {

    }

    return (
        <div className="bg-richblack-700 p-4 rounded-md mt-4">

            <div>
                {course?.courseContent.map((section) => (
                    <details key={section._id} open>

                        <summary className="flex items-center justify-between p-2 border-b-2 border-richblack-600">

                            <div className="flex items-center gap-2">
                                <RxDropdownMenu />
                                <p>{section.sectionName}</p>
                            </div>

                            <div
                                className="flex items-center gap-2"
                            >
                                <button
                                    onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    onClick={() => setConfirmationModal({
                                        text1: "Delete this section",
                                        text2: "All the lectures in this section will be deleted",
                                        btn1text: "Delete",
                                        btn2text: "Cancel",
                                        btn1handler: () => handleDeleteSection(section._id),
                                        btn2handler: () => setConfirmationModal(null)
                                    })}
                                >
                                    <RiDeleteBin6Line />
                                </button>

                                <span>|</span>

                                <BiSolidDownArrow />
                            </div>

                        </summary>

                        <div>
                            {
                                section.subSection.map((subSection) => (
                                    <div
                                        key={subSection._id}
                                        onClick={() => setViewSubsection(subSection)}
                                        className="flex items-center justify-between p-2 border-b-2 border-richblack-600"
                                    >

                                        <div className="flex items-center gap-2">
                                            <RxDropdownMenu />
                                            <p>{subSection.title}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setEditSubsection({ ...subSection, sectionId: section._id })}
                                            >
                                                <MdEdit />
                                            </button>
                                            <button
                                                onClick={() => setConfirmationModal({
                                                    text1: "Delete this Sub section",
                                                    text2: "Selected Lecture will be deleted",
                                                    btn1text: "Delete",
                                                    btn2text: "Cancel",
                                                    btn1handler: () => handleDeleteSubSection(subSection._id, section._id),
                                                    btn2handler: () => setConfirmationModal(null)
                                                })}
                                            >
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }

                            <button
                                onClick={() => setAddSubsection(section._id)}
                                className="flex items-center gap-1 mt-4 text-yellow-50 font-bold"
                            >
                                <FaPlus />
                                <p>Add Lecture</p>
                            </button>

                        </div>

                    </details>
                ))}

                {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

            </div>

            {
                addSubsection ? (<SubSectionModal/>)  //1:33 min
                : viewSubsection ? (<SubSectionModal/>) 
                : editSubsection ? (<SubSectionModal/>) 
                : (<div></div>)
            }

        </div>
    )
}