const { body } = require('express-validator');
let { ProductController } = require("../Controllers/productController");
let product_controller = new ProductController();
const {getAllProductsCache, getProductByIdCache, getProductByCategoryIdCache, getProductBySubCategoryIdCache, 
    getProductByVendorIdCache, getProductBySkuCache} = require('../Middlewares/productCacheMiddleware');

function productRoute(app) {
    app.get('/products', getAllProductsCache, product_controller.getAllProducts);
    app.get('/products/id/:id',getProductByIdCache, product_controller.getProductById);
    
    app.get('/products/category/:categoryID', getProductByCategoryIdCache, product_controller.getProductsByCategoryID);
    app.get('/products/subcategory/:subcategoryID', getProductBySubCategoryIdCache, product_controller.getProductsBySubCategoryID);
    app.get('/products/vendor/:vendorID', getProductByVendorIdCache, product_controller.getProductsByVendorID);
    app.get('/products/sku/:sku', getProductBySkuCache, product_controller.getProductBySKU);

    app.get('/filters/products', product_controller.getProductsByFilter);
    app.get('/pagination/filters/products', product_controller.getProductsByFilterAndStatusAndPagination);

    app.post("/addproduct", [
        body('name').notEmpty().withMessage('Name is required.'),
        body('price').isNumeric().withMessage('Price should be a numeric value.'),
        body('description').notEmpty().withMessage('Description is required.'),
        body('SKU').notEmpty().withMessage('SKU is required.'),
        body('MFD').isISO8601().toDate().withMessage('Invalid MFD date format.'),
        body('EXD').isISO8601().toDate().withMessage('Invalid EXD date format.'),
        body('size').isArray().withMessage('Size should be an array.'),
        body('categoryID').notEmpty().withMessage('Category ID is required.'),
        body('subcategoryID').notEmpty().withMessage('Subcategory ID is required.'),
        body('vendorID').notEmpty().withMessage('Vendor ID is required.'),
        body('stock').isInt().withMessage('Stock should be an integer.'),
        body('isActive').isBoolean().withMessage('isActive should be a boolean value.'),
    ], product_controller.addProduct);

    app.put("/products/:id", [
        body('name').notEmpty().withMessage('Name is required.'),
        body('price').isNumeric().withMessage('Price should be a numeric value.'),
        body('description').notEmpty().withMessage('Description is required.'),
        body('SKU').notEmpty().withMessage('SKU is required.'),
        body('MFD').isISO8601().toDate().withMessage('Invalid MFD date format.'),
        body('EXD').isISO8601().toDate().withMessage('Invalid EXD date format.'),
        body('size').isArray().withMessage('Size should be an array.'),
        body('categoryID').notEmpty().withMessage('Category ID is required.'),
        body('subcategoryID').notEmpty().withMessage('Subcategory ID is required.'),
        body('vendorID').notEmpty().withMessage('Vendor ID is required.'),
        body('stock').isInt().withMessage('Stock should be an integer.'),
        body('isActive').isBoolean().withMessage('isActive should be a boolean value.'),
    ], product_controller.updateProduct);

    app.put('/status/products/:id', product_controller.changeProductStatus);

    app.put("/product/image/:id", [
        body('mainImg').isURL({ protocols: ['http', 'https'], require_protocol: true }).withMessage('Invalid image URL'),
    ], product_controller.addProductImage);

    app.put("/product/featuredimages/:id", product_controller.addProductImage);

}
module.exports = {
    productRoute
}