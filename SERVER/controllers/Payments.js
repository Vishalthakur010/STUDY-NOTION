const { instance } = require('../config/razorpay')
const Course = require('../models/Course')
const User = require('../models/User')
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail')
const { default: mongoose } = require('mongoose')
const crypto = require("crypto");
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail')
const { mailSender } = require('../utils/mailSender')

//capture the payment and initiates the razorpay order
exports.capturePayment = async (req, res) => {
    const { courses } = req.body
    const userId = req.user.id

    if (courses?.length === 0) {
        return res.json({ success: false, message: "Please provide course Id" })
    }

    let totalAmount = 0
    for (const course_id of courses) {
        let course
        try {
            course = await Course.findById(course_id)
            if (!course) {
                return res.status(200).json({ success: false, message: "Could not find the course" })
            }

            const uid = new mongoose.Types.ObjectId(String(userId))

            if (course?.studentEnrolled.includes(uid)) {
                return res.status(200).json({ success: false, message: "Student is already Enrolled" })
            }

            totalAmount += course?.price
        }
        catch (error) {
            console.log("error in coursePayment while calculating totalAmount : ", error)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString()
    }

    try {
        const paymentResponse = await instance.orders.create(options)
        res.status(200).json({
            success: true,
            data: paymentResponse
        })
    }
    catch (error) {
        console.log("error in coursePayment while creating order : ", error)
        res.status(500).json({
            success: false,
            message: "Could not initiate order"
        })
    }
}

//verify Signature of razorpay and server
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user?.id

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature ||
        !courses || !userId) {
        res.status(400).json({ success: false, message: "Missing required payment details" })
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())

    if (razorpay_signature === expectedSignature) {
        // enroll the student
        await enrollStudents(courses, userId, res)

        //return response
        return res.status(200).json({ success: true, message: "Payment Verified" })
    }
    return res.status(200).json({ success: true, message: "Payment Failed" })
}

//Function for enrolling student
const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({ success: false, message: "Missing courses or userId" })
    }

    for (const courseId of courses) {

        try {
            // Find the course and enroll the student
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                {
                    $push:
                        { studentEnrolled: userId }
                },
                { new: true }
            )
            if (!enrolledCourse) {
                return res.status(500).json({ success: false, messasge: "Course not found" })
            }

            // Find the student and add the course to their enrolled courses list
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push: {
                        courses: courseId
                    }
                },
                { new: true }
            )
            if (!enrolledStudent) {
                return res.status(500).json({ success: false, messasge: "Student not found" })
            }

            //Send the email to the student
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
            )
            if (!emailResponse) {
                return res.status(500).json({ success: false, messasge: "Could not send email" })
            }
            console.log("Email Response : ", emailResponse)
        }
        catch (error) {
            console.log("Error while enrolling Student", error)
            return res.status(500).json({ success: false, message: error.message })
        }
    }
}

exports.SendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
    const userId = req.user.id

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({ success: false, message: "please provide required details" })
    }

    try {
        // find student and send mail
        const enrolledStudent = await User.findById(userId)
        mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
                amount / 100, orderId, paymentId)
        )
    }
    catch (error) {
        console.log("error in SendPaymentSuccessEmail Controller while sending email : ", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}


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