const cashClient = require('../redisClient');

async function getAllCategoriesCache(req, res, next){
    if (cashClient.ready) {
        cashClient.get('categories', (error, cachedCategories) => {
            if (error) {
                console.error('Error retrieving cached categories:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (cachedCategories) {
                console.log('Categories data retrieved from cache');
                return res.json(JSON.parse(cachedCategories));
            }
            next();
        });
    } else {
        next();
    }

}

async function getCategoryByIdCache(req, res, next) {
    const categoryId = req.params.id;
    if (cashClient.ready) {
        cashClient.get(`category:${categoryId}`, (error, cachedCategory) => {
            if (error) {
                console.error('Error retrieving cached category:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    
            if (cachedCategory) {
                console.log('Category data retrieved from cache');
                return res.json(JSON.parse(cachedCategory));
            }
    
            next();
        });
    } else  {
        next();
    }
}

async function getCategoryByNameCache(req, res, next) {
    const categoryName = req.params.name;
    if (cashClient.ready) {
        cashClient.get(`category:${categoryName}`, (error, cachedCategory) => {
            if (error) {
                console.error('Error retrieving cached category:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    
            if (cachedCategory) {
                console.log('Category data retrieved from cache');
                return res.json(JSON.parse(cachedCategory));
            }
    
            next();
        });
    } else  {
        next();
    }
}

module.exports = {
    getAllCategoriesCache,
    getCategoryByIdCache,
    getCategoryByNameCache
};