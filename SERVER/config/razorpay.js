const Razorpay = require('razorpay')
require('dotenv').config()

if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
    throw new Error("Razorpay key_id and key_secret are required");
}

exports.instance= new Razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
})