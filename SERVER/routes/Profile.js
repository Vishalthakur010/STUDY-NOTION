const express = require('express')
const router = express.Router()

//import middlewares
const {
    auth,
    isStudent,
    isInstructor,
    isAdmin
} = require('../middlewares/auth')


const{
    updateProfile,
    deleteAccount,
    getAllUserDetails,
    updateDisplayPicture
}=require('../controllers/Profile')

router.put('/updateProfile',auth, updateProfile) //checked
router.put('/updateDisplayPicture',auth, updateDisplayPicture) //checked
router.get('/getAllUserDetails',auth, getAllUserDetails) //checked
router.delete('/deleteAccount',auth, deleteAccount) //checked

module.exports=router