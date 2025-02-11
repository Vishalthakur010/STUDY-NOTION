import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { FooterLink2 } from '../../data/footer-links';

const BottomFooter = [
        "Privacy policy",
        "Cookie Policy",
        "Terms"
]
const Company = [
        "About",
        "Carrers",
        "Affiliates"
]
const Resources = [
        "Articles",
        "Blog",
        "Chart Sheet",
        "Code Challenges",
        "Docs",
        "Projects",
        "Videos",
        "Workspaces"
]
const Plans = [
        "Paid memberships",
        "For students",
        "Buisness solutions"
]
const Community = [
        "Forums",
        "Chapters",
        "Events"
]

export const Footer = () => {
        return (
                <footer className='bg-richblack-800 '>

                        <div className='flex sm:flex-col md:flex-row justify-between w-11/12 max-w-maxContent 
                        text-richblack-400 leading-6 mx-auto relative py-14 border-b border-richblack-700 pb-5'>

                                {/* section -1 */}
                                <div className='lg:w-[50%] flex sm:flex-col md:flex-row flex-wrap justify-between gap-3 pl-3 lg:pr-5 lg:border-r lg:border-richblack-700'>

                                        {/* subsection-1 */}
                                        <div className='flex flex-col gap-3 w-[30%] mb-7'>
                                                <img src={Logo} alt="Logo image" className='object-contain' />

                                                <h1 className="text-richblack-100 font-semibold text-[18px]">
                                                        Company
                                                </h1>

                                                <div className='flex flex-col gap-2'>
                                                        {
                                                                Company.map((comp, index) => (
                                                                        <Link to={comp.toLowerCase()}
                                                                                key={index}
                                                                                className='text-[14px] w-fit hover:text-richblack-50 transition-all duration-200'>
                                                                                {comp}
                                                                        </Link>
                                                                ))
                                                        }
                                                </div>

                                                <div className="flex gap-3 text-lg">
                                                        <FaFacebook />
                                                        <FaGoogle />
                                                        <FaTwitter />
                                                        <FaYoutube />
                                                </div>
                                        </div>

                                        {/* subsection-2 */}
                                        <div className='w-[48%] lg:w-[30%] mb-7'>

                                                <h1 className="text-richblack-100 font-semibold text-[18px]">
                                                        Resources
                                                </h1>

                                                <div className='flex flex-col gap-2 mt-4'>
                                                        {
                                                                Resources.map((Resourse, index) => (
                                                                        <Link to={Resourse.split(" ").join("-").toLowerCase()}
                                                                                key={index}
                                                                                className='text-[14px] w-fit hover:text-richblack-50 transition-all duration-200'>
                                                                                {Resourse}
                                                                        </Link>
                                                                ))
                                                        }
                                                </div>

                                                <h1 className="text-richblack-100 font-semibold text-[18px] mt-7 mb-4">
                                                        Support
                                                </h1>
                                                <Link to="/help-center"
                                                        className='text-[14px] w-fit hover:text-richblack-50 transition-all duration-200'>
                                                        Help Center
                                                </Link>

                                        </div>

                                        {/* subsection-3 */}
                                        <div className='w-[48%] lg:w-[30%] mb-7'>

                                                <h1 className="text-richblack-100 font-semibold text-[18px]">
                                                        Plans
                                                </h1>

                                                <div className='flex flex-col gap-2 mt-4'>
                                                        {
                                                                Plans.map((Plan, index) => (
                                                                        <Link to={Plan.split(" ").join("-").toLowerCase()}
                                                                                key={index}
                                                                                className='text-[14px] w-fit hover:text-richblack-50 transition-all duration-200'>
                                                                                {Plan}
                                                                        </Link>
                                                                ))
                                                        }
                                                </div>

                                                <h1 className="text-richblack-100 font-semibold text-[18px] mt-7 mb-4">
                                                        Community
                                                </h1>

                                                <div className='flex flex-col gap-2 mt-4'>
                                                        {
                                                                Community.map((commun, index) => (
                                                                        <Link to={commun.split(" ").join("-").toLowerCase()}
                                                                                key={index}
                                                                                className='text-[14px] w-fit hover:text-richblack-50 transition-all duration-200'>
                                                                                {commun}
                                                                        </Link>
                                                                ))
                                                        }
                                                </div>

                                        </div>
                                </div>

                                {/* section -2 */}
                                <div className='lg:w-[50%] flex sm:flex-col md:flex-row flex-wrap justify-between gap-3 pl-3 lg:pl-10'>
                                        {
                                                FooterLink2.map((Footer, index) => (
                                                        <div 
                                                        key={index}
                                                        className='w-[48%] lg:w-[30%] mb-7'>

                                                                <h1 className="text-richblack-100 font-semibold text-[18px]">
                                                                        {Footer.title}
                                                                </h1>

                                                                <div className='flex flex-col gap-2 mt-4'>
                                                                        {
                                                                                Footer.links.map((link, index) => (
                                                                                        <Link to={link.link.split(" ").join("-").toLowerCase()}
                                                                                                key={index}
                                                                                                className='text-[14px] w-fit hover:text-richblack-50 transition-all duration-200'>
                                                                                                {link.title}
                                                                                        </Link>
                                                                                ))
                                                                        }
                                                                </div>

                                                        </div>
                                                ))
                                        }
                                </div>

                        </div>

                        <div className='flex lg:flex-row items-center justify-between w-11/12 max-w-maxContent 
                        text-richblack-400 leading-6 mx-auto relative py-14'>
                                <div className='flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full'>

                                        <div className='flex flex-row'>
                                                {
                                                        BottomFooter.map((Bottom, index) => (
                                                                <Link to={Bottom.split(" ").join("-").toLowerCase()}
                                                                        key={index}
                                                                        className= {`${BottomFooter.length - 1 === index ? ""
                                                                                :"border-r border-richblack-700"} 
                                                                                text-[16px] w-fit hover:text-richblack-50 transition-all duration-200 px-3`}>
                                                                        {Bottom}
                                                                </Link>
                                                        ))
                                                }
                                        </div>

                                        <div className='text-center'>
                                                Made with ❤️ VishalTech © 2025 Studynotion
                                        </div>
                                </div>
                        </div>

                </footer>
        )
}

