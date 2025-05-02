import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { ratingsEndpoints } from "../../services/api";
import { useEffect, useState } from "react"
import { apiconnector } from "../../services/apiconnector";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";

export const ReviewSlider = () => {

    const [reviews, setReviews] = useState([])
    const truncateWords = 15

    useEffect(() => {
        const fetchReviews = async () => {
            const { data } = await apiconnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            // console.log("response : ", data)

            if (data?.success) {
                setReviews(data?.data)
            }
            console.log("printing reviews : ", reviews)
        }
        fetchReviews()
    }, [])
    return (
        <div className=" my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
            <Swiper
                modules={[FreeMode, Pagination, Autoplay]}
                freeMode={true}
                slidesPerView={2}
                spaceBetween={30}
                loop={true}
                pagination={{ clickable: true }}
                breakpoints={{
                    1024: {
                        slidesPerView: 3
                    }
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                className="w-full"
            >
                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index}
                            className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25"
                        >

                            <div className="text-white flex gap-2">
                                <img
                                    src={review?.user?.image ?
                                        review?.user?.image
                                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                    }
                                    alt="Profile pic"
                                    className="w-9 h-9 rounded-full object-cover"
                                />

                                <div className="flex flex-col">
                                    <p className="font-semibold text-richblack-5">{review?.user?.firstName} {review?.user?.lastName}</p>
                                    <p className="text-[12px] font-medium text-richblack-500">{review?.course?.courseName}</p>
                                </div>
                            </div>

                            <p className="font-medium text-richblack-25">
                                {review?.review.split(" ").length > truncateWords
                                ? `${review?.review
                                    .split(" ")
                                    .slice(0, truncateWords)
                                    .join(" ")} ...`
                                : `${review?.review}`}
                                </p>

                            <div className="flex gap-2 items-center">
                                <p className="font-semibold text-yellow-100">{review?.rating}</p>

                                <ReactStars
                                    count={5}
                                    value={review.rating}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<FaStar />}
                                    fullIcon={<FaStar />}
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}