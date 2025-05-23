const Course = require('../models/Course')
const CourseProgress = require('../models/CourseProgress')
const Profile = require('../models/Profile')
const User = require('../models/User')
const { uploadImageToCloudinary } = require('../utils/imageUploader')
const { convertSecondsToDuration } = require('../utils/secToDuration')
require('dotenv').config()

//update profile
exports.updateProfile = async (req, res) => {
    try {
        //fetch data
        const {
            firstName = "",
            lastName = "",
            dateOfBirth = "",
            about = "",
            gender = "",
            contactNo = ""
        } = req.body
        //get user Id
        const id = req.user.id

        //validation
        if (!gender || !contactNo || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //find profile
        const userDetails = await User.findById(id)
        const profileId = userDetails.additionalDetails

        const user = await User.findByIdAndUpdate(id,
            {
                firstName,
                lastName,
            },
            { new: true }
        )

        //upadte profile
        await Profile.findByIdAndUpdate(profileId,
            {
                dateOfBirth,
                gender,
                about,
                contactNo
            },
            { new: true }
        )

        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec()
        //return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails
        })
    }
    catch (error) {
        console.log("error in updateProfile controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to update profile"
        })
    }
}

//delete Account 
// HW: how can we schedule the deletion request
exports.deleteAccount = async (req, res) => {
    try {
        //get id
        const id = req.user.id

        //validation
        const userDetails = await User.findById(id)
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "user not find"
            })
        }

        //delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails })

        // HW: unenroll user from all enrolled courses
        await Course.updateMany(
            {
                _id: { $in: userDetails.courses }
            },
            {
                $pull: {
                    studentEnrolled: id
                }
            },
            { new: true }
        )

        //delete user
        await User.findByIdAndDelete(id)

        //return response
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        })
    }
    catch (error) {
        console.log("error in deleteAccount controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to delete account"
        })
    }
}

//get user details
exports.getAllUserDetails = async (req, res) => {
    try {
        //get id
        const id = req.user.id

        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec()

        //return response
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            data: userDetails
        })
    }
    catch (error) {
        console.log("error in deleteAccount controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to fetched user details"
        })
    }
}

//update profile picture
exports.updateDisplayPicture = async (req, res) => {
    try {
        if (!req.files || !req.files.displayPicture) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded"
            });
        }
        //fetch data and file
        const picture = req.files.displayPicture
        const userId = req.user.id

        //upload to cloudinary
        const image = await uploadImageToCloudinary(picture, process.env.FOLDER_NAME, 1000, 1000)
        if (!image || !image.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload image to Cloudinary"
            });
        }
        console.log("image : ", image)

        // update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { image: image.secure_url },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: "image updated successfully",
            data: updatedUser
        })
    }
    catch (error) {
        console.log("error in updateDisplayPicture controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to update profile picture"
        })
    }
}

// Get User Enrolled Courses
exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        const userDetails = await User.findById(userId)
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec()

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            })
        }

        const enrolledCourses = userDetails.courses
        const courseProgress = await CourseProgress.find({ userID: userId })

        // Calculate progress for each course
        const coursesWithProgress = enrolledCourses.map(course => {
            const courseProgressData = courseProgress.find(
                progress => progress.courseID.toString() === course._id.toString()
            )

            let totalSubSections = 0
            let completedSubSections = 0

            // Calculate total subsections and completed subsections
            course.courseContent.forEach(section => {
                totalSubSections += section.subSection.length
                if (courseProgressData) {
                    completedSubSections += section.subSection.filter(subSec => 
                        courseProgressData.completedVideo.includes(subSec._id.toString())
                    ).length
                }
            })

            const progressPercentage = totalSubSections > 0 
                ? Math.round((completedSubSections / totalSubSections) * 100)
                : 0

            return {
                ...course.toObject(),
                progressPercentage
            }
        })

        return res.status(200).json({
            success: true,
            data: coursesWithProgress,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Instructor Dashboard
exports.instructorDashboard= async (req,res)=>{
    try{
        const courseDetails =await Course.find({instructor:req.user.id})

        const courseData= courseDetails.map((course)=> {
            const totalStudentEnrolled= course.studentEnrolled.length
            const totalAmountGenerated= totalStudentEnrolled * course.price

            // create a new object with additional fields
            const courseDataWithStats= {
                _id:course._id,
                courseName:course.courseName,
                courseDescription:course.coursedescription,
                totalStudentEnrolled,
                totalAmountGenerated
            }
            return courseDataWithStats
        })
        return res.status(200).json({courses:courseData})
    }
    catch (error) {
        console.log("error in instructorDashboard controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to get Instructor Dashboard"
        })
    }
}