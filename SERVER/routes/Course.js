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
    getCourseDetail,
    editCourse,
    getFullCourseDetails,
    getInstructorCourses,
    deleteCourse        
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

const {
    updateCourseProgress
} = require('../controllers/courseProgress')



//courses can only be created by instructor
router.post("/createCourse",auth, isInstructor, createCourse) //checked
router.get("/showAllCourses",showAllCourses) //checked done
router.post("/getCourseDetail",getCourseDetail) //checked
router.post("/editCourse",auth, isInstructor, editCourse)  //updated
router.post("/getFullCourseDetails",auth, getFullCourseDetails)  //updated
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses) //updated
router.delete("/deleteCourse", deleteCourse) //updated

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

//course Progress can be seen by students
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress) //update

//Rating and review can only be created by students
router.post("/createRating",auth,isStudent,createRating)
router.post("/getAverageRating",getAverageRating)
router.get("/getAllRating",getAllRating)

module.exports=router