const redis = require('redis');
const { redisConfig } = require('../../config')
const redisClient = redis.createClient({ socket: redisConfig });

module.exports = redisClient
