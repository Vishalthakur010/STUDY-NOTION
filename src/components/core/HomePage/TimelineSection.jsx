import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import Timelineimage from "../../../assets/Images/Timelineimage.png"

const timeline=[
        {
                Logo:Logo1,
                Heading:"Leadership",
                Description:"Fully committed to the success comapny"
        },
        {
                Logo:Logo2,
                Heading:"Leadership",
                Description:"Fully committed to the success comapny"
        },
        {
                Logo:Logo3,
                Heading:"Leadership",
                Description:"Fully committed to the success comapny"
        },
        {
                Logo:Logo4,
                Heading:"Leadership",
                Description:"Fully committed to the success comapny"
        }
]

const TimelineSection = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center gap-[140px] mb-20'>

        {/* Left */}
        <div className='flex flex-col gap-12'>
                {
                        timeline.map( (element,index) => (
                                <div className='flex flex-row gap-5' key={index}>

                                        <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full'>
                                                <img src={element.Logo}/>
                                        </div>

                                        <div>
                                                <h1 className='text-xl font-bold'>{element.Heading}</h1>
                                                <p className='text-base'>{element.Description}</p>
                                        </div>
                                </div>
                        ))
                }
        </div>

        {/* Right */}
        <div className='relative shadow-blue-400 shadow-[18px_14px_2px_2px_rgba(255,255,255,1)]'>

                <img src={Timelineimage}
                alt='Timelineimage'
                className='w-full h-full object-cover shadow-[18px_14px_2px_2px_rgba(255,255,255,1)]'
                />

                <div className='absolute flex flex-col gap-12 md:flex-row md:gap-5 bg-caribbeangreen-700 text-white uppercase py-10 px-5 left-[50%] transform translate-x-[-50%] -bottom-12'>

                        <div className='flex flex-row gap-5 items-center md:border-r border-caribbeangreen-300 px-5'>
                                <p className='text-4xl font-bold'>10</p>
                                <p className='text-sm text-caribbeangreen-300 w-4 pr-[120px]'>Years experience</p>
                        </div>

                        <div className='flex flex-row gap-5 items-center px-5'>
                                <p className='text-4xl font-bold'>250</p>
                                <p className='text-sm text-caribbeangreen-300 w-[100px] pr-[10px]'>types of courses</p>
                        </div>

                </div>
        </div>

    </div>
  )
}

export default TimelineSection