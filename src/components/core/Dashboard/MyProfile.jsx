import { useSelector } from "react-redux"
import { IconBtn } from "../../common/IconBtn"
import { useNavigate } from "react-router-dom"


export const MyProfile = () => {
    const Navigate = useNavigate()

    const { user, loading: profileLoading } = useSelector((state) => state.profile)

    if (profileLoading) {
        return (
            <div className='mt-10'>
                <div>...Loading</div>
            </div>
        )
    }

    return (
        <div>

            <h1>
                My Profile
            </h1>

            {/* section 1 */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[50px] object-cover rounded-full"
                    />
                    <div>
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{user.email}</p>
                    </div>
                </div>

                <IconBtn
                    text="Edit"
                    onclick={() => {
                        Navigate('/dashboard/settings')
                    }}
                />
            </div>

            {/* section 2*/}
            <div className="flex items-center gap-4">
                <div>
                    <p>About</p>
                    <p>{user?.additionalDetails?.about ?? "Write something about yourself"}</p>
                </div>

                <IconBtn
                    text="Edit"
                    onclick={() => {
                        Navigate('/dashboard/settings')
                    }}
                />
            </div>

            {/* section 3 */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 justify-between">
                    <p>Persional Details</p>

                    <IconBtn
                        text="Edit"
                        onclick={() => {
                            Navigate('/dashboard/settings')
                        }}
                    />
                </div>
                <div className="flex items-center gap-4 justify-between">
                    <div>
                        <p>First Name</p>
                        <p>{user?.firstName}</p>
                    </div>
                    <div>
                        <p>Last Name</p>
                        <p>{user?.lastName}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 justify-between">
                    <div>
                        <p>Email</p>
                        <p>{user?.email ?? "Add email"}</p>
                    </div>
                    <div>
                        <p>Phone Number</p>
                        <p>{user.additionalDetails?.contactNo ?? "Add phone number"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 justify-between">
                    <div>
                        <p>Gender</p>
                        <p>{user?.additionalDetails?.gender ?? "Add gender"}</p>
                    </div>
                    <div>
                        <p>Date of Birth</p>
                        <p>{user?.additionalDetails?.dateOfBirth ?? "Add date of birth"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}