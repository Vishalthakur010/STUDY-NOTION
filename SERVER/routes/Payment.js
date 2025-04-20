const express = require('express')
const router = express.Router()

//import middlewares
const {
    auth,
    isStudent,
    isInstructor,
    isAdmin
} = require('../middlewares/auth')

//import payment controller
const{
    capturePayment,
    verifyPayment,
    SendPaymentSuccessEmail
}=require('../controllers/Payments')

router.post("/capturePayment",auth,isStudent, capturePayment)
router.post("/verifySignature",auth,isStudent, verifyPayment)
router.post("/SendPaymentSuccessEmail",auth,isStudent, SendPaymentSuccessEmail)

module.exports=router