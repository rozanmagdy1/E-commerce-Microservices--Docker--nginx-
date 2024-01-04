let { OrderService } = require("../Services/orderService");
let service = new OrderService();
class OrderController{
    async getAllOrders(req,res){
        let orders = await service.getAllOrders();
        if (orders === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ orders });
        }
    }

    async getOrderById(req,res){
        let id = req.params.id;
        let order = await service.getOrderById(id);
        if (order === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (order === 'not found') {
            res.status(404).json({ message: "Order not found!" });
        } else {
            res.status(200).json({ order });
        }
    }

    async changeOrderStatusById(req,res){
        let id = req.params.id;
        let result = await service.changeOrderStatusById(id);
        if (result === 'error') {
            res.status(500).json({ error: 'Internal server error' });
        } else if (result === 'not found') {
            res.status(404).json({ message: "Order not found!" });
        } else {
            res.status(200).json({ message: 'Order status changed successfully' });
        }
    }

}
module.exports = {
    OrderController
}