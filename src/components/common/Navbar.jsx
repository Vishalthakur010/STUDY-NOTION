import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiconnector } from '../../services/apiconnector'
import { categories } from '../../services/api'
import { FaCircleChevronDown } from "react-icons/fa6";

const Navbar = () => {

        const { token } = useSelector((state) => state.auth)
        const { user } = useSelector((state) => state.profile)
        const { totalItems } = useSelector((state) => state.cart)

        // for catalog
        const [subLinks, setSubLinks] = useState([])

        const fetchSubLinks = async () => {
                try {
                        const result = await apiconnector("GET", categories.CATEGORIES_API)
                        setSubLinks(result.data.allCategory)
                        // console.log("Printing sublink", subLinks)
                }
                catch (error) {
                        console.error("Error fetching categories:", error.response?.data || error.message);
                }
        }

        useEffect(() => {
                fetchSubLinks();
        }, []);

        // for matching current route
        const location = useLocation()
        const matchRoute = (route) => {
                return matchPath(route, location.pathname)
        }

        return (
                <div className='w-full h-14 bg-richblack-900 flex justify-center items-center border-b-[1px] border-richblack-700'>
                        <div className='w-11/12 max-w-maxContent flex justify-between items-center'>

                                {/* Logo image */}
                                <Link to={'/'}>
                                        <img src={logo}
                                                width={160}
                                                height={40}
                                                loading='lazy'
                                        />
                                </Link>

                                {/* Nav Links */}
                                <nav>
                                        <ul className='flex space-x-8 text-richblack-25'>
                                                {NavbarLinks.map((link, index) => (
                                                        <li key={index}>
                                                                {link.title === 'Catalog' ?
                                                                        ( //for catalog
                                                                                <div className='relative flex items-center gap-x-2 group'>
                                                                                        <p className='cursor-pointer'>{link.title}</p>
                                                                                        <FaCircleChevronDown />

                                                                                        <div className='invisible absolute text-lg font-semibold text-richblack-900 bg-richblack-25 
                                                                                        p-4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[20%] 
                                                                                        flex flex-col gap-y-2 opacity-0 transition-all duration-200
                                                                                        group-hover:visible group-hover:opacity-100 lg:w-[300px] rounded-lg z-10'>
                                                                                                <div
                                                                                                        className='w-6 h-6 rotate-45 bg-richblack-25 absolute rounded-md
                                                                                                top-0 left-[50%] translate-x-[80%] translate-y-[-45%]'
                                                                                                ></div>
                                                                                                {
                                                                                                        subLinks?.length > 0 ?
                                                                                                                (
                                                                                                                        subLinks.map((subLink, index) => (
                                                                                                                                <Link
                                                                                                                                        to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                                                                                                                        key={index}
                                                                                                                                        className='rounded-lg bg-transparent py-2 pl-4 hover:bg-richblack-50'>
                                                                                                                                        <p>{subLink.name}</p>
                                                                                                                                </Link>
                                                                                                                        ))
                                                                                                                ) :
                                                                                                                (<div>No Categories Found</div>)
                                                                                                }
                                                                                        </div>
                                                                                </div>
                                                                        ) :
                                                                        ( //except catalog
                                                                                <Link to={link?.path}
                                                                                        className={`${matchRoute(link.path) ? "text-yellow-50" : "text-richblack-25"}`}>
                                                                                        {link?.title}
                                                                                </Link>
                                                                        )}
                                                        </li>
                                                ))}
                                        </ul>
                                </nav>

                                {/* Login/Signup/Dashboard */}
                                <div className='flex items-center gap-x-4'>
                                        {/* cart icon only for students */}
                                        {
                                                // add styles
                                                user && user?.accountType !== "Instructor" && (
                                                        <Link to="/dashboard/cart" className='relative'>
                                                                <AiOutlineShoppingCart className='text-2xl text-richblack-100'/>
                                                                {
                                                                        totalItems > 0 && (
                                                                                <span className='absolute -bottom-2 -right-2 h-5 w-5 text-sm font-semibold rounded-full 
                                                                                flex items-center justify-center bg-richblack-600 text-yellow-100'>
                                                                                        {totalItems}
                                                                                </span>
                                                                        )
                                                                }
                                                        </Link>
                                                )
                                        }

                                        {/* Login button */}
                                        {
                                                token == null && (
                                                        <Link to="/login">
                                                                <button
                                                                        className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 '>
                                                                        Log in
                                                                </button>
                                                        </Link>
                                                )
                                        }

                                        {/* sign up button */}
                                        {
                                                token == null && (
                                                        <Link to="/signup">
                                                                <button
                                                                        className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 '>
                                                                        Sign Up
                                                                </button>
                                                        </Link>
                                                )
                                        }

                                        {/*HW:- profile dropdown */}
                                        {
                                                token != null && <ProfileDropDown />
                                        }
                                </div>
                        </div>
                </div>
        )
}

export default Navbar