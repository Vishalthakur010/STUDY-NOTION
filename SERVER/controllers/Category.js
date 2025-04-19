const Category = require('../models/category')
const mongoose = require("mongoose");


//handler function for create category
exports.createCategory = async (req, res) => {
  try {
    //fetch data from req.body
    const { name, description } = req.body

    //validate
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    //create entry in DB
    const categoryDetails = await Category.create(
      {
        name: name,
        description: description
      }
    )
    console.log(categoryDetails)

    return res.status(200).json({
      success: true,
      message: "Category created successfully"
    })
  }
  catch (error) {
    console.log("error in Category controller: ", error)
    res.status(500).json({
      success: false,
      message: "something went wrong while creating category"
    })
  }
}


//handler function for Get All category
exports.showAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find({}, { _id:true, name: true, description: true })

    return res.status(200).json({
      success: true,
      allCategory,
      message: "All Category returned successfully"
    })
  }
  catch (error) {
    console.log("error in Category controller: ", error)
    res.status(500).json({
      success: false,
      message: "something went wrong while fetching all category"
    })
  }
}

//categoryPageDetails 
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body
    // console.log("PRINTING CATEGORY ID: ", categoryId);

    // validating categoryId
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing categoryId",
      });
    }
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        // populate: "ratingAndReview",
      })
      .exec()

    //console.log("SELECTED COURSE", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    if (selectedCategory.course.length === 0) {
      console.log("No courses found for categoryId:", categoryId);
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    // Helper function to generate a random integer
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
    };

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "course",
        match: { status: "Published" },
      })
      .exec()
    //console.log("Different COURSE", differentCategory)
    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.course)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)
    // console.log("mostSellingCourses COURSE", mostSellingCourses)
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    console.log("error in categoryPageDetails controller: ", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
