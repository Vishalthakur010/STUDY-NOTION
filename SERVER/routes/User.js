const express = require('express')
const router = express.Router()

//import middlewares
const {
    auth,
    isStudent,
    isInstructor,
    isAdmin
} = require('../middlewares/auth')

//import Auth controller
const{
    signUp,
    login,
    sendOTP,
    changePassword
}=require('../controllers/Auth')

//import ResetPassword controller
const{
    resetPasswordToken,
    resetPassword
}=require('../controllers/ResetPassword')

router.post('/signup',signUp) //checked
router.post('/login',login) //checked
router.post('/sendOTP',sendOTP) //checked
router.post('/changePassword',auth,changePassword)

router.post('/reset-Password-Token',resetPasswordToken) //checked
router.post('/reset-Password',resetPassword) //checked

module.exports=router