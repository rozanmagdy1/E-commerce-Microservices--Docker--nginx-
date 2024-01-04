const { body } = require('express-validator');
let { SubCategoryController } = require("../Controllers/subCategoryController");
let subcategory_controller = new SubCategoryController();
const {getAllSubCategoriesCache, getSubCategoryByIdCache, getSubCategoryByNameCache, getSubCategoryByCategoryIdCache,
    getSubCategoryByCategoryNameCache} = require('../Middlewares/subcategoryCacheMiddleware');

function subCategoryRoute(app) {
    app.get('/subcategories', getAllSubCategoriesCache, subcategory_controller.getSubCategories);
    app.get('/subcategories/id/:id', getSubCategoryByIdCache, subcategory_controller.getSubCategoryById);
    app.get('/subcategories/categories/id/:id', getSubCategoryByCategoryIdCache, subcategory_controller.getSubCategoriesByCategoryID);
    app.get('/subcategories/categories/name/:name', getSubCategoryByCategoryNameCache, subcategory_controller.getSubCategoriesByCategoryName);
    app.get('/subcategories/name/:name', getSubCategoryByNameCache, subcategory_controller.getSubCategoryByName);

    app.post('/subcategories', [
        body('name').notEmpty().withMessage('Name is required.'),
        body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer.'),
        body('categoryID').notEmpty().withMessage('Category ID is required.'),
        body('mainImg').optional(),
        body('isActive').isBoolean().withMessage('isActive must be a boolean value'),
    ], subcategory_controller.addSubCategory);

    app.put('/subcategories/:id', [
        body('name').notEmpty().withMessage('Name is required.'),
        body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer.'),
        body('categoryID').notEmpty().withMessage('Category ID is required.'),
        body('mainImg').optional(),
        body('isActive').isBoolean().withMessage('isActive must be a boolean value'),
    ], subcategory_controller.updateSubCategory);

    app.put('/status/subcategories/:id', subcategory_controller.changeSubCategoryStatus);

    app.put("/subcategory/image/:id", [
        body('mainImg').isURL({ protocols: ['http', 'https'], require_protocol: true }).withMessage('Invalid image URL'),
    ], subcategory_controller.addSubCategoryImage);
}
module.exports = {
    subCategoryRoute
}