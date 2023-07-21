module.exports = {
    secret: process.env.SESSION_SECRET || 'MySecret',
    saveUninitialized: false,
    resave: false,
    name: process.env.SESSION_NAME  || 'sessionId',
    cookie: {
      secure: process.env.SESSION_SECURE === 'true' || false,
      httpOnly: process.env.SESSION_HTTP_ONLY === 'true' || false, 
      maxAge: (Number(process.env.SESSION_TTL) || 1000) * 1000 * 60 * 30, 
      sameSite: process.env.SESSION_SECURE === 'true' ? 'none' : 'lax'
    },
}