const { cashfreeInstance } = require('../config/cashFree')
const Course = require('../models/Course')
const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail')
const { default: mongoose } = require('mongoose')
const { v4: uuidv4 } = require('uuid');


//capture the payment and initiates the cashfree order
exports.capturePayment = async (req, res) => {
    //get courseId and UserId
    const { course_Id } = req.body
    const userId = req.user.id

    //validation
    //valid CourseId
    if (!course_Id) {
        return res.json({
            success: false,
            message: "please provide a valid course Id"
        })
    }

    let course, currentUser
    //valid CourseDetail
    try {
        course = await Course.findById(course_Id)
        if (!course) {
            return res.status({
                success: false,
                message: "could not find the course"
            })
        }

        //find user details
        currentUser = await User.findById(userId)
        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        //user already pay for the same course
        const uid = mongoose.Types.ObjectId(userId)
        if (Course.studentEnrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: "student is already emrolled"
            })
        }

    } catch (error) {
        console.error(error)
        return res.status(400).json({
            success: false,
            message: "An error occurred while validating course and user",
        })
    }

    // Generate a unique order ID (use a library like `uuid` or custom logic)
    const orderId = `order_${uuidv4()}`;

    // Create a payment link using Cashfree
    const options = {
        order_id: orderId,
        order_amount: course.price,
        order_currency: 'INR',
        customer_details: {
            customer_name: currentUser.firstName,
            customer_email: currentUser.email,
            customer_phone: '9999999999', // Dummy phone for testing
        },
        notes: {                                     //optional
            courseId: course_Id,
            userId
        },
        order_note: 'Test payment',
        return_url: 'http://localhost:3000/success',
        notify_url: 'http://localhost:3000/webhook',
    }

    try {
        //initiate the payment using cashfree
        const paymentResponse = await cashfreeInstance.Orders.createOrder(options)
        console.log(paymentResponse)

        return res.status(200).json({
            success: true,
            message: "order initiated",
            paymentResponse
        })
    }
    catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "could not initiate order"
        })
    }
}

//verify Signature of cashfree and server
exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678"; // Replace with your actual Cashfree webhook secret
    const signature = req.headers["x-webhook-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest("base64"); // Cashfree uses base64 encoding for signature

    if (digest == signature) {
        console.log("Payment is Authorized")

        const { courseId, userId } = req.body.notes
        console.log('Course ID:', courseId);
        console.log('User ID:', userId);

        try {
            //fullfill the action

            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentEnrolled: userId } },
                { new: true }
            )
            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "course not found"
                })
            }
            console.log(enrolledCourse)

            //find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true }
            )
            if (!enrolledStudent) {
                return res.status(500).json({
                    success: false,
                    message: "student not found"
                })
            }
            console.log(enrolledStudent)

            //send confirmation email
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "congratulation from StudyNotion",
                "congratulation , you are onboarded into new studyNotion course"
            )
            console.log(emailResponse)

            //return response
            return res.status(200).json({
                success: true,
                message: "signature verified and course added"
            })
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "error in verifySignature function",
                message: error.message
            })
        }
    }
    else {
        return res.status(400).json({
            success: false,
            message: "Invalid request"
        })
    }
}