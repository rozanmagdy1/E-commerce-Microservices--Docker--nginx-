const cashClient = require('../redisClient');

async function getAllProductsCache(req, res, next) {
    if (cashClient.ready) {
        cashClient.get('products', (error, cachedProducts) => {
            if (error) {
                console.error('Error retrieving cached products:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (cachedProducts) {
                console.log('Products data retrieved from cache');
                return res.json(JSON.parse(cachedProducts));
            }
            next();
        });
    } else {
        next();
    }

}

async function getProductByIdCache(req, res, next) {
    const productId = req.params.id;
    if (cashClient.ready) {
        cashClient.get(`product:${productId}`, (error, cachedProduct) => {
            if (error) {
                console.error('Error retrieving cached product:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (cachedProduct) {
                console.log('Product data retrieved from cache');
                return res.json(JSON.parse(cachedProduct));
            }

            next();
        });
    } else {
        next();
    }
}

async function getProductByCategoryIdCache(req, res, next) {
    const categoryId = req.params.categoryID;
    if (cashClient.ready) {
        cashClient.get(`products_category:${categoryId}`, (error, cachedProducts) => {
            if (error) {
                console.error('Error retrieving cached products:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (cachedProducts) {
                console.log('Products data retrieved from cache');
                return res.json(JSON.parse(cachedProducts));
            }

            next();
        });
    } else {
        next();
    }
}
async function getProductBySubCategoryIdCache(req, res, next) {
    const subcategoryId = req.params.subcategoryID;
    if (cashClient.ready) {
        cashClient.get(`products_subcategory:${subcategoryId}`, (error, cachedProducts) => {
            if (error) {
                console.error('Error retrieving cached products:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (cachedProducts) {
                console.log('Products data retrieved from cache');
                return res.json(JSON.parse(cachedProducts));
            }

            next();
        });
    } else {
        next();
    }
}
async function getProductByVendorIdCache(req, res, next) {
    const vendorId = req.params.vendorID;
    if (cashClient.ready) {
        cashClient.get(`products_vendor:${vendorId}`, (error, cachedProducts) => {
            if (error) {
                console.error('Error retrieving cached products:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (cachedProducts) {
                console.log('Products data retrieved from cache');
                return res.json(JSON.parse(cachedProducts));
            }

            next();
        });
    } else {
        next();
    }
}
async function getProductBySkuCache(req, res, next) {
    const sku = req.params.sku;
    if (cashClient.ready) {
        cashClient.get(`product_sku:${sku}`, (error, cachedProduct) => {
            if (error) {
                console.error('Error retrieving cached product:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (cachedProduct) {
                console.log('Product data retrieved from cache');
                return res.json(JSON.parse(cachedProduct));
            }

            next();
        });
    } else {
        next();
    }
}

module.exports = {
    getAllProductsCache,
    getProductByIdCache,
    getProductByCategoryIdCache,
    getProductBySubCategoryIdCache,
    getProductByVendorIdCache,
    getProductBySkuCache
};