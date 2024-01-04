const { body } = require('express-validator');
let { AuthController } = require("../Controllers/authController");
let auth_controller = new AuthController();

function authRoute(app) {
    app.post("/login", [
        body('email').notEmpty().withMessage('email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ], auth_controller.login);

    app.post("/signup", [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('phone').matches(/^\d{10,}$/).withMessage('Phone number must be a 10-digit number or more'),
        body('isAdmin').isBoolean().withMessage('isAdmin must be a boolean value'),
        body('isActive').isBoolean().withMessage('isActive must be a boolean value'),
        body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid number between -90 and 90'),
        body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid number between -180 and 180'),
    ], auth_controller.signUp);

    app.post('/forgotPassword', [body('email').isEmail().withMessage('Invalid email address')] ,auth_controller.forgotPassword);
    
    app.post('/resetPassword', [
        body('email').isEmail().withMessage('Invalid email address'),
        body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ] ,auth_controller.resetPassword);

    app.post('/changePassword', [ 
        body('email').isEmail().withMessage('Invalid email address'),
        body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ] ,auth_controller.changePassword);

    app.post('/verification/step1', [body('email').isEmail().withMessage('Invalid email address')],auth_controller.accountVerificationStepOne);

    app.put('/verification/step2/:token',auth_controller.accountVerificationStepTwo);
}
module.exports = {
    authRoute
}