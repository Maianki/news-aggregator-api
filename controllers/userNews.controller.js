const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUserPreferences = (req, res) => {
    if (!req.user && req.message) {
        return res.status(403).send({
            statusCode: 403,
            message: req.message,
        });
    }

    return res.status(200).send({
        statusCode: 200,
        preferences: req.user.preferences,
    });
};

module.exports = { getUserPreferences };
