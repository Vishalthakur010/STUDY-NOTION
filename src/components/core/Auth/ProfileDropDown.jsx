import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineCaretDown } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";
import { VscDashboard } from "react-icons/vsc";

import { logout } from '../../../services/operations/authAPI'
import { useOnclickOutside } from '../../../hooks/useOnclickOutside';

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)  // with the help of this we can control the element outside of the component

  useOnclickOutside(ref, () => setOpen(false))

  if(!user) return null

  return (
    <div
      className='relative cursor-pointer'
      onClick={() => setOpen(true)}
    >

      {/* user image and dropdown icon */}
      <div className='flex flex-row items-center gap-2'>
        <img
          src={user.image}
          alt={`profile-${user.firstName}`}
          className='aspect-square w-[30px] object-cover rounded-full'
        />
        <AiOutlineCaretDown className='text-sm text-richblack-100' />
      </div>

      {/* dropdown menu */}
      {
        open && (
          <div
          onClick={(e) => e.stopPropagation()}
            ref={ref}
            className='absolute top-8 right-0 rounded-lg divide-y-[1px] divide-richblack-700 
            border-[1px] border-richblack-700 bg-richblack-800 z-10'
          >

            <Link to={"/dashboard/my-profile"} onClick={() => setOpen(false)}>
              <div
                className='flex w-full items-center gap-x-1 text-sm px-[12px] py-[10px] 
                 text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700'
              >
                <VscDashboard className='text-lg'/>
                Dashboard
              </div>
            </Link>

            <div
              onClick={() => {
                dispatch(logout(navigate))
                setOpen(false)
              }}
              className='flex w-full items-center gap-x-1 text-sm px-[12px] py-[10px] cursor-pointer
               text-richblack-100 hover:text-richblack-25 hover:bg-richblack-700'
            >
              <VscSignOut className='text-lg'/>
              Logout
            </div>
          </div>
        )
      }

    </div>
  )
}

export default ProfileDropDown