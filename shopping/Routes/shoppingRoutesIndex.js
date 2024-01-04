const {categoryRoute} = require("./categoryRoutes");
const {subCategoryRoute} = require("./subcategoryRoutes");
const {vendorRoute} = require("./vendorRoutes");
const {productRoute} = require("./productRoutes");

function shoppingRoutesIndex(app) {
    categoryRoute(app);
    subCategoryRoute(app);
    vendorRoute(app);
    productRoute(app);
}

module.exports = {
    shoppingRoutesIndex
}