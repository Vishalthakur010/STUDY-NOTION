//app create
const express = require('express')
const app = express()

//find port
require("dotenv").config()
const PORT = process.env.PORT || 4000

//middleware
app.use(express.json())//for parsing json

const fileUpload = require('express-fileupload')//for parsing files
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

const cookieParser = require('cookie-parser') // for cookies
app.use(cookieParser())

//db connect
require('./config/database').dbconnect()

//cloudinary connect
require('./config/cloudinary').cloudinaryConnect()

// If your front-end and back-end are hosted on different domains or ports, you need to use CORS to enable the front-end to make requests to the back-end.
const cors=require('cors')
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)


//import routes
const userRoutes=require('./routes/User')
const profileRoutes=require('./routes/Profile')
const courseRoutes=require('./routes/Course')
const paymentRoutes=require('./routes/Payment')
const contactUsRoutes=require('./routes/Contact')

//mount routes
app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/profile',profileRoutes)
app.use('/api/v1/course',courseRoutes)
app.use('/api/v1/payment',paymentRoutes)
app.use('/api/v1/reach',contactUsRoutes)



//default route
app.get('/', (req, res) => {
    res.send(`<h1> This is the Home page </h1>`)
    return res.json({
        success: true,
        message: "your server is running at default route"
    })
})


//server activation
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})