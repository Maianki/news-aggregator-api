const express = require('express');
const authRoutes = express.Router();
const bodyParser = require('body-parser');
const { signin, signup } = require('../controllers/auth.controller');

authRoutes.use(bodyParser.urlencoded({ extended: false }));
authRoutes.use(bodyParser.json());

authRoutes.post('/register', signup);

authRoutes.post('/login', signin);

module.exports = authRoutes;
