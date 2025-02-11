const mongoose = require('mongoose')
const { mailSender } = require('../utils/mailSender')
const {otpTemplate}=require('../mail/templates/emailVerificationTemplate')

const OTPSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})

// function for sending mail
async function sendVeryficationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification Email from StudyNotion", otpTemplate(otp))
        console.log("Email sent successfully", mailResponse)
    }
    catch(error){
        console.log("error occured while sending Email: ", error)
        throw error
    }
}

OTPSchema.pre("save", async function(next){
    await sendVeryficationEmail(this.email, this.otp)
    next()
})

module.exports = mongoose.model("OTP", OTPSchema)