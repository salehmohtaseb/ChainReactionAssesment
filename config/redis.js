module.exports = {
    port: parseInt(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST ||  'localhost',
    legacyMode: true
}
console.log(process.env.REDIS_HOST)