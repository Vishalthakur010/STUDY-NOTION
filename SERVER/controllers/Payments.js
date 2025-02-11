// const { instance } = require('../config/razorpay')
// const Course = require('../models/Course')
// const User = require('../models/User')
// const mailSender = require('../utils/mailSender')
// const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail')
// const { default: mongoose } = require('mongoose')


// //capture the payment and initiates the razorpay order
// exports.capturePayment = async (req, res) => {
//     //get courseId and UserId
//     const { course_Id } = req.body
//     const userId = req.user.id

//     //validation
//     //valid CourseId
//     if (!course_Id) {
//         return res.json({
//             success: false,
//             message: "please provide a valid course Id"
//         })
//     }

//     let course
//     //valid CourseDetail
//     try {
//         course = await Course.findById(course_Id)
//         if (!course) {
//             return res.status({
//                 success: false,
//                 message: "could not find the course"
//             })
//         }
//         //user already pay for the same course
//         const uid = mongoose.Types.ObjectId(userId)
//         if (Course.studentEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success: false,
//                 message: "student is already emrolled"
//             })
//         }

//         // const isEnrolled = await Course.exists({
//         //     _id: course_Id,
//         //     studentEnrolled: userId,
//         // });
//         // if (isEnrolled) {
//         //     return res.status(200).json({
//         //         success: false,
//         //         message: "Student is already enrolled",
//         //     });
//         // }

//     } catch (error) {
//         console.error(error)
//         return res.status(200).json({
//             success: false,
//             message: error.message
//         })
//     }

//     // order create
//     const amount = course.price
//     const currency = "INR"

//     const options = {
//         amount: amount * 100, //mandatory
//         currency, //mandatory
//         receipt: Math.random(Date.now()).toString(), //optional
//         notes: {                                     //optional
//             courseId: course_Id,
//             userId
//         }
//     }

//     try {
//         //initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options)
//         console.log(paymentResponse)

//         return res.status(200).json({
//             success: true,
//             message: "order initiated",
//             courseName: course.courseName,
//             courseDescription: course.coursedescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount
//         })
//     }
//     catch (error) {
//         console.log(error)
//         res.json({
//             success: false,
//             message: "could not initiate order"
//         })
//     }
// }

// //verify Signature of razorpay and server
// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678"

//     const signature = req.headers["x-razorpay-signature"]

//     const shasum = crypto.createHmac("sha256", webhookSecret)
//     shasum.update(JSON.stringify(req.body))
//     const digest = shasum.digest("hex")

//     if (digest == signature) {
//         console.log("Payment is Authorized")

//         const { courseId, userId } = req.body.payload.payment.entity.notes

//         try {
//             //fullfill the action

//             //find the course and enroll the student in it
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 { _id: courseId },
//                 { $push: { studentEnrolled: userId } },
//                 { new: true }
//             )
//             if (!enrolledCourse) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "course not found"
//                 })
//             }
//             console.log(enrolledCourse)

//             //find the student and add the course to their list of enrolled courses
//             const enrolledStudent = await User.findOneAndUpdate(
//                 { _id: userId },
//                 { $push: { courses: courseId } },
//                 { new: true }
//             )
//             if (!enrolledStudent) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "student not found"
//                 })
//             }
//             console.log(enrolledStudent)

//             //send confirmation email
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "congratulation from StudyNotion",
//                 "congratulation , you are onboarded into new studyNotion course"
//             )
//             console.log(emailResponse)

//             //return response
//             return res.status(200).json({
//                 success: true,
//                 message: "signature verified and course added"
//             })
//         }
//         catch (error) {
//             console.log(error)
//             return res.status(500).json({
//                 success: false,
//                 message: "error in verifySignature function",
//                 message: error.message
//             })
//         }
//     }
//     else {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid request"
//         })
//     }
// }