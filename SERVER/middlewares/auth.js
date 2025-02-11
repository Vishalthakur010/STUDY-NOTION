const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')
const { configDotenv } = require('dotenv')
configDotenv()


//Auth
exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization").replace("Bearer ", "")

        //if token missing, then return response
        if (!token) {
            return res.status(401).json({
                success: flase,
                message: "token is missing"
            })
        }

        //verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode)
            req.user = decode
        } catch (error) {
            // verification issue
            return res.status(401).json({
                success: flase,
                message: "invalid token"
            })
        }

        next()
    }
    catch (error) {
        console.log("error in auth middleware: ", error)
        res.status(500).json({
            success: false,
            message: "something went wrong while validating the token"
        })
    }
}

//isStudent
exports.isStudent = async (req,res, next)=>{
    try{
        if(req.user.accountType != "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a proteted routes for Students only"
            })
        }
        next()
    }
    catch (error) {
        console.log("error in isStudent middleware: ", error)
        res.status(500).json({
            success: false,
            message: "user role cannot be verify as Student"
        })
    }
}

//isInstructor
exports.isInstructor = async (req,res, next)=>{
    try{
        if(req.user.accountType != "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a proteted routes for Instructor only"
            })
        }
        next()
    }
    catch (error) {
        console.log("error in isInstructor middleware: ", error)
        res.status(500).json({
            success: false,
            message: "user role cannot be verify as Instructor"
        })
    }
}

//isAdmin
exports.isAdmin = async (req,res, next)=>{
    try{
        if(req.user.accountType != "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a proteted routes for Admin only"
            })
        }
        next()
    }
    catch (error) {
        console.log("error in isAdmin middleware: ", error)
        res.status(500).json({
            success: false,
            message: "user role cannot be verify as Admin"
        })
    }
}