let { OrderController } = require("../Controllers/orderController");
let order_controller = new OrderController();
const { getAllOrdersCache, getOrderByIdCache } = require('../Middlewares/orderCacheMiddleware');

function orderRoute(app) {
    app.get("/orders", getAllOrdersCache, order_controller.getAllOrders);
    app.get("/orders/:id", getOrderByIdCache, order_controller.getOrderById);
    app.put("/status/orders/:id", order_controller.changeOrderStatusById);
}

module.exports = {
    orderRoute
}