const validatePreferences = require('../utils/validatePreferences');
const User = require('../models/user.model');
const axios = require('axios');

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

const updateUserPreferences = (req, res) => {
    if (!req.user && req.message) {
        return res.status(403).send({
            statusCode: 403,
            message: req.message,
        });
    }

    let userPreference = req.body.preferences;
    let validate = validatePreferences(userPreference);
    if (validate.status) {
        User.findOne({
            email: req.user.email,
        }).then((user) => {
            user.preferences = userPreference;
            user.save();
            return res.status(200).json({
                statusCode: 200,
                message: 'User preferences updated successfully',
                preferences: userPreference,
            });
        });
    } else {
        return res.status(400).json({
            statusCode: 400,
            message: 'Invalid preferences',
        });
    }
};

const getUserNews = async (req, res) => {
    if (!req.user && req.message) {
        return res.status(403).send({
            statusCode: 403,
            message: req.message,
        });
    }

    let { sources, categories } = req.user.preferences;

    let result = [];
    if (sources.length > 0) {
        let url = `https://newsapi.org/v2/top-headlines?sources=${sources.join(
            ','
        )}&apiKey=${process.env.NEWS_API_KEY}`;

        try {
            const data = await getNews(url);
            result.push(data);
        } catch (err) {
            return res.status(500).json({
                statusCode: 500,
                message: err,
            });
        }
    }
    if (categories.length > 0) {
        let url1 = `https://newsapi.org/v2/top-headlines?category=${categories.join(
            ','
        )}&apiKey=${process.env.NEWS_API_KEY}`;
        try {
            const data = await getNews(url1);
            result.push(data);
        } catch (err) {
            return res.status(500).json({
                statusCode: 500,
                message: err,
            });
        }
    }

    res.status(200).json({
        statusCode: 200,
        news: [...result],
    });
};

const getNews = (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => resolve(res.data.articles))
            .catch((err) => reject(err));
    });
};

module.exports = { getUserPreferences, updateUserPreferences, getUserNews };
