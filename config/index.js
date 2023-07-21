const httpConfig = require('./http');
const dbConfig = require('./db');
const redisConfig = require('./redis');
const sessionConfig = require('./session')
const swaggerConfig = require('./swagger');

module.exports = {
    httpConfig,
    dbConfig,
    redisConfig,
    sessionConfig,
    swaggerConfig
}