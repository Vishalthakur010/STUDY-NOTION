import { Link } from "react-router-dom"
import { RatingStars } from "../../common/RatingStars"
import { useEffect, useState } from "react"
import GetAvgRating from "../../../utils/avgRating"

export const CourseCard = ({ course, Height }) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0)

    useEffect(()=>{
        const count = GetAvgRating(course?.ratingAndReview)
        setAvgReviewCount(count)
    },[course])
    return (
        <Link to={`/course/${course._id}`}>

            <img
                src={course?.thumbnail}
                alt="course's thumbnail"
                className={`${Height}`}
            />

            <div
            className="flex flex-col gap-1 mt-2"
            >
                <p>{course?.courseName}</p>
                <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>

                <div className="flex  gap-2">
                    <span>{avgReviewCount || 0}</span>
                    <RatingStars Review_Count={avgReviewCount}/>
                    <span>{course?.ratingAndReview?.length} Ratings</span>
                </div>

                <p>{`Rs ${course?.price}`}</p>
            </div>
        </Link>
    )
}