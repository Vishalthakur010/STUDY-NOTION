const { instance } = require('../config/razorpay')
const Course = require('../models/Course')
const User = require('../models/User')
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail')
const { default: mongoose } = require('mongoose')
const crypto = require("crypto");
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail')
const { mailSender } = require('../utils/mailSender')
const CourseProgress = require('../models/CourseProgress')

//capture the payment and initiates the razorpay order
exports.capturePayment = async (req, res) => {
    const { courses } = req.body
    const userId = req.user.id

    if (!courses || courses?.length === 0) {
        return res.status(400).json({ success: false, message: "Please provide course Id" })
    }

    let totalAmount = 0
    for (const course_id of courses) {
        if (!mongoose.Types.ObjectId.isValid(course_id)) {
            return res.status(400).json({ success: false, message: "Invalid course Id" })
        }
        let course
        try {
            course = await Course.findById(course_id)
            if (!course) {
                return res.status(400).json({ success: false, message: `Course not found with id ${course_id}` })
            }

            const uid = new mongoose.Types.ObjectId(String(userId))

            if (course?.studentEnrolled.includes(uid)) {
                return res.status(400).json({ success: false, message: "Student is already Enrolled" })
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
        receipt: `receipt_${Date.now()}_${Math.random() * 1000}`,
        notes: {
            userId,
            courses
        }
    }

    try {
        const paymentResponse = await instance.orders.create(options)
        res.status(200).json({
            success: true,
            data: paymentResponse
        })
        console.log("[BACKEND] Razorpay Response:", paymentResponse);
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
        return res.status(400).json({ success: false, message: "Missing required payment details" })
    }

    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex")

        // if signature match then enroll the student
        if (razorpay_signature === expectedSignature) {

            //Add amount verification
            const order = await instance.orders.fetch(razorpay_order_id);
            const payment = await instance.payments.fetch(razorpay_payment_id);

            if (order.amount !== payment.amount) {
                console.error("[VERIFY] Amount mismatch:", {
                    orderAmount: order.amount,
                    paymentAmount: payment.amount
                });
                return res.status(400).json({
                    success: false,
                    message: "Payment amount mismatch"
                });
            }

            const enrollmentResult = await enrollStudents(courses, userId, res)

            //return response
            return res.status(enrollmentResult.status).json(enrollmentResult.data)
        }
        return res.status(400).json({ success: false, message: "Payment Failed" })
    }
    catch (error) {
        console.log("error while varifying the payment : ", error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Function for enrolling student
const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({ success: false, message: "Missing courses or userId" })
    }
    console.log("[ENROLL] Starting enrollment for:", {
        courses,
        userId
    });

    //Track enrollment result
    const enrollmentResults = {
        success: [],
        failed: []
    }

    for (const courseId of courses) {
        try {
            // Find the course and enroll the student
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                {
                    $push: { studentEnrolled: userId }
                },
                { new: true }
            )
            if (!enrolledCourse) {
                enrollmentResults.failed.push({
                    courseId,
                    reason: "Course not found"
                });
                continue;
            }
            console.log("[ENROLL] Course Update Result:", enrolledCourse);

            // First create a new CourseProgress document
            const newCourseProgress = await CourseProgress.create({
                courseID: courseId,
                userID: userId,
                completedVideo: []
            });
            console.log("[ENROLL] Created new CourseProgress:", newCourseProgress);

            // Then update the user with both course and courseProgress
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: newCourseProgress._id
                    }
                },
                { new: true }
            );

            if (!enrolledStudent) {
                enrollmentResults.failed.push({
                    courseId,
                    reason: "Student not found"
                });
                continue;
            }
            console.log("[ENROLL] User Update Result:", enrolledStudent);

            //Send the email to the student
            try {
                const emailResponse = await mailSender(
                    enrolledStudent.email,
                    `Successfully Enrolled into ${enrolledCourse.courseName}`,
                    courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
                )

                if (!emailResponse) {
                    console.error("[ENROLL] Failed to send enrollment email");
                }
            } catch (emailError) {
                console.error("[ENROLL] Error sending enrollment email:", emailError);
                // Continue with enrollment even if email fails
            }

            enrollmentResults.success.push({
                courseId,
                courseName: enrolledCourse.courseName
            });
        }
        catch (error) {
            console.error("Error while enrolling Student in course:", courseId, error);
            enrollmentResults.failed.push({
                courseId,
                reason: error.message
            });
        }
    }

    // If all enrollments failed, return an error
    if (enrollmentResults.success.length === 0 && enrollmentResults.failed.length > 0) {
        return {
            status: 500,
            data: {
                success: false,
                message: "Failed to enroll in any courses",
                details: enrollmentResults.failed
            }
        }
    }

    // If some enrollments succeeded and some failed, return a partial success
    if (enrollmentResults.failed.length > 0) {
        return {
            status: 500,
            data: {
                success: true,
                message: "Partially enrolled in courses",
                details: {
                    successful: enrollmentResults.success,
                    failed: enrollmentResults.failed
                }
            }
        }
    }

    // All enrollments succeeded
    return {
        status: 200,
        data: {
            success: true,
            message: "Successfully enrolled in all courses",
            details: enrollmentResults.success
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
        if (!enrolledStudent) {
            console.error("[PAYMENT_EMAIL] User not found:", userId);
            return res.status(404).json({ success: false, message: "User not found" })
        }

        console.log("[PAYMENT_EMAIL] Sending payment success email to:", enrolledStudent.email);

        const emailResponse = await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
                amount / 100, orderId, paymentId)
        )

        if (!emailResponse) {
            console.error("[PAYMENT_EMAIL] Failed to send payment success email");
            return res.status(500).json({ success: false, message: "Could not send email" })
        }

        console.log("[PAYMENT_EMAIL] Payment success email sent successfully");
        return res.status(200).json({ success: true, message: "Payment success email sent successfully" })
    }
    catch (error) {
        console.error("[PAYMENT_EMAIL] Error in SendPaymentSuccessEmail Controller:", error)
        return res.status(500).json({ success: false, message: "Could not send email" })
    }
}