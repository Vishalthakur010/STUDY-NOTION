const nodemailer = require('nodemailer')

exports.mailSender = async (email,title,body) => {
    try{
        //transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
        //send email
        let info= await transporter.sendMail({
            from:`StudyNotion`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        console.log(info)
        return info
    }
    catch(err){
        console.log("error sending email", err)
    }
}