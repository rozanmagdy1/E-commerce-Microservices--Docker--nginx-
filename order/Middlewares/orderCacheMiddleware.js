const cashClient = require('../redisClient');

async function getAllOrdersCache(req, res, next){
    if (cashClient.ready) {
        cashClient.get('orders', (error, cachedOrders) => {
            if (error) {
                console.error('Error retrieving cached orders:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (cachedOrders) {
                console.log('Orders data retrieved from cache');
                return res.json(JSON.parse(cachedOrders));
            }
            next();
        });
    } else {
        next();
    }

}

async function getOrderByIdCache(req, res, next) {
    const orderId = req.params.id;
    if (cashClient.ready) {
        cashClient.get(`order:${orderId}`, (error, cachedOrder) => {
            if (error) {
                console.error('Error retrieving cached order:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    
            if (cachedOrder) {
                console.log('Order data retrieved from cache');
                return res.json(JSON.parse(cachedOrder));
            }
    
            next();
        });
    } else  {
        next();
    }
}


module.exports = {
    getAllOrdersCache,
    getOrderByIdCache,
};