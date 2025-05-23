import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { matchPath, NavLink, useLocation } from 'react-router-dom'

export const SidebarLink = ({ name, path, icon }) => {
    const Icon = Icons[icon]
    const location = useLocation()
    const dispatch = useDispatch()

    // for matching current route
    const matchRoutes = (route) => {
        return matchPath(route, location.pathname)
    }

    return (
        <NavLink
            to={path}
            // onClick={()=> dispatch()}
            className={`relative py-2 px-8 text-sm font-semibold text-richblack-300 cursor-pointer
                ${matchRoutes(path) ? "text-yellow-50 bg-yellow-800" : "bg-opacity-0"}`}
        >
            {/* for left side border */}
            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50  
                ${matchRoutes(path) ? "opacity-100" : "opacity-0"}`}></span>

                <div className='flex item-center gap-x-2'>
                    <Icon/>
                    <span>
                        {name}
                    </span>
                </div>


        </NavLink>
    )
}