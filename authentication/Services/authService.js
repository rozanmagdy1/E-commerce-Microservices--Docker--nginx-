const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { sendEmail } = require('./sendEmailService');
const crypto = require("crypto");
class AuthService {

    async login(email, password) {
        try {
            const user = await User.findOne({ "email": email });
            if (!user) {
                return 'not found';
            } else {
                if (!await bcrypt.compare(password, user.password)) {
                    return "password wrong";
                } else {
                    let loginToken = jwt.sign({ email: user.email, id: user._id, isAdmin: user.isAdmin }
                        , 'logintokenxxxxqqqoo');
                    return {
                        message: "login successfully",
                        token: loginToken,
                    };
                }
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async signUp(data) {
        try {
            const user = await User.findOne({ "email": data.email });
            if (!user) {
                data.password = await bcrypt.hash(data.password, 10);
                data.verified = false;
                const new_user = new User(data);
                return await new_user.save();
            } else {
                return "username already exist"
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async forgotPassword(req, email) {
        let resetLink
        const user = await User.findOne({ email: email });
        if (!user) {
            return "not found";
        } else {
            const code = crypto.randomBytes(1).toString('hex');
            let token = jwt.sign({ code }, 'resettokenaakksiiww', { expiresIn: '60m' });

            if (user.isAdmin === true) {
                resetLink = `http://${req.headers.host}/admin/resetPassword`;
            } else {
                resetLink = `http://${req.headers.host}/website/resetPassword`;
            }

            const template = `
            <h1 style="text-align: center;">Nest (MART & GROCARY)</h1><p>Please click the following link to reset your password:</p>
            <a href=${resetLink}>${resetLink}</a>
            <p style="opacity: 0.9;">Best regards,</p>
            <p style="opacity: 0.9;">Your Website Team</p>
            `

            try {
                await sendEmail(email, template, 'Reset your password');
                return {
                    message: 'Email sent',
                    token: token,
                    resetLink: resetLink
                };
            } catch (error) {
                console.error(error);
                return 'Error sending email';
            }
        }
    }

    async resetPassword(resetToken, email, newPassword) {
        try {
            const user = await User.findOne({ "email": email });
            if (!user) {
                return "not found";
            } else {
                try {
                    let decoded = jwt.verify(resetToken, "resettokenaakksiiww");
                    newPassword = await bcrypt.hash(newPassword, 10);
                    return User.updateOne({ "email": email }, { password: newPassword });
                } catch (e) {
                    return 'error'
                }
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async changePassword(email, oldPassword, newPassword) {
        try {
            const user = await User.findOne({ "email": email });
            if (!user) {
                return "not found";
            } else {
                if (await bcrypt.compare(oldPassword, user.password)) {
                    newPassword = await bcrypt.hash(newPassword, 10);
                    return User.updateOne({ "email": email }, { password: newPassword });
                } else {
                    return "old password wrong";
                }
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async accountVerificationStepOne(email) {
        const code = crypto.randomBytes(3).toString('hex').toUpperCase();
        const token = jwt.sign({ email, code }, 'veifytokenqqiwnxn', { expiresIn: '2m' });
        const template = `<div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333;">
        <h2 style="text-align: center; letter-spacing: 5px;">Nest (MART & GROCARY)</h2>
        <p style="letter-spacing: 3px;"> Your Verification Code is:  <strong>${code}</strong></p> <p><strong>Alert: This code will expire in 2min.</strong></p>
        <p style="opacity: 0.9;">Best regards,</p>
        <p style="opacity: 0.9;">Your Website Team</p>
        </div>`
        try {
            const user = await User.findOne({ "email": email });
            if (!user) {
                return "not found";
            } else {
                if (user.verified === true) {
                    return 'user already verified';
                } else {
                    await sendEmail(email, template, 'Account Verification');
                    return {
                        "Message": "Email sent",
                        "VerificationToken": token,
                    }
                }
            }

        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async accountVerificationStepTwo(token,userCode) {
        try{
            let decoded = jwt.verify(token, 'veifytokenqqiwnxn');
            let {email, code} = decoded;
            if(userCode === code){
                await User.updateOne({ "email": email }, { verified : true });
                return 'user verified';
            }else{
                return 'invalid code';
            }
        }catch (e){
            console.log(e);
            return 'error';
        }
    }

}
module.exports = {
    AuthService
}