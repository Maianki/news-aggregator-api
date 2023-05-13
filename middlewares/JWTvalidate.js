const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            process.env.JWT_SECRET,
            function (err, decode) {
                if (err) {
                    req.user = undefined;
                    req.message = 'Invalid token!';
                    next();
                    return;
                }

                User.findOne({
                    _id: decode?.id,
                })
                    .then((user) => {
                        req.user = user;
                        next();
                    })
                    .catch((err) => {
                        return res.status(500).send({
                            statusCode: 500,
                            message: err,
                        });
                    });
            }
        );
    } else {
        req.user = undefined;
        req.message = 'Authorization header not found';
        next();
    }
};

module.exports = validateJWT;
