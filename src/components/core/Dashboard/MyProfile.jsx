import { useSelector } from "react-redux"
import { IconBtn } from "../../common/IconBtn"
import { useNavigate } from "react-router-dom"
import { RiFileEditLine } from "react-icons/ri";
import { formattedDate } from "../../../utils/dateFormatter";


export const MyProfile = () => {
    const Navigate = useNavigate()

    const { user} = useSelector((state) => state.profile)

    return (
        <div className="flex flex-col gap-6 w-[70%] text-richblack-25 mx-auto mt-6">

            <h1 className="text-3xl font-semibold">
                My Profile
            </h1>

            {/* section 1 */}
            <div className="flex items-center justify-between bg-richblack-800 p-6 rounded-lg">
                <div className="flex items-center gap-4">
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[70px] object-cover rounded-full"
                    />
                    <div>
                        <p className="font-semibold text-lg">{user.firstName} {user.lastName}</p>
                        <p className="text-richblack-400 text-sm">{user.email}</p>
                    </div>
                </div>

                <IconBtn
                    text="Edit"
                    onclick={() => {
                        Navigate('/dashboard/settings')
                    }}
                >
                    <RiFileEditLine />
                </IconBtn>
            </div>

            {/* section 2*/}
            <div className="flex items-center justify-between bg-richblack-800 p-6 rounded-lg">
                <div className="flex flex-col gap-4">
                    <p className="text-lg font-semibold">About</p>
                    <p className="text-richblack-400 text-sm">{user?.additionalDetails?.about ?? "Write something about yourself"}</p>
                </div>

                <IconBtn
                    text="Edit"
                    onclick={() => {
                        Navigate('/dashboard/settings')
                    }}
                >
                    <RiFileEditLine />
                </IconBtn>
            </div>

            {/* section 3 */}
            <div className="flex flex-col gap-4 bg-richblack-800 p-6 rounded-lg">
                <div className="flex items-center gap-4 justify-between">
                    <p className="text-lg font-semibold">
                        Personal Details
                    </p>

                    <IconBtn
                        text="Edit"
                        onclick={() => {
                            Navigate('/dashboard/settings')
                        }}
                    >
                        <RiFileEditLine />
                    </IconBtn>
                </div>

                <div className="w-[80%] flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-richblack-400">First Name</p>
                            <p className="text-sm font-medium">{user?.firstName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-richblack-400">Last Name</p>
                        <p className="text-sm font-medium">{user?.lastName}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-richblack-400">Email</p>
                        <p className="text-sm font-semibold">{user?.email ?? "Add email"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-richblack-400">Phone Number</p>
                        <p className="text-sm font-semibold">{user.additionalDetails?.contactNo ?? "Add phone number"}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-richblack-400">Gender</p>
                        <p className="text-sm font-semibold">{user?.additionalDetails?.gender ?? "Add gender"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-richblack-400">Date of Birth</p>
                        <p className="text-sm font-semibold">{formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add date of birth"}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}