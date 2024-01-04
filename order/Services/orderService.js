const Order = require('../Models/ordersModel');
const cashClient = require('../redisClient');

class OrderService {
    async getAllOrders() {
        try {
            let orders = await Order.find({});
            cashClient.set('orders', JSON.stringify(orders), 'EX', 60, (error, result) => {
                if (error) {
                    console.error('Error setting cache with expiration:', error);
                } else {
                    console.log(`Cache set with expiration for key orders`);
                }
            });
            return orders;
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async getOrderById(id) {
        try {
            const order = await Order.findById(id);
            if (!order) {
                return 'not found';
            } else {
                cashClient.set(`order:${id}`, JSON.stringify(order), 'EX', 60, (error, result) => {
                    if (error) {
                        console.error('Error setting cache with expiration:', error);
                    } else {
                        console.log(`Cache set with expiration for key order`);
                    }
                });
                return order;
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

    async changeOrderStatusById(id){
        try {
            const order = await Order.findById(id);
            if (!order) {
                return 'not found';
            } else {
                if (!order.isActive || order.isActive === false) {
                    return await Order.updateOne({ _id: id }, { isActive: true });
                } else {
                    return await Order.updateOne({ _id: id }, { isActive: false });
                }
            }
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }

}
module.exports = {
    OrderService
}