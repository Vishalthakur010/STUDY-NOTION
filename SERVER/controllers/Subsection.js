const Section = require('../models/Section')
const SubSection = require('../models/SubSection')
const { uploadImageToCloudinary } = require('../utils/imageUploader')
require('dotenv').config()

//create Subsection
exports.createSubsection = async (req, res) => {
    try {
        //fetch data
        const { sectionId, title, description } = req.body
        //extract file/video
        const video = req.files.videoFile

        //validate
        if (!sectionId || !title || !description || !videoFile) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

        //create a subsection
        const subsectionDetails = await SubSection.create({
            title,
            timeDuration: `${uploadDetails.duration}`,
            description,
            videoUrl: uploadDetails.secure_url
        })

        //update section with this subsection objectId
        const UpdatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subsection: subsectionDetails._id
                }
            },
            { new: true })
            .populate("subsection")
        // HW: log updated section here after adding populate query

        //return response 
        return res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            UpdatedSection
        })
    }
    catch (error) {
        console.log("error in createSubsection controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to create Subsection"
        })
    }
}

//HW
// update subsection
exports.updateSubsection = async (req, res) => {
    try {
        //fetch data
        const { sectionId, subSectionId, title, description } = req.body
        const subSection = await SubSection.findById(subSectionId)

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        if (title !== undefined) {
            subSection.title = title
        }

        if (description !== undefined) {
            subSection.description = description
        }

        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save()

        // find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate(
            "subsection"
        )

        console.log("updated section", updatedSection)

        //return response
        return res.status(200).json({
            success: true,
            message: "Subsection updated successfully",
            data:updatedSection
        })
    }
    catch (error) {
        console.log("error in updateSubsection controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to upadte Subsection"
        })
    }
}

//delete subsection
exports.deleteSubsection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body


        // Validate input
        if (!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Both subSectionId and sectionId are required",
            });
        }

        //delete subsection from section
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
            subsection: subSectionId,
        },
      }
    )

    //delete subsection
    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }


    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subsection"
    )

        //return response
        return res.status(200).json({
            success: true,
            message: "Subsection deleted successfully",
            data:updatedSection
        })
    }
    catch (error) {
        console.log("error in deleteSubsection controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to delete Subsection"
        })
    }
}