const mongoose = require('mongoose')

const Course = new mongoose.Schema({
    courseName: {
        type: String
    },
    coursedescription: {
        type: String
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    whatYouWillLearn: {
        type: String
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],
    ratingAndReview: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview"
        }
    ],
    price: {
        type: Number
    },
    thumbnail: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    tags:{
        type:[String],
        required:true
    },
    studentEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    ],
	instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
	createdAt: {
		type:Date,
		default:Date.now
	},
})

module.exports = mongoose.model("Course", Course)