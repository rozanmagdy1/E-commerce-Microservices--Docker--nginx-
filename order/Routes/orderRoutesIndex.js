const {orderRoute} = require("./ordersRoutes");

function OrderRoutesIndex(app) {
    orderRoute(app);
}

module.exports = {
    OrderRoutesIndex
}