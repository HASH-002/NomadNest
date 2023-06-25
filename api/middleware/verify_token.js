const jwt = require('jsonwebtoken');
const jwtSecret = 'ninwnjoawndinidnwind';

module.exports = {
    verifyAccessToken: (req, res, next) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, (err, payload) => {
            if (err) throw err;
            req.payload = payload;
            next();
        });
    },
};