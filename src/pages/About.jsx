import React from 'react'
import { HighlightText } from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import foundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import { Footer } from '../components/common/Footer'

const About = () => {
    return (
        <div className='text-white'>

            {/* section 1 */}
            <section className='bg-richblack-800'>
                <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-6 text-white pt-[90px]'>
                    <div className='text-lg text-richblack-200'>
                        About us
                    </div>
                    <h2 className='text-richblack-5 text-4xl font-semibold text-center w-[65%] mt-5 '>
                        Driving Innovation In Online Education for a
                        <HighlightText text={" Brighter Future"} />
                    </h2>
                    <p className='text-[17px] text-richblack-300 text-center w-[64%]'>
                        Studynotion is at the forefront of driving innovation in online education.
                        we're passionate about creating a brighter future by offering cutting-edge courses,
                        leveraging emerging technologies and nurturing a vibrant learning community.
                    </p>
                    <div className='flex flex-col lg:flex-row gap-6 mt-6'>
                        <img src={BannerImage1} />
                        <img src={BannerImage2} />
                        <img src={BannerImage3} />
                    </div>
                </div>
            </section>

            {/* section 2 */}
            <section>
                <Quote />
            </section>

            {/* section 3 */}
            <section >

                {/* founding story */}
                <div className='flex flex-col lg:flex-row items-center justify-between'>
                    {/* left */}
                    <div>
                        <h2>
                            Our Founding Story
                        </h2>
                        <p>
                            Our e-learning platform was born out of a shared vision and passion
                            for transforming education. It all begin with a group of educators,
                            technologists, and lifelong learners who recognized the need for accessible,
                            flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges
                            of traditional education systems. We believed that education should not be confined to the walls
                            of a classroom or restricted by geographical boundaries. We envisioned a platform that could
                            bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                    </div>

                    {/* right */}
                    <div>
                        <img src={foundingStory} />
                    </div>
                </div>

                {/* vision and mission */}
                <div className='flex flex-col lg:flex-row items-center justify-between'>
                    {/* left */}
                    <div>
                        <h2>
                            Our Vision
                        </h2>
                        <p>
                            With this vision in mind, we set out on a journey to create an e-learning platform that
                            would revolutionize the way people learn. Our team of dedicated experts worked tirelessly
                            to develop a robust and intuitive platform that combines cutting-edge technology with engaging
                            content, fostering a dynamic and ineractive learning experience.
                        </p>
                    </div>

                    {/* right */}
                    <div>
                        <h2>
                            Our Mission
                        </h2>
                        <p>
                            Our mission goes beyond just delivering cources online. We wanted to create a vibrant
                            community of learners, where individuals can connect, collaborate, and learn from one-another.
                            We believe that knowledge thrives in an enviroment of sharing and dialogue, and we foster this
                            spirit of collaboration through forums, live sessions and networking opportunities.
                        </p>
                    </div>
                </div>

            </section>

            {/* section 4 */}
            <section>
                <StatsComponent />
            </section>

            {/* section 5 */}
            <section>
                <LearningGrid />
            </section>

            {/* section 6 */}
            <section>
                <ContactFormSection />
            </section>

            {/* section 7 */}
            <section>
                {/* <RatingAndReview/> */}
            </section>

            {/* section 8 */}
            <section>
                <Footer />
            </section>

        </div>
    )
}

export default About