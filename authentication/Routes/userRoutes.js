const { body } = require('express-validator');
let { UserController } = require("../Controllers/userController.js");
let user_controller = new UserController();
const { getAllUsersCache, getUserByIdCache, getUserProfileCache } = require('../Middlewares/userCacheMiddleware');

function userRoute(app) {
    app.get("/profile", getUserProfileCache, user_controller.getProfile);
    app.get("/users", getAllUsersCache, user_controller.getAllUsers);
    app.get("/users/:id", getUserByIdCache, user_controller.getUserById);

    app.post("/adduser", [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('phone').matches(/^\d{10,}$/).withMessage('Phone number must be a 10-digit number or more'),
        body('isAdmin').isBoolean().withMessage('isAdmin must be a boolean value'),
        body('isActive').isBoolean().withMessage('isActive must be a boolean value'),
        body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid number between -90 and 90'),
        body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid number between -180 and 180'),
    ], user_controller.addUser);

    app.put("/users/:id", [
        body('phone').matches(/^\d{10,}$/).withMessage('Phone number must be a 10-digit number or more'),
        body('isAdmin').isBoolean().withMessage('isAdmin must be a boolean value'),
        body('isActive').isBoolean().withMessage('isActive must be a boolean value'),
        body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid number between -90 and 90'),
        body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid number between -180 and 180'),
    ], user_controller.updateUserById);

    app.put("/profile/image/users/:id", [
        body('profileImg').isURL({ protocols: ['http', 'https'], require_protocol: true }).withMessage('Invalid image URL'),
    ], user_controller.addProfileImage);

    app.put("/status/users/:id", user_controller.changeUserStatusById);
}
module.exports = {
    userRoute
}