const { validationResult } = require('express-validator');
let { UserService } = require("../Services/userService");
let service = new UserService();
class UserController {

    async getProfile(req, res) {
        let token = req.headers["authorization"];
        if (!token) {
            return res.status(401).json({ message: "unauthorized" });
        } else {
            let user = await service.getProfile(token);
            if (user === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(200).json({ user });
            }
        }
    }

    async getAllUsers(req, res) {
        let users = await service.getAllUsers();
        if (users === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ users });
        }
    }

    async getUserById(req, res) {
        let id = req.params.id;
        let user = await service.getUserById(id);
        if (user === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (user === 'not found') {
            res.status(404).json({ message: "User not found!" });
        } else {
            res.status(200).json({ user });
        }
    }

    async addUser(req, res) {
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.addUser(data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'username already exist') {
                res.status(403).json({ Message: "The username already exists use another one!" });
            } else {
                res.status(200).json({ message: "User added successfully" });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async updateUserById(req, res) {
        let id = req.params.id;
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.updateUserById(id, data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'not found') {
                res.status(404).json({ Message: "User not found!" });
            } else {
                res.status(200).json({ Message: "User updated successfully" });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }

    async changeUserStatusById(req, res) {
        let id = req.params.id;
        let result = await service.changeUserStatusById(id);
        if (result === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (result === 'not found') {
            res.status(404).json({ message: "User not found!" });
        } else {
            res.status(200).json({ message: 'User status changed successfully' });
        }
    }

    async addProfileImage(req, res) {
        let id = req.params.id;
        let data = req.body;
        const errors = validationResult(req);
        if (errors.array().length === 0) {
            let result = await service.addProfileImage(id, data);
            if (result === 'error') {
                res.status(500).json({ error: 'Internal server error' });
            } else if (result === 'not found') {
                res.status(404).json({ message: "User not found!" });
            } else {
                res.status(200).json({ message: 'Profile image added successfully' });
            }
        } else {
            res.status(422).json({ Message: "Validation faild", Reason: errors.array() });
        }
    }
}
module.exports = {
    UserController
}