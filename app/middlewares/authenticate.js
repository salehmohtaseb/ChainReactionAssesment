const authenticate =  (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.json({
            statusCode: 401,
            err: 'Not authenticated'
        })
    }
    next();
}

module.exports = authenticate;