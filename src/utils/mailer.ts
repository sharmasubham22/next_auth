import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}:any)=>{
    try {
      const hashToken = await bcryptjs.hash(userId.toString(), 10);
      
      if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId, {
          verifyToken: hashToken,
          verifyTokenExpiry: Date.now() + 3600000,
        });
      } else if (emailType === "RESET") {
        await User.findByIdAndUpdate(userId, {
          forgotPasswordToken: hashToken,
          forgotPasswordExpiry: Date.now() + 3600000,
        });
      }

      // Looking to send emails in production? Check out our Email API/SMTP product!
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "0d72292ac17be0",
          pass: "e7c028dd8b4812",
        },
      });

      const mailOptions = {
        from: "dravya747@gmail.com", // sender address
        to: email, // list of receivers
        subject:
          emailType === "VERIFY"
            ? "Verify your email address"
            : "Reset your password", // Subject line
        html: `<p>Click <a href='${
          process.env.DOMAIN
        }/verifyemail?token=${hashToken}'>here</a> to ${
          emailType === "VERIFY"
            ? "Verify your email address"
            : "Reset your password"
        } or Copy & Paste the link below in your browser. <br> ${
          process.env.DOMAIN
        }/verifyemail?token=${hashToken}</p>`, // html body
      };

      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse;
    } catch (error:any) {
        throw new Error(error.message)
    }
}