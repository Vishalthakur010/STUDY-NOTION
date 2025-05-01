const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection")

exports.updateCourseProgress = async (req, res) => {
    const {courseId, subSectionId} = req.body
    const userId = req.user.id

    try{
        //check if the subsection is valid
        const subsection = await SubSection.findById(subSectionId)
        if(!subsection){
            return res.status(404).json({
                success: false,
                message: "Invalid subsection"
            })
        }

        // Find the course progress document for the user and course
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userID: userId
        })

        if(!courseProgress){
            //if course Progress does not exist, create a new one
            return res.status(404).json({
                success: false,
                message: "Course Progress Does Not Exist"
            })
        }else{
            //if course progress exists, check if the subsection is already completed
            if(courseProgress.completedVideo.includes(subSectionId)){
                return res.status(400).json({error: "Subsection already completed"})
            }
            courseProgress.completedVideo.push(subSectionId)
        }

        //save the updated course progress
        await courseProgress.save()

        return res.status(200).json({
            success: true,
            message: "Course progress updated"
        })

    }
    catch (error) {
        console.log("error in courseProgress controller: ", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}