import React from 'react'
import CTAButton from './Button'
import { FaArrowRight } from "react-icons/fa";
import { HighlightText } from './HighlightText';
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks = ({
        position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) => {
        return (
                <div className={`flex ${position} my-20 mt-[120px]  justify-center gap-[140px]`}>

                        {/* section 1 */}
                        <div className='w-[100%] lg:w-[40%] flex flex-col gap-8'>
                                {heading}
                                <div className='text-richblack-300 w-[90%] -mt-3'>
                                        {subheading}
                                </div>
                                <div className='flex flex-row gap-7 mt-4'>
                                        <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                                                <div className='flex gap-2 items-center'>
                                                        {ctabtn1.btntext}
                                                        <FaArrowRight />
                                                </div>
                                        </CTAButton>
                                        <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                                                {ctabtn2.btntext}
                                        </CTAButton>
                                </div>
                        </div>

                         {/* section 2 */}
                         <div className='flex code-border h-fit w-[100%] lg:w-[40%] py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative'>
                                {backgroundGradient}
                                <div className='flex flex-col text-center font-inter font-bold w-[10%] text-richblack-400 select-none'>
                                        <p>1</p>
                                        <p>2</p>
                                        <p>3</p>
                                        <p>4</p>
                                        <p>5</p>
                                        <p>6</p>
                                        <p>7</p>
                                        <p>8</p>
                                        <p>9</p>
                                        <p>10</p>
                                        <p>11</p>
                                </div>
                                <div className={` w-[90%]flex flex-col gap-2 font-bold font-mono w-[90%] ${codeColor} pr-2 `}>
                                        <TypeAnimation
                                        sequence={[codeblock, 1000, ""]}
                                        repeat={Infinity}
                                        cursor={true}
                                        style={{
                                                whiteSpace: "pre-line",
                                                display: "block",
                                              }}
                                              omitDeletionAnimation={true}
                                        />
                                </div>
                         </div>
                </div>
        )
}

export default CodeBlocks