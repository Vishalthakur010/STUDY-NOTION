
import { useDispatch, useSelector } from "react-redux"
import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import { SidebarLink } from "./SidebarLink"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { ConfirmationModal } from "../../common/ConfirmationModal"

export const Sidebar = () => {

    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmationModal, setConfirmationModal] = useState(null)

    if (authLoading || profileLoading) {
        return (
            <div className='mt-10'>
                <div>...Loading</div>
            </div>
        )
    }

    // console.log("User in Sidebar:", user);


    return (
        <div className=" flex flex-col min-w-[225px] border-r-[1px] border-r-richblack-900 
         bg-richblack-800 py-10 text-white">

                {
                    sidebarLinks.map((link) => {
                        if (link.type && user.accountType !== link.type) return null
                        return <SidebarLink key={link.id} {...link} />
                    })
                }

                <div className="mx-auto h-[1px] w-10/12 mt-4 mb-6 bg-richblack-500"></div>

                <div className="flex flex-col gap-y-2">

                    <SidebarLink
                        name="Setting"
                        path="/dashboard/settings"
                        icon="VscSettingsGear"
                    />

                    <button
                        onClick={() => setConfirmationModal({
                            text1: "Are you sure ?",
                            text2: "You will be logged out of your account",
                            btn1text: "Logout",
                            btn2text: "Cancel",
                            btn1handler: () => dispatch(logout(navigate)),
                            btn2handler: () => setConfirmationModal(null)
                        })}
                        className="text-sm font-medium text-richblack-300 px-8"
                    >
                        <div className="flex items-center gap-2">
                            <VscSignOut />
                            <span>Logout</span>
                        </div>

                    </button>

                </div>

                {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}