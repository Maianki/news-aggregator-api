const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const signup = function (req, res) {
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        preferences: {
            sources: req.body?.preferences?.sources ?? [],
            categories: req.body?.preferences?.categories ?? [],
        },
    });

    user.save()
        // eslint-disable-next-line no-unused-vars
        .then((data) => {
            return res.status(200).send({
                statusCode: 200,
                message: 'User Registered successfully!',
            });
        })
        .catch((err) => {
            return res.status(500).send({
                statusCode: 500,
                message: err,
            });
        });
};

const signin = function (req, res) {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    statusCode: 404,
                    message: 'User not found!',
                });
            }

            let isPasswordValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (isPasswordValid) {
                const token = jwt.sign(
                    { id: user._id },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: 86400,
                    }
                );

                return res.status(200).send({
                    statusCode: 200,
                    message: 'login successfull!',
                    user: {
                        id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                        preferences: user.preferences,
                    },
                    accessToken: token,
                });
            } else {
                return res.status(401).send({
                    statusCode: 401,
                    message: 'Invalid Password!',
                });
            }
        })
        .catch((err) => {
            if (err) {
                return res.status(500).send({
                    message: err,
                });
            }
        });
};

module.exports = { signup, signin };
