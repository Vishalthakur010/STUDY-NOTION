const Section = require('../models/Section')
const Course = require('../models/Course')
const SubSection = require('../models/SubSection')

//create Section
exports.createSection = async (req, res) => {
    try {
        //fetch data
        const { sectionName, courseId } = req.body

        //validate
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //create section
        const newSection = await Section.create({ sectionName })

        //update course with section objectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            { new: true }
        )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()
        //HW: use populate to replace section/sub-section both in the updatedcourse

        //return response
        return res.status(200).json({
            success: true,
            message: "section created successfully",
            updatedCourseDetails
        })
    }
    catch (error) {
        console.log("error in createSection controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to create section"
        })
    }
}


// update Section
exports.updateSection = async (req, res) => {
    try {
        //fetch data
        const { sectionName, sectionId, courseId } = req.body

        //validate
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //update section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId, 
            { sectionName }, 
            { new: true }
        )

        const course = await Course.findById(courseId)
        .populate({
            path: "courseContent",
            populate: {
                path: "subsection",
            },
        })
        .exec()

        //return response
        return res.status(200).json({
            success: true,
            message: updatedSection,
            data: course
        })
    }
    catch (error) {
        console.log("error in updateSection controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to update section"
        })
    }
}


// delete Section
exports.deleteSection = async (req, res) => {
    try {
        //get Id :- assuming that we are sending Id in params
        const { sectionId, courseId } = req.body

        // Validate input
        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Both sectionId and courseId are required",
            });
        }

        // find section
        const section = await Section.findById(sectionId)
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not Found",
            })
        }

        //delete all the subsection 
        await SubSection.deleteMany({
            _id:
                { $in: section.subSection }
        })

        //delete section from course
        const course = await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {
                    courseContent: sectionId
                }
            },
            {new:true}
        )

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not Found",
            })
        }
        
        //delete section
        await Section.findByIdAndDelete(sectionId)

        // find the updated course and return
        const updatedCourse= await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        .exec()

        //return response
        return res.status(200).json({
            success: true,
            message: "section deleted successfully",
            data:updatedCourse
        })
    }
    catch (error) {
        console.log("error in deleteSection controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to delete section"
        })
    }
}