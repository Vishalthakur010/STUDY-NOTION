const Course = require('../models/Course')
const Category = require('../models/category')
const User = require('../models/User')
const { uploadImageToCloudinary } = require('../utils/imageUploader')
const { convertSecondsToDuration } = require('../utils/secToDuration')
const CourseProgress = require('../models/CourseProgress')
const Section = require('../models/Section')
const SubSection = require('../models/SubSection')
const RatingAndReview = require('../models/RatingAndReview')

//createCourse handler function
exports.createCourse = async (req, res) => {
    try {
        //fetch data
        let {
            courseName,
            coursedescription,
            whatYouWillLearn,
            price,
            tags: _tags,
            status,
            category,
            instructions: _instructions
        } = req.body

        //get thumbnail
        const thumbnail = req.files.thumbnailImage

        // Convert the tag and instructions from stringified Array to Array
        const tags = JSON.parse(_tags)
        const instructions = JSON.parse(_instructions)

        console.log("tags", tags)
        console.log("instructions", instructions)

        //validation
        if (!courseName || !coursedescription || !whatYouWillLearn || !price || !tags || !category || !thumbnail || !instructions) {
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
        const instructorDetail = await User.findById(userId, {
            accountType: "Instructor",
          })
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
                category: categoryDetails._id,
                instructions,
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
            { new: true }
        )

        //update the Category schema
        const updatedCategory = await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    course: newCourse._id
                }
            },
            { new: true }
        )
        console.log("updatedCategory : ", updatedCategory )

        //return response
        return res.status(200).json({
            success: true,
            message: "course created successfully",
            data: newCourse
        })

    }
    catch (error) {
        console.log("error in createCourse controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to create course"
        })
    }
}

//getALlCourse handler function
exports.showAllCourses = async (req, res) => {
    try {
        //fetch all courses
        const allCourses = await Course.find({},
            {
                courseName: true,
                coursedescription: true,
                instructor: true,
                ratingAndReview: true,
                price: true,
                thumbnail: true,
                category: true,
                tags: true,
                studentEnrolled: true
            })
            .populate("instructor")
            .exec()

        //return response
        return res.status(200).json({
            success: true,
            message: "Data of all courses fetched successfully",
            data: allCourses
        })
    }
    catch (error) {
        console.log("error in showAllCourses controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to show all courses"
        })
    }
}

//get course handler function
exports.getCourseDetail = async (req, res) => {
    try {
        //get id
        const { courseId } = req.body

        //find course details
        const courseDetails = await Course.findOne({ _id: courseId })
            .populate(
                {
                    path: "instructor",
                    populate: [
                        { path: "additionalDetails" },
                        { path: "courses" }
                    ]
                }
            )
            .populate("category")
            .populate("ratingAndReview")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })
            .exec()

        //validation
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `could not find the course with ${courseId}`
            })
        }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        //return  response
        return res.status(200).json({
            success: true,
            message: "course details fetched successfully",
            data: {
                courseDetails,
                totalDuration
            }
        })
    }
    catch (error) {
        console.log("error in getCourseDetail controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to get course detail"
        })
    }
}

//edit course handler function
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "course not found" })
        }

        //If thumbnail Image is found, update it
        if (req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }

        //update only the fields that are present in request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tags" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }

        await course.save()

        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate("category")
            .populate("ratingAndReview")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })
            .exec()

            console.log("updated course : ", updatedCourse)

         res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse
        })
    }
    catch (error) {
        console.log("error in editCourse controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to edit course"
        })
    }
}

//get full course details handler function
exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id

        const courseDetails = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate("category")
            .populate("ratingAndReview")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })
            .exec()

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `could not find course with id : ${courseId}`
            })
        }

        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userID: userId
        })
        console.log("courseProgressCount : ", courseProgressCount)

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                complatedVideos: courseProgressCount?.completedVideo
                    ? courseProgressCount?.completedVideo
                    : []
            }
        })
    }
    catch (error) {
        console.log("error in getFullCourseDetails controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to get FullCourseDetails"
        })
    }
}

// get instructor courses
exports.getInstructorCourses = async (req, res) => {
    try {
        //get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id

        //find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId
        }).sort({ createdAt: -1 })

        //Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses
        })
    }
    catch (error) {
        console.log("error in getInstructorCourses controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to get instrucotr courses"
        })
    }
}

//delete the course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id

        //find the course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "course not found" })
        }

        //unenroll students from the course
        const studentsEnrolled = course.studentEnrolled
        for (const studentId of studentsEnrolled) {
            // Remove course from user's courses array
            await User.findByIdAndUpdate(studentId,
                {
                    $pull: { 
                        courses: courseId,
                        courseProgress: { $in: course.courseProgress }
                    }
                }
            )
        }

        //delete course progress documents
        await CourseProgress.deleteMany({
            courseID: courseId
        })

        //delete rating and reviews
        await RatingAndReview.deleteMany({
            course: courseId
        })

        //delete sections and subsections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            // delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
            //delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        //remove course from category
        await Category.findByIdAndUpdate(
            course.category,
            {
                $pull: { course: courseId }
            }
        )

        //remove course from instructor's courses array
        await User.findByIdAndUpdate(
            course.instructor,
            {
                $pull: { courses: courseId }
            }
        )

        //delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })
    }
    catch (error) {
        console.log("error in deleteCourse controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to delete course"
        })
    }
}