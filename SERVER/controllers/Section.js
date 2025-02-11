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
                    path: "subsection",
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
        const { sectionName, sectionId } = req.body

        //validate
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //update section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true })

        //return response
        return res.status(200).json({
            success: true,
            message: "section updated successfully",
            updatedSection
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

        //delete section from course
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {
                    courseContent: sectionId
                }
            }
        )

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not Found",
            })
        }

        // find section and delete
        const deletedSection = await Section.findByIdAndDelete(sectionId)
        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not Found",
            })
        }

        //delete all the subsection 
        await SubSection.deleteMany({
            _id:
                { $in: updatedSection.subsection }
        })


        //return response
        return res.status(200).json({
            success: true,
            message: "section deleted successfully",
            updatedSection
            // updatedCourseDetails
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