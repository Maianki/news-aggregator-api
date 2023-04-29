const express = require('express');
const bodyParser = require('body-parser');
const newsRoutes = express.Router();
const { getUserPreferences } = require('../controllers/userNews.controller');
const validateToken = require('../middlewares/JWTvalidate');

newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());

newsRoutes.get('/preferences', validateToken, getUserPreferences);

module.exports = newsRoutes;
