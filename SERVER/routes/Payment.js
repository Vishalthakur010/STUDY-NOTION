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
    verifySignature
}=require('../controllers/Payment')

router.post("/capturePayment",auth,isStudent, capturePayment)
router.post("/verifySignature",auth,isStudent, verifySignature)

module.exports=router