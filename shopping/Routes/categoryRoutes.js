const { body } = require('express-validator');
let { CategoryController } = require("../Controllers/categoryController");
let category_controller = new CategoryController();
const { getAllCategoriesCache, getCategoryByIdCache, getCategoryByNameCache } =
    require('../Middlewares/categoryCacheMiddleware');

function categoryRoute(app) {
    app.get('/categories', getAllCategoriesCache, category_controller.getCategories);
    app.get('/categories/id/:id', getCategoryByIdCache, category_controller.getCategoryById);
    app.get('/categories/name/:name', getCategoryByNameCache, category_controller.getCategoryByName);

    app.post('/categories', [
        body('name').notEmpty().withMessage('Name is required'),
        body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer.'),
        body('mainImg').optional(),
        body('isActive').isBoolean().withMessage('isActive must be a boolean value'),
    ], category_controller.addCategory);

    app.put('/categories/:id', [
        body('name').notEmpty().withMessage('Name is required'),
        body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer.'),
        body('mainImg').optional(),
        body('isActive').isBoolean().withMessage('isActive must be a boolean value'),
    ], category_controller.updateCategory);

    app.put('/status/categories/:id', category_controller.changeCategoryStatus);

    app.put("/category/image/:id", [
        body('mainImg').isURL({ protocols: ['http', 'https'], require_protocol: true }).withMessage('Invalid image URL'),
    ], category_controller.addCategoryImage);
}
module.exports = {
    categoryRoute
}