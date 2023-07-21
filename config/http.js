module.exports = {
    port: parseInt(process.env.HTTP_PORT) || 3001,
    host: process.env.HTTP_HOST || 'http://localhost',
    defaultPagination: {
        limit: 10,
        offset: 0
    }
}