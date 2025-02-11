const Course = require('../models/Course')
const Category = require('../models/category')
const User = require('../models/User')
const { uploadImageToCloudinary } = require('../utils/imageUploader')

//createCourse handler function
exports.createCourse = async (req, res) => {
    try {
        //fetch data
        let { 
            courseName, 
            coursedescription, 
            whatYouWillLearn, 
            price, 
            tags, 
            status,
            category } = req.body

        //get thumbnail
        const thumbnail = req.files.thumbnailImage

        //validation
        if (!courseName || !coursedescription || !whatYouWillLearn || !price || !tags || !category || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (!status || status === undefined) {
            status = "Draft"
          }
        //check for instructor and get the ID
        const userId = req.user.id
        const instructorDetail = await User.findById(userId)
        console.log("instructor Detail : ", instructorDetail)

        if (!instructorDetail) {
            return res.status(404).json({
                success: false,
                message: "instructor Details not found"
            })
        }

        //check given tag is valide or not
        const categoryDetails = await Category.findById(category)
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "category Details not found"
            })
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        // create an entry for new course
        const newCourse = await Course.create(
            {
                courseName,
                coursedescription,
                instructor: instructorDetail._id,
                whatYouWillLearn: whatYouWillLearn,
                price,
                thumbnail: thumbnailImage.secure_url,
                tags,
                status,
                category:categoryDetails._id
            }
        )

        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetail._id },
            {
                $push: {
                    courses: newCourse._id
                }
            },
            {new:true}
        )

        //update the Category schema
        await Category.findByIdAndUpdate(
            { _id: categoryDetails.id },
            {
                $push: {
                    course: newCourse._id
                }
            },
            {new:true}
        )

        //return response
        return res.status(200).json({
            success:true,
            message:"course created successfully",
            data:newCourse
        })

    }
    catch (error) {
        console.log("error in createCourse controller: ", error)
        res.status(500).json({
            success: false,
            error:error.message,
            message: "Failed to create course"
        })
    }
}


//getALlCourse handler function
exports.showAllCourses= async (req,res) => {
    try{
        //fetch all courses
        const allCourses = await Course.find({},
                                            {
                                                courseName:true,
                                                coursedescription:true,
                                                instructor:true,
                                                ratingAndReview:true,
                                                price:true,
                                                thumbnail:true,
                                                category:true,
                                                tags:true,
                                                studentEnrolled:true
                                            })
                                            .populate("instructor")
                                            .exec()

        //return response
        return res.status(200).json({
            success:true,
            message:"Data of all courses fetched successfully",
            data:allCourses
        })
    }
    catch (error) {
        console.log("error in showAllCourses controller: ", error)
        res.status(500).json({
            success: false,
            error:error.message,
            message: "Failed to show all courses"
        })
    }
}

//get course handler function
exports.getCourseDetail=async(req,res)=>{
    try{
        //get id
        const {courseId}=req.body

        //find course details
        const courseDetails= await Course.findOne({_id:courseId})
                                            .populate(
                                                {
                                                    path:"instructor",
                                                    populate:[
                                                        {path:"additionalDetails"},
                                                        {path:"courses"}
                                                    ]
                                                }
                                            )
                                            .populate("category")
                                            .populate("ratingAndReview")
                                            .populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"subsection"
                                                }
                                            })
                                            .exec()

        //validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`could not find the course with ${courseId}`
            })
        }

        //return  response
        return res.status(200).json({
            success:true,
            message:"course details fetched successfully",
            data:courseDetails
        })
    }
    catch (error) {
        console.log("error in getCourseDetail controller: ", error)
        res.status(500).json({
            success: false,
            error:error.message,
            message: "Failed to get course detail"
        })
    }
}