import React from "react";
import ContactUsForm from "../components/core/ContactPage/ContactUsForm";
import { HiOutlineChatAlt2, } from "react-icons/hi";
import { IoCallOutline, IoEarthOutline } from "react-icons/io5";
import { Footer } from "../components/common/Footer";

const ContactUs = () => {
    return (
        <div>
            {/* section-1 */}
            <section>
                <div className="w-11/12 mx-auto max-w-maxContent m-[50px] p-[30px] flex flex-col lg:flex-row lg:gap-10 justify-between">
                    {/* left */}
                    <div className="bg-richblack-800 h-[400px] p-10 pr-[150px] max-h-maxContent flex flex-col gap-10 rounded-2xl">

                        <div className="flex gap-2">
                            <HiOutlineChatAlt2 className="text-2xl text-richblack-25" />
                            <div>
                                <h2 className="text-xl text-richblack-25 font-bold">
                                    Chat on us
                                </h2>
                                <p className="text-richblack-300 text-sm font-bold mt-1">Our friendly team is here to help.</p>
                                <p className="text-richblack-300 text-sm font-bold mt-1">@mail address</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <IoEarthOutline className="text-xl text-richblack-25" />
                            <div>
                                <h2 className="text-xl text-richblack-25 font-bold">
                                    Visit us
                                </h2>
                                <p className="text-richblack-300 text-sm font-bold mt-1">Come and say hello at our office HQ.</p>
                                <p className="text-richblack-300 text-sm font-bold mt-1">Here is the location/address</p>
                            </div>
                        </div>


                        <div className="flex gap-2">
                            <IoCallOutline className="text-2xl text-richblack-25" />
                            <div>
                                <h2 className="text-xl text-richblack-25 font-bold">
                                    Call us
                                </h2>
                                <p className="text-richblack-300 text-sm font-bold mt-1">Mon-Fri From 8am to 5pm</p>
                                <p className="text-richblack-300 text-sm font-bold mt-1">+123 456 789</p>
                            </div>
                        </div>

                    </div>

                    {/* right */}
                    <div className="w-[60%] p-10">

                        <h2 className="text-4xl text-richblack-25 font-semibold">
                            Got an Idea? We've got the Skills. Lets team up
                        </h2>
                        <p className="text-richblack-300 mt-4">
                            Tell us more about yourself and what you've got in mind.
                        </p>
                        <ContactUsForm />
                    </div>
                </div>
            </section>

            {/* section-2 */}
            <section>
                <h2 className='text-center text-4xl font-semibold text-white'>
                    Reviews from other learners
                </h2>
                {/* <RatingAndReview/> */}
            </section>

            {/* section-3 */}
            <section>
                <Footer />
            </section>

        </div>
    )
}

export default ContactUs