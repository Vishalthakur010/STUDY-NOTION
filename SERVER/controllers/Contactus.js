const {contactUsEmail}=require('../mail/templates/contactFormRes')
const mailSender=require('../utils/mailSender')

exports.contactUs=async(req,res)=>{
    const{email,firstname,lastname,message,phoneNo,countrycode}=req.body

    try{
        const emailRes= await mailSender(
            email,
        "Your data send successfully",
        contactUsEmail(email,firstname,lastname,message,phoneNo,countrycode)
        )

        console.log("Email Response : ", emailRes)
        return res.status(200).json({
            success:true,
            message:"Email send successfully"
        })
    }
    catch (error) {
        console.log("error in contactUs controller: ", error)
        res.status(500).json({
            success: false,
            message: "something went wrong while sending email"
        })
    }
}