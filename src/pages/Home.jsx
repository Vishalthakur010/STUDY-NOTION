import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { HighlightText } from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button'
import banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimelineSection from "../components/core/HomePage/TimelineSection"
import InstructorSection from '../components/core/HomePage/InstructorSection';
import { Footer } from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';


const Home = () => {
        return (
                <div>
                        {/* section : 1 */}
                        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-between text-white'>

                                {/* Become an Instructor */}
                                <Link to={"/signup"}>
                                        <div className='mt-20 p-1 mx-auto bg-richblack-800 rounded-full font-semibold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit hover:shadow-2xl group shadow shadow-richblack-500'>
                                                <div className='flex  items-center px-10 py-[5px] gap-2 rounded-full group-hover:bg-richblack-900'>
                                                        <p>Become an Instructor</p>
                                                        <FaArrowRight />
                                                </div>
                                        </div>
                                </Link>

                                {/* Heading  */}
                                <div className='text-center text-4xl font-semibold mt-7'>
                                        Empower Your Future With
                                        <HighlightText text={"Coding Skills"} />
                                </div>

                                {/* Sub-Heading  */}
                                <div className='text-richblack-300 text-center w-[80%] mt-4'>
                                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                                </div>

                                {/* CTA Buttons  */}
                                <div className='flex gap-7 mt-7'>
                                        <CTAButton active={true} linkto={"/signup"}>
                                                Learn More
                                        </CTAButton>
                                        <CTAButton active={false} linkto={"/login"}>
                                                Book a Demo
                                        </CTAButton>
                                </div>

                                {/* video */}
                                <div className='shadow-[-6px_-9px_22px_-1px_rgba(96,115,175,0.5)] mt-12 '>
                                        <video
                                                className='shadow-[18px_14px_2px_2px_rgba(255,255,255,1)]'
                                                muted
                                                loop
                                                autoPlay
                                                width={900}
                                        >
                                                <source src={banner} type='video/mp4' />
                                        </video>
                                </div>

                                {/* Code Section 1 */}
                                <div className='mx-auto'>
                                        <CodeBlocks
                                                position={"flex-col lg:flex-row"}
                                                heading={
                                                        <div className='text-4xl font-semibold'>
                                                                Unlock your
                                                                <HighlightText text={"coding potential "} />
                                                                with our online cources
                                                        </div>
                                                }
                                                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"}
                                                ctabtn1={
                                                        {
                                                                btntext: "Try it yourself",
                                                                active: true,
                                                                linkto: "/signup"
                                                        }
                                                }
                                                ctabtn2={
                                                        {
                                                                btntext: "Learn More",
                                                                active: false,
                                                                linkto: "/login"
                                                        }
                                                }
                                                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                                                codeColor={"text-yellow-25"}
                                                backgroundGradient={<div className='codeblock1 absolute'></div>}
                                        />
                                </div>

                                {/* Code Section 2 */}
                                <div >
                                        <CodeBlocks
                                                position={"flex-col lg:flex-row-reverse"}
                                                heading={
                                                        <div className='text-4xl font-semibold w-[45%]'>
                                                                Start
                                                                <HighlightText text={"coding in seconds"} />
                                                        </div>
                                                }
                                                subheading={"Go ahead, give it a try. Our hands-on learning enviroment means you'll be writting real code from very first lesson."}
                                                ctabtn1={
                                                        {
                                                                btntext: "Continue Lesson",
                                                                active: true,
                                                                linkto: "/signup"
                                                        }
                                                }
                                                ctabtn2={
                                                        {
                                                                btntext: "Learn More",
                                                                active: false,
                                                                linkto: "/login"
                                                        }
                                                }
                                                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                                                codeColor={"text-yellow-25"}
                                                backgroundGradient={<div className='codeblock2 absolute'></div>}
                                        />
                                </div>

                                <ExploreMore/>

                        </div>

                        {/* section : 2 */}
                        <div className='bg-pure-greys-5 text-richblack-700 sm:pt-[400px] md:pt-0'>

                                {/* Background Image */}
                                <div className='relative z-0 homepage_bg h-[300px] w-11/12 max-w-maxContent mx-auto flex justify-center items-center'>
                                        {/* CTA Buttons  */}
                                        <div className='h-max flex flex-row gap-5 text-white'>
                                                <CTAButton active={true} linkto={"/signup"}>
                                                        <div className='flex gap-2 items-center'>
                                                                Explore Full Catalog
                                                                <FaArrowRight />
                                                        </div>
                                                </CTAButton>
                                                <CTAButton active={false} linkto={"/login"}>
                                                        Learn More
                                                </CTAButton>
                                        </div>
                                </div>

                                <div className='w-11/12  max-w-maxContent mx-auto flex flex-col items-center justify-between gap-7'>

                                        <div className=' flex lg:flex-row flex-col gap-10 lg:justify-around mt-[100px] mb-[50px]'>

                                                <div className=' mx-auto text-4xl font-bold md:w-[45%]'>
                                                        Get the Skills You need for a
                                                        <HighlightText text={"job that is in demand"} />
                                                </div>

                                                <div className='mx-auto flex flex-col gap-10 md:w-[45%] items-start'>
                                                        <div className='text-[16px] font-semibold'>
                                                                The modern StudyNotion is That dictates it's own terms. Today, to be a competitive specialist requires more than professional Skills
                                                        </div>
                                                                <CTAButton active={true} linkto={"/signup"}>
                                                                        Learn More
                                                                </CTAButton>
                                                </div>
                                        </div>

                                        <TimelineSection/>

                                        <LearningLanguageSection/>
                                </div>
                        </div>

                        {/* section : 3 */}
                        <div className='bg-richblack-900 text-white w-11/12 flex flex-col items-center justify-between mx-auto mt-20'>

                                        <InstructorSection/>

                                        <h2 className='text-center text-4xl font-semibold'>
                                                Reviews from other learners
                                        </h2>

                                        {/* Reviews and rating 1:18*/}
                        </div>


                        {/* Footer */}
                        <Footer/>
                </div>
        )
}

export default Home