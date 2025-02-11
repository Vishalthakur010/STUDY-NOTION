const express = require('express')
const router = express.Router()

//import middlewares
const {
    auth,
    isStudent,
    isInstructor,
    isAdmin
} = require('../middlewares/auth')

//import course controller
const {
    createCourse,
    showAllCourses,
    getCourseDetail

} = require('../controllers/Course')

//import Category controller
const {
    createCategory,
    showAllCategory,
    categoryPageDetails
} = require('../controllers/Category')

//import Section controller
const {
    createSection,
    updateSection,
    deleteSection
} = require('../controllers/Section')

//import Subsection controller
const {
    createSubsection,
    updateSubsection,
    deleteSubsection
} = require('../controllers/Subsection')

//import rating controller
const {
    createRating,
    getAverageRating,
    getAllRating
} = require('../controllers/RatingAndReview')



//courses can only be created by instructor
router.post("/createCourse",auth, isInstructor, createCourse) //checked
router.get("/showAllCourses",showAllCourses) //checked
router.post("/getCourseDetail",getCourseDetail) //checked

//section can only be created by instructor
router.post("/createSection",auth, isInstructor, createSection)  //checked
router.post("/updateSection",auth, isInstructor, updateSection) //checked
router.post("/deleteSection",auth, isInstructor, deleteSection) //checked

//subsection can only be created by instructor
router.post("/createSubsection",auth, isInstructor, createSubsection) // checked
router.post("/updateSubsection",auth, isInstructor, updateSubsection) //checked
router.post("/deleteSubsection",auth, isInstructor, deleteSubsection) //checked

//category can only be created by Admin
router.post("/createCategory",auth,isAdmin,createCategory) //checked
router.get("/showAllCategory",showAllCategory) //checked
router.post("/categoryPageDetails",categoryPageDetails) 

//Rating and review can only be created by students
router.post("/createRating",auth,isStudent,createRating)
router.post("/getAverageRating",getAverageRating)
router.get("/getAllRating",getAllRating)

module.exports=router