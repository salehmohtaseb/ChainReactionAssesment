const session = require('express-session');
const connectRedis = require('connect-redis');
const redisClient = require('../utils/redis');
redisClient.connect().catch(console.error);
const RedisStore = connectRedis(session);
const { sessionConfig } = require('../../config');

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  ...sessionConfig,
});