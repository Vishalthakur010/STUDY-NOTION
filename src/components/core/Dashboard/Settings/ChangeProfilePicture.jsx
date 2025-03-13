import { MdOutlineFileUpload } from "react-icons/md";
import { useSelector } from "react-redux";
import { IconBtn } from "../../../common/IconBtn";

const ChangeProfilePicture = () => {
    const { user } = useSelector((state) => state.profile)

    return (
        <div className="flex items-center gap-4  bg-richblack-800 p-6 rounded-lg">
            <img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[70px] object-cover rounded-full"
            />

            <div className="flex flex-col gap-2">
                <p className="font-semibold text-lg">
                    Change Profile Picture
                </p>
                <div className="flex items-center gap-2">
                    <button
                        className="flex items-center text-lg font-bold bg-richblack-700 px-4 py-1 rounded-md"
                    >
                        Select
                    </button>
                    <IconBtn
                        text="Upload"
                        onclick={() => {
                            Navigate('/dashboard/settings')
                        }}
                    >
                        <MdOutlineFileUpload />
                    </IconBtn>
                </div>
            </div>
        </div>
    )
}

export default ChangeProfilePicture