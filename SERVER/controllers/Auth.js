const User = require('../models/User')
const OTP = require('../models/OTP')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const Profile = require('../models/Profile')
const jwt = require('jsonwebtoken')
const { mailSender } = require('../utils/mailSender')
require('dotenv').config()

//sendOTP

exports.sendOTP = async (req, res) => {
    try {
        // frtch email from request body
        const { email } = req.body

        //check if user already exists
        const checkUserPresent = await User.findOne({ email })

        //if user already exists, return response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "user already registered"
            })
        }

        // if new user, generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })
        // console.log("otp: ", otp)

        //check otp is unique
        const result = await OTP.findOne({ otp: otp })

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            result = await OTP.findOne({ otp: otp })
        }

        const otpPayload = { email, otp }

        //create an entry for OTP
        const otpBody = await OTP.create(otpPayload)
        // console.log("otp payload: ", otpBody)

        //return response successfully
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp
        })

    }
    catch (error) {
        console.log("error in sendOTP controller: ", error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "OTP can not be sent"
        })
    }
}


//signup

exports.signUp = async (req, res) => {
    try {
        //fetch data from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body

        //validate data
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        //match both password
        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password and confirm password does not match"
            })
        }

        //check user already exist or not
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user is already registered"
            })
        }

        //find most recent otp stored for the user
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)

        //validate otp
        if (recentOtp.length == 0) {
            //otp not found
            return res.status(400).json({
                success: false,
                message: "otp not found"
            })
        } else if (otp != recentOtp[0].otp) {
            //invalid otp
            return res.status(400).json({
                success: false,
                message: "Invalid otp"
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create the user
        let approved = ""
        approved === "Instructor" ? (approved = false) : (approved = true)
        // let approved = accountType === "Instructor" ? false : true;


        const profileDetail = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNo: null
        })
        //create entry in db
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            approved: approved,
            contactNumber,
            additionalDetails: profileDetail._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}` // api for creting according to their name
        })

        //return response 
        res.status(200).json({
            success: true,
            message: "user registered successfully",
            user
        })
    }
    catch (error) {
        console.log("error in signUp controller: ", error)
        res.status(500).json({
            success: false,
            message: "user cannot be registered, please try again"
        })
    }
}


//Login

exports.login = async (req, res) => {
    try {
        //fetch data from req body
        const { email, password } = req.body

        //validate data
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        //chcek if user exist or not
        const user = await User.findOne({ email }).populate("additionalDetails")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user is not registered, please sign in to continue"
            })
        }

        //match password and create jwt token
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                }
            )
            // user = user.toObject
            user.token = token
            user.password = undefined

            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "user logged in successfully"
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "password incorrect"
            })
        }


    }
    catch (error) {
        console.log("error in login controller: ", error)
        res.status(500).json({
            success: false,
            message: "user cannot be logged in, please try again"
        })
    }
}


//change password

exports.changePassword = async (req, res) => {
    try {
        // Get old password, new password, and confirm new password from req.body
        const { oldPassword, newPassword } = req.body

        // Get user data from req.user
        const id = req.user.id
        const userDetails = await User.findById(id)

        //validate
        if (!oldPassword || !newPassword) {
            return res.status(401).josn({
                success: false,
                message: "All fields are required"
            })
        }

        //match password
        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password)
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "password does not match"
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        //update password in db
        const updatedUserDetails = await User.findByIdAndUpdate(
            userDetails.id,
            { password: hashedPassword },
            { new: true }
        )

        //send notification email
        try {
            const mailResponse = mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated", "Your password has changed",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            )
            console.log("Email sent successfully:", mailResponse.response)
        }
        catch (error) {
            console.error("Error occurred while sending email:", error)
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            })
        }

        return res.status(200).json({
            success: true,
            message: "password updated successfully"
        })
    }
    catch (error) {
        console.log("error in changePassword controller: ", error)
        res.status(500).json({
            success: false,
            message: "password cannot be reset, please try again"
        })
    }
}