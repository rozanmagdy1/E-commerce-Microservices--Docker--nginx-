const { body } = require('express-validator');
let { VendorController } = require("../Controllers/vendorController");
let vendor_controller = new VendorController();
const { getAllVendorsCache, getVendorByIdCache, getVendorByNameCache } =
    require('../Middlewares/vendorCacheMiddleware');

function vendorRoute(app) {
    app.get("/vendors", getAllVendorsCache, vendor_controller.getAllVendors);
    app.get("/vendors/id/:id", getVendorByIdCache, vendor_controller.getVendorById);
    app.get("/vendors/name/:name", getVendorByNameCache, vendor_controller.getVendorByName);

    app.post("/vendors", [
        body('name').notEmpty().withMessage('Name is required.'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('phone').matches(/^(\d{10,}|\d{3}-\d{3}-\d{4})$/).withMessage('Invalid phone number or home number'),
        body('isActive').isBoolean().withMessage('isActive must be a boolean value'),
        body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid number between -90 and 90'),
        body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid number between -180 and 180'),
        body('description').notEmpty().withMessage('Description is required.'),
        body('GST').optional().isNumeric().withMessage('GST should be a numeric value.'),
    ], vendor_controller.addVendor);

    app.put("/vendors/:id", [
        body('name').notEmpty().withMessage('Name is required.'),
        body('phone').matches(/^(\d{10,}|\d{3}-\d{3}-\d{4})$/).withMessage('Invalid phone number or home number'),
        body('isActive').isBoolean().withMessage('isActive must be a boolean value'),
        body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid number between -90 and 90'),
        body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid number between -180 and 180'),
        body('description').notEmpty().withMessage('Description is required.'),
        body('GST').optional().isNumeric().withMessage('GST should be a numeric value.'),
    ], vendor_controller.updateVendorById);

    app.put("/vendor/image/:id", [
        body('mainImg').isURL({ protocols: ['http', 'https'], require_protocol: true }).withMessage('Invalid image URL'),
    ], vendor_controller.addVendorImage);

    app.put("/vendor/featuredimages/:id", vendor_controller.addVendorImage);

    app.put("/status/vendors/:id", vendor_controller.changeVendorStatusById);
    app.put("/vendors/socialmediacontacts/:id", vendor_controller.updateVendorById);
}
module.exports = {
    vendorRoute
}