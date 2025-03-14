import ChangeProfilePicture from "./ChangeProfilePicture";

export default function Settings() {
    return (
        <>
            <div className="flex flex-col gap-6 w-[70%] text-richblack-50 mx-auto mt-6">

                <h1 className="text-3xl font-semibold">
                    Edit Profile
                </h1>

                {/* Change profile picture */}
                <ChangeProfilePicture />
            </div>
        </>
    )
}