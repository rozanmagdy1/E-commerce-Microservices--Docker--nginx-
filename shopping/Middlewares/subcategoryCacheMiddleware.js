const cashClient = require('../redisClient');

async function getAllSubCategoriesCache(req, res, next) {
    if (cashClient.ready) {
        cashClient.get('subcategories', (error, cachedSubCategories) => {
            if (error) {
                console.error('Error retrieving cached subcategories:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (cachedSubCategories) {
                console.log('Subcategories data retrieved from cache');
                return res.json(JSON.parse(cachedSubCategories));
            }
            next();
        });
    } else {
        next();
    }

}

async function getSubCategoryByIdCache(req, res, next) {
    const subCategoryId = req.params.id;
    if (cashClient.ready) {
        cashClient.get(`subcategory:${subCategoryId}`, (error, cachedSubCategory) => {
            if (error) {
                console.error('Error retrieving cached subcategory:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (cachedSubCategory) {
                console.log('Subcategory data retrieved from cache');
                return res.json(JSON.parse(cachedSubCategory));
            }

            next();
        });
    } else {
        next();
    }
}

async function getSubCategoryByNameCache(req, res, next) {
    const subCategoryName = req.params.name;
    if (cashClient.ready) {
        cashClient.get(`subcategory:${subCategoryName}`, (error, cachedSubCategory) => {
            if (error) {
                console.error('Error retrieving cached subcategory:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (cachedSubCategory) {
                console.log('Subcategory data retrieved from cache');
                return res.json(JSON.parse(cachedSubCategory));
            }

            next();
        });
    } else {
        next();
    }
}

async function getSubCategoryByCategoryIdCache(req, res, next) {
    const CategoryId = req.params.id;
    if (cashClient.ready) {
        cashClient.get(`subcategory_category:${CategoryId}`, (error, cachedSubCategories) => {
            if (error) {
                console.error('Error retrieving cached subcategories:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (cachedSubCategories) {
                console.log('Subcategories data retrieved from cache');
                return res.json(JSON.parse(cachedSubCategories));
            }

            next();
        });
    } else {
        next();
    }
}

async function getSubCategoryByCategoryNameCache(req, res, next) {
    const CategoryName = req.params.name;
    if (cashClient.ready) {
        cashClient.get(`subcategory_category:${CategoryName}`, (error, cachedSubCategories) => {
            if (error) {
                console.error('Error retrieving cached subcategories:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (cachedSubCategories) {
                console.log('Subcategories data retrieved from cache');
                return res.json(JSON.parse(cachedSubCategories));
            }

            next();
        });
    } else {
        next();
    }
}

module.exports = {
    getAllSubCategoriesCache,
    getSubCategoryByIdCache,
    getSubCategoryByNameCache,
    getSubCategoryByCategoryIdCache,
    getSubCategoryByCategoryNameCache
};