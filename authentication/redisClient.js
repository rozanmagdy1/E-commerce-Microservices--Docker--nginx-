const redis = require("redis");

const HOST = 'redis';
const PORT = 6379;  

const cashClient = redis.createClient({
    host: HOST,
    port: PORT,
});

cashClient.on('ready', () => {
    console.log('Redis client connected');
});

cashClient.on('error', (error) => {});

module.exports = cashClient;
