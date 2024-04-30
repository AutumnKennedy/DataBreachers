const cookieParser = require('cookie-parser');

const extractTokenFromCookie = (req, res, next) => {
    const authToken = req.cookies.authToken;
    if (!authToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    req.authToken = authToken;
    next();
};

module.exports = extractTokenFromCookie;
