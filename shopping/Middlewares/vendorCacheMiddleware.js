const cashClient = require('../redisClient');

async function getAllVendorsCache(req, res, next){
    if (cashClient.ready) {
        cashClient.get('vendors', (error, cachedVendors) => {
            if (error) {
                console.error('Error retrieving cached vendors:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (cachedVendors) {
                console.log('Vendors data retrieved from cache');
                return res.json(JSON.parse(cachedVendors));
            }
            next();
        });
    } else {
        next();
    }

}

async function getVendorByIdCache(req, res, next) {
    const vendorId = req.params.id;
    if (cashClient.ready) {
        cashClient.get(`vendor:${vendorId}`, (error, cachedVendor) => {
            if (error) {
                console.error('Error retrieving cached vendor:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    
            if (cachedVendor) {
                console.log('Vendor data retrieved from cache');
                return res.json(JSON.parse(cachedVendor));
            }
    
            next();
        });
    } else  {
        next();
    }
}

async function getVendorByNameCache(req, res, next) {
    const vendorName = req.params.name;
    if (cashClient.ready) {
        cashClient.get(`vendor:${vendorName}`, (error, cachedVendor) => {
            if (error) {
                console.error('Error retrieving cached vendor:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    
            if (cachedVendor) {
                console.log('Vendor data retrieved from cache');
                return res.json(JSON.parse(cachedVendor));
            }
    
            next();
        });
    } else  {
        next();
    }
}

module.exports = {
    getAllVendorsCache,
    getVendorByIdCache,
    getVendorByNameCache
};