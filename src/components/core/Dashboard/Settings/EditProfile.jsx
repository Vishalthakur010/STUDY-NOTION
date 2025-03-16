import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { IconBtn } from "../../../common/IconBtn"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../../services/operations/settingsAPI"

export default function EditProfile() {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const submitProfileForm = async (data) => {
        // console.log("form data", data)

        try {
            dispatch(updateProfile(token, data))
        }
        catch (error) {
            console.error("Error Updating Profile: ", error)
        }
    }

    // useEffect(() => {
    //     if (isSubmitSuccessful) {
    //         reset({
    //             firstName: "",
    //             lastName: "",
    //             dateOfBirth: "",
    //             about: "",
    //             gender: "",
    //             contactNo: ""
    //         })
    //     }
    // }, [reset, isSubmitSuccessful])

    return (
        <>
            <form onSubmit={handleSubmit(submitProfileForm)}>


                <div className="flex flex-col gap-6 bg-richblack-800 p-6 rounded-lg">

                    <h2 className="text-lg font-semibold mb-1">Profile Information</h2>

                    {/* firstName & lastName */}
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="firstName" className="label-style">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter first name"
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                                className="form-style"
                            />
                            {
                                errors.firstName && (
                                    <span className="text-red-500">{errors.firstName.message}</span>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="lastName" className="label-style">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter last name"
                                {...register("lastName", { required: true })}
                                defaultValue={user?.lastName}
                                className="form-style"
                            />
                            {
                                errors.lastName && (
                                    <span className="text-red-500">{errors.lastName.message}</span>
                                )
                            }
                        </div>
                    </div>

                    {/* Date of birth & gender */}
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="dateOfBirth" className="label-style">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                placeholder="dd/mm/yyyy"
                                {...register("dateOfBirth", { required: true })}
                                defaultValue={user?.additionalDetails?.dateOfBirth}
                                className="form-style"
                            />
                            {
                                errors.dateOfBirth && (
                                    <span className="text-red-500">{errors.dateOfBirth.message}</span>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="gender" className="label-style">Gender</label>
                            <select
                                name="gender"
                                id="gender"
                                {...register("gender", { required: true })}
                                defaultValue={user?.additionalDetails?.gender}
                                className="form-style"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {
                                errors.gender && (
                                    <span className="text-red-500">{errors.gender.message}</span>
                                )
                            }
                        </div>
                    </div>

                    {/* contactNo & About */}
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="contactNo" className="label-style">Contact Number</label>
                            <input
                                type="number"
                                name="contactNo"
                                id="contactNo"
                                placeholder="Enter Contact Number"
                                {...register("contactNo", { required: true })}
                                defaultValue={user?.additionalDetails?.contactNo}
                                className="form-style"
                            />
                            {
                                errors.contactNo && (
                                    <span className="text-red-500">{errors.contactNo.message}</span>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="about" className="label-style">About</label>
                            <input
                                type="text"
                                name="about"
                                id="about"
                                placeholder="Enter Bio Details"
                                {...register("about", { required: true })}
                                defaultValue={user?.additionalDetails?.about}
                                className="form-style"
                            />
                            {
                                errors.about && (
                                    <span className="text-red-500">{errors.about.message}</span>
                                )
                            }
                        </div>
                    </div>

                </div>

                {/* cancel & save buttons */}
                <div className="flex gap-2 justify-end mt-6 ">
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile")
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-6 font-semibold text-richblack-50"
                    >
                        cancel
                    </button>
                    <IconBtn type="submit" text="Save" />
                </div>
            </form>
        </>
    )
}