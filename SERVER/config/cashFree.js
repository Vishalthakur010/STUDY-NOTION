const cashfree = require('cashfree-sdk');
// const cashfree = require('@cashfreepayments/cashfree-sdk');
require('dotenv').config();

// Initialize Cashfree Payment Gateway
try{
exports.cashfreeInstance = new cashfree.Init({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        environment: 'TEST', // Use 'PROD' for production
    });
    console.log("cashfree is working")
    }
    catch (error) {
        console.error('Error initializing Cashfree Payment Gateway:', error);
    }