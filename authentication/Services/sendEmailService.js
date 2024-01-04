const nodemailer = require('nodemailer');
const Transport = require("nodemailer-sendinblue-transport");

const sendEmail = async (email, template, subject) => {
    const key = process.env.EMAIL_SECRET_KEY;
    const transporter = nodemailer.createTransport(
        new Transport({ apiKey: key })
    );
    const mailOptions = {
        from: 'gromart.business01@gmail.com',
        to: email,
        subject: subject,
        html: template
    };
    return await transporter.sendMail(mailOptions);
}
module.exports = {
    sendEmail
}