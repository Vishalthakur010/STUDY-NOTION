import React, { useState } from 'react'
import { HomePageExplore } from "../../../data/homepage-explore"
import { HighlightText } from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths",
];

const ExploreMore = () => {

        const [currentTab, setCurrentTab] = useState(tabsName[0])
        const [courses, setCourses] = useState(HomePageExplore[0].courses)
        const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

        const setMyCards = (value) => {
                setCurrentTab(value)
                const result = HomePageExplore.filter((course) => course.tag === value)
                setCourses(result[0].courses)
                setCurrentCard(result[0].courses[0].heading)
        }
        return (
                <div className='flex flex-col items-center gap-5 mt-[180px]'>

                        <div className='text-4xl font-semibold text-center'>
                                Unlock the
                                <HighlightText text={"Power of code"} />
                        </div>

                        <p className='text-base text-center text-richblack-200 '>
                                Learn to build anything you can imagine
                        </p>

                        {/* Tab */}
                        <div className='flex flex-row items-center bg-richblack-800 rounded-full mb-[300px]'>
                                {
                                        tabsName.map((element, index) => (
                                                <div
                                                        key={index}
                                                        className={`text-base font-semibold cursor-pointer px-5 py-2 rounded-full
                                                                transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-25
                                                        ${currentTab === element ?
                                                                        "bg-richblack-900 text-richblack-25 font midium"
                                                                        : "text-richblack-100 "}`
                                                        }
                                                        onClick={() => setMyCards(element)}
                                                >
                                                        {element}
                                                </div>
                                        ))
                                }
                        </div>

                        {/*course Cards */}
                        <div className='absolute flex flex-row justify-around gap-10 mt-[220px] z-20'>
                                {
                                        courses.map((course, index) => (
                                                <CourseCard
                                                key={index}
                                                cardData={course}
                                                currentCard={currentCard}
                                                setCurrentCard={setCurrentCard}
                                                />
                                        ))
                                }
                        </div>
                </div>
        )
}

export default ExploreMore