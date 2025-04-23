import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { changePassword } from "../../../../services/operations/settingsAPI"
import { useDispatch, useSelector } from "react-redux"
import { IconBtn } from "../../../common/IconBtn"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const UpdatePassword = () => {
    const { token } = useSelector((state) => (state.auth))
    const navigate = useNavigate()

    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const submitPasswordForm = async (data) => {
        // console.log("Form data : ", data)

        try {
            await changePassword(token, data)
        }
        catch (error) {
            console.error("error updating password : ", error)
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(submitPasswordForm)}
            >
                <div className="bg-richblack-800 p-6 rounded-lg flex flex-col gap-6">

                    <h2 className="text-lg font-semibold mb-1">Password</h2>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="oldPassword" className="label-style">Current Password</label>
                            <input
                                name="oldPassword"
                                type={showOldPassword ? "text" : "password"}
                                id="oldPassword"
                                placeholder="Enter Current Password"
                                {...register("oldPassword", { required: true })}
                                className="form-style"
                            />
                            <span
                                onClick={() => setShowOldPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] cursor-pointer"
                            >
                                {
                                    showOldPassword ?
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                        : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                }
                            </span>
                            {
                                errors.oldPassword && (
                                    <span className="text-red-500">{errors.contactNo.message}</span>
                                )
                            }
                        </div>
                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="newPassword" className="label-style">Change Password</label>
                            <input
                                name="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                id="newPassword"
                                placeholder="Enter New Password"
                                {...register("newPassword", { required: true })}
                                className="form-style"
                            />
                            <span
                                onClick={() => setShowNewPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] cursor-pointer"
                            >
                                {
                                    showNewPassword ?
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                        : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                }
                            </span>
                            {
                                errors.newPassword && (
                                    <span className="text-red-500">{errors.contactNo.message}</span>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* cancel & update buttons */}
                <div className="flex gap-2 justify-end mt-6 ">
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile")
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-6 font-semibold text-richblack-50"
                    >
                        cancel
                    </button>
                    <IconBtn type="submit" text="Update" />
                </div>
            </form>
        </>
    )
}