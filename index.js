const express = require('express');
const routes = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/auth.route');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
routes.use('/', authRoutes);
const PORT = 3000;

//Connect to database
try {
    mongoose.connect('mongodb://127.0.0.1:27017/usersdb', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoCreate: true,
    });
    // eslint-disable-next-line no-console
    console.log('connected to db');
} catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
}

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.listen(process.env.PORT || PORT, (err) => {
    if (!err) {
        // eslint-disable-next-line no-console
        console.log('server started!');
    }
});
