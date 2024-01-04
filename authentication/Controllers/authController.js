const { validationResult } = require('express-validator');
let { AuthService } = require("../Services/authService");
let service = new AuthService();

class AuthController {
    async login(req, res) {
        let { email, password } = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.login(email, password);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error because token expired' });
            } else if (result === 'not found') {
                res.status(404).json({ Message: "User not found" });
            } else if (result === "password wrong") {
                res.status(401).json({ Message: "Password wrong" });
            } else {
                res.status(200).json({ result });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async signUp(req, res) {
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.signUp(data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'username already exist') {
                res.status(403).json({ Message: "The username already exists use another one!" });
            } else {
                res.status(200).json({ message: "User signup successfully" });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async forgotPassword(req, res) {
        let email = req.body.email;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.forgotPassword(req, email);
            if (result === "not found") {
                res.status(404).json({ Message: "User not found" });
            } else if (result === 'Error sending email') {
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(200).json({ result });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async resetPassword(req, res) {
        let resetToken = req.headers["authorization"];
        if (!resetToken) {
            res.status(401).json({ Message: "Reset token must provided" });
        } else {
            let { email, newPassword } = req.body;
            const errors = validationResult(req);
            if (errors.array().length === 0) {
                let result = await service.resetPassword(resetToken, email, newPassword);
                if (result === 'error') {
                    res.status(500).json({ Message: "Time out , the link is expired" });
                } else if (result === "not found") {
                    res.status(404).json({ Message: "User not found" });
                } else {
                    res.json({ Message: "The password retested successfully" });
                }
            } else {
                res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
            }
        }
    }

    async changePassword(req, res) {
        let { email, oldPassword, newPassword } = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.changePassword(email, oldPassword, newPassword);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === "old password wrong") {
                res.status(401).json({ Message: "Ole password wrong" });
            } else if (result === "not found") {
                res.status(404).json({ Message: "User not found" });
            } else {
                res.status(200).json({ Message: "The password changed successfully" })
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async accountVerificationStepOne(req, res) {
        let { email } = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.accountVerificationStepOne(email);
            if (result === 'error') {
                res.status(500).json({ Message: "Internal server error" });
            } else if (result === "not found") {
                res.status(404).json({ Message: "The user not found" });
            } else if (result === "user already verified") {
                res.status(200).json({ Message: "User already verified" });
            } else {
                res.status(200).json(result);
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async accountVerificationStepTwo(req, res) {
        let { code } = req.body;
        let token = req.params.token;
        let result = await service.accountVerificationStepTwo(token, code);
        if (result === 'error') {
            res.status(500).json({ Message: "Internal server error Beacuse Expiration" });
        } else if (result === 'user verified') {
            res.status(200).json({ Message: "User verified successfully" });
        } else {
            res.status(401).json({ Message: "Invalid code or fail in verification" });
        }
    }
}

module.exports = {
    AuthController
}