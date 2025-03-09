import React from 'react'
import { HighlightText } from '../HomePage/HighlightText'
import CTAButton from "../HomePage/Button"

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring, flexibale, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/signup"
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description: "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 1,
        heading: "Ready to Work",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
]

const LearningGrid = () => {
    return (
        <div className='w-11/12 mt-[80px] max-w-maxContent mx-auto grid grid-cols-1 lg:grid-cols-4'>
            {
                LearningGridArray.map((card, index) => (
                    <div
                        key={index}
                        className={`
                    ${index === 0 && "lg:col-span-2"}
                    ${card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
                    ${card.order === 3 && "lg:col-start-2"}
                    ${card.order < 0 && "bg-transparent"}
                    `}
                    >
                        {
                            card.order < 0 ?
                                (
                                    <div className='w-[85%] flex flex-col gap-4  pb-5'>
                                        <div className='text-4xl font-medium text-richblack-25'>
                                            {card.heading}
                                            <HighlightText text={card.highlightText} />
                                        </div>
                                        <p className='text-richblack-300'>
                                            {card.description}
                                        </p>
                                        <div className='w-fit pt-8 mb-6'>
                                            <CTAButton active={true} linkto={card.BtnLink}>
                                                {card.BtnText}
                                            </CTAButton>
                                        </div>
                                    </div>
                                )
                                : (
                                    <div className='flex flex-col gap-7 p-8 mb-16 mx-auto sm:w-[50%] md:w-[50%] lg:w-[100%]'>
                                        <h2 className='text-xl text-richblack-5 font-semibold w-[70%]'>
                                            {card.heading}
                                        </h2>
                                        <p className=' text-richblack-300 font-medium'>
                                            {card.description}
                                        </p>
                                    </div>
                                )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default LearningGrid