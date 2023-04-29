const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 3000;

//Connect to database
try {
    mongoose.connect('mongodb://localhost:27017/usersdb', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    // eslint-disable-next-line no-console
    console.log('connected to db');
} catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
}

app.listen(process.env.PORT || PORT, (err) => {
    if (!err) {
        // eslint-disable-next-line no-console
        console.log('server started!');
    }
});
