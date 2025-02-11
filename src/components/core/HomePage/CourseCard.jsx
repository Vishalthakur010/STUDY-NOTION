import React from 'react'
import { MdPeopleAlt } from "react-icons/md";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
        return (
                <div className={`felx flex-col items-center text-richblack-300 w-[340px] h-[300px] bg-richblack-800 p-8 cursor-pointer
                ${currentCard === cardData?.heading ?
                                "bg-white shadow-[12px_12px_0_0] shadow-yellow-50 text-richblack-500"
                                : "bg-richblack-800"}`}
                        onClick={() => setCurrentCard(cardData.heading)}>

                        {/* heading */}
                        <h2 className={`text-xl font-semibold mb-4 text-richblack-5
                                ${currentCard === cardData?.heading && "text-richblack-800"}
                                `}>
                                {cardData.heading}
                        </h2>

                        {/* description */}
                        <p className='text-base'>
                                {cardData.description}
                        </p>

                        {/* level and lession */}
                        <div className={`text-xl flex flex-row justify-between mt-16 border-t-2 border-dashed border-richblack-700 pt-4
                                ${currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"}`}>

                                <div className='flex items-center flex-row gap-2'>
                                        <MdPeopleAlt />
                                        {cardData.level}
                                </div>
                                <div className='flex flex-row items-center gap-2'>
                                        <ImTree />
                                        <div className='flex items-center flex-row gap-2'>
                                                {cardData.lessionNumber}
                                                <div className=''>Lessions</div>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default CourseCard