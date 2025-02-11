const RatingAndReview = require('../models/RatingAndReview')
const Course = require('../models/Course')
const { default: mongoose } = require('mongoose')

//create Rating and Review
exports.createRating = async (req, res) => {
    try {
        //get userId
        const userId = req.user.id

        //fetch data from req body
        const { rating, review, courseId } = req.body

        //check if user id already enrolled or not
        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentEnrolled: { $in: [userId] }
            }
        )
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "student is not enrolled in the course"
            })
        }

        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne(
            { user: userId },
            { course: courseId }
        )
        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "user is already Reviewed the course"
            })
        }

        //creating Rating and Review
        const RatingReview = await RatingAndReview.create({
            user: userId,
            rating,
            review,
            course: courseId
        })

        // upadte course with Rating and Review
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push: {
                    ratingAndReview: RatingReview.id
                }
            },
            { new: true }
        )

        //return response
        return res.status(200), json({
            success: true,
            message: "Rating and Review created successfully",
            RatingReview
        })
    }
    catch (error) {
        console.log("error in createRating controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to create Rating and Reiew"
        })
    }
}

//get average Rating
exports.getAverageRating = async (req, res) => {
    try {
        //get course Id
        const courseId=req.body.courseId

        //calculate Rating
        const result= await RatingAndReview.aggregate([
                {
                    $match:{
                        course:mongoose.Types.ObjectId(courseId)
                    }
                },
                {
                    $group:{
                        _id:null,
                        averageRating:{$avg:"$rating"}
                    }
                }
        ])

        //return rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                message:"Rating calculated successfully",
                averageRating:result[0].averageRating
            })
        }

        //if no rating/review exist
        return res.status(200).json({
            success:true,
            message:"Average Rating is 0, no ratings given till now",
            averageRating:0
        })
    }
    catch (error) {
        console.log("error in getAverageRating controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to get Average Rating"
        })
    }
}

//get All Rating
exports.getAllRating=async(req,res)=>{
    try{
        const allReview= await RatingAndReview.find({})
                                            .sort({rating:"desc"})
                                            .populate({
                                                path:"user",
                                                select:"firstName lastName email image"
                                            })
                                            .populate({
                                                path:"course",
                                                select:"courseName"
                                            })
                                            .exec()

        //return response
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReview
        })
    }
    catch (error) {
        console.log("error in getAllRating controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to get All Rating"
        })
    }
}