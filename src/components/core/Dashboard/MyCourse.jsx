import { IconBtn } from "../../common/IconBtn"
import { IoIosAddCircleOutline } from "react-icons/io";

export const MyCourse = () => {
    return (
        <div className="flex flex-col gap-6 w-[90%] text-richblack-25 mx-auto mt-6">

            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">
                    My Course
                </h1>

                <IconBtn
                    text="New"
                    customClasses="p-6"
                >
                    <IoIosAddCircleOutline/>   
                </IconBtn>
            </div>
                            {/* 1:09 min */}
        </div>
    )
}