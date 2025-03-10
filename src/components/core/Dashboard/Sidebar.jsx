
import { useSelector } from "react-redux"
import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import { SidebarLink } from "./SidebarLink"

export const Sidebar = () => {

    const {user,loading:profileLoading} = useSelector( (state) => state.profile)
    const {loading:authLoading} = useSelector( (state) => state.auth)

    if (authLoading || profileLoading) {
        return (
            <div className='mt-10'>
                <div>...Loading</div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-w-[250px] border-r-[1px] border-r-richblack-600 
        h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">

            <div className="flex flex-col">
                {
                    sidebarLinks.map( (link) => {
                        if(link.type && user.accountType !== link.type) return null
                        return <SidebarLink key={link.id} {...link} />
                    })
                }

                <div className="mx-auto h-[1px] w-10/12 mt-4 mb-6 bg-richblack-700"></div>

                <div className="flex flex-col gap-y-2">
                    <SidebarLink name="Setting" path="/dashboard/setting" icon="VscSettingsGear" />
                    <SidebarLink name="Logout" path="/logout" icon="VscSignOut" />
                </div>

                {/* 1:01 */}

            </div>
        </div>
    )
}