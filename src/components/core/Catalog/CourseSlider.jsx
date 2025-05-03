
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { CourseCard } from "./CourseCard";


export const CourseSlider = ({courses})=> {
    return(
        <div>
            {
                !courses?.length ?
                (
                    <div>No Courses Found</div>
                )
                :(
                    <Swiper
                    modules={[FreeMode, Pagination, Autoplay]}
                    freeMode={true}
                    slidesPerView={2}
                    spaceBetween={30}
                    loop={true}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        1024: {
                            slidesPerView:3
                        }
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                    className="max-h-[30rem]"
                    >
                        {
                            courses?.map((course, index)=>(
                                <SwiperSlide key={index}>
                                    <CourseCard course={course} Height={"h-[250px]"}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                )
            }
        </div>
    )
}