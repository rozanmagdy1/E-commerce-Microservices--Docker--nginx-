const cashClient = require('../redisClient');

async function getAllUsersCache(req, res, next){
    if (cashClient.ready) {
        cashClient.get('users', (error, cachedUsers) => {
            if (error) {
                console.error('Error retrieving cached users:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (cachedUsers) {
                console.log('Users data retrieved from cache');
                return res.json(JSON.parse(cachedUsers));
            }
            next();
        });
    } else {
        next();
    }

}

async function getUserByIdCache(req, res, next) {
    const userId = req.params.id;
    if (cashClient.ready) {
        cashClient.get(`user:${userId}`, (error, cachedUser) => {
            if (error) {
                console.error('Error retrieving cached user:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    
            if (cachedUser) {
                console.log('User data retrieved from cache');
                return res.json(JSON.parse(cachedUser));
            }
    
            next();
        });
    } else  {
        next();
    }
}
async function getUserProfileCache(req, res, next) {
    if (cashClient.ready) {
        cashClient.get(`user_profile`, (error, cachedUser) => {
            if (error) {
                console.error('Error retrieving cached user:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    
            if (cachedUser) {
                console.log('User data retrieved from cache');
                return res.json(JSON.parse(cachedUser));
            }
    
            next();
        });
    } else  {
        next();
    }
}


module.exports = {
    getAllUsersCache,
    getUserByIdCache,
    getUserProfileCache
};