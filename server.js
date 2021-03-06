/**
 * Project: algo-api-testing
 * Description: api testing for my algo trading setup.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

// * Importing packages
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
// const mongoose = require('mongoose');
const sn = require('stocknotejsbridge');

// * Importing environment variable
require('dotenv').config();

let HOST;
let PORT;
let DB_USERNAME;
let DB_PASSWORD;
let DB_DATABASE_AUTH;
let DB_DATABASE;
let DB_HOST;
let DB_PORT;
if (process.env.NODE_ENV === 'development') {
    HOST = process.env.DEV_APP_HOST;
    PORT = process.env.DEV_APP_PORT;
    DB_USERNAME = process.env.DEV_DB_USERNAME;
    DB_PASSWORD = process.env.DEV_DB_PASSWORD;
    DB_DATABASE_AUTH = process.env.DEV_DB_DATABASE_AUTH;
    DB_DATABASE = process.env.DEV_DB_DATABASE;
    DB_HOST = process.env.DEV_DB_HOST;
    DB_PORT = process.env.DEV_DB_PORT;
}
if (process.env.NODE_ENV === 'test') {
    HOST = process.env.TEST_APP_HOST;
    PORT = process.env.TEST_APP_PORT;
    DB_USERNAME = process.env.TEST_DB_USERNAME;
    DB_PASSWORD = process.env.TEST_DB_PASSWORD;
    DB_DATABASE_AUTH = process.env.TEST_DB_DATABASE_AUTH;
    DB_DATABASE = process.env.TEST_DB_DATABASE;
    DB_HOST = process.env.TEST_DB_HOST;
    DB_PORT = process.env.TEST_DB_PORT;
}
if (process.env.NODE_ENV === 'production') {
    HOST = process.env.PROD_APP_HOST;
    PORT = process.env.PROD_APP_PORT;
    DB_USERNAME = process.env.PROD_DB_USERNAME;
    DB_PASSWORD = process.env.PROD_DB_PASSWORD;
    DB_DATABASE_AUTH = process.env.PROD_DB_DATABASE_AUTH;
    DB_DATABASE = process.env.PROD_DB_DATABASE;
    DB_HOST = process.env.PROD_DB_HOST;
    DB_PORT = process.env.PROD_DB_PORT;
}

// * Importing routers
// const logRoute = require('./routes/log');

// * importing controllers
const errorController = require('./controllers/error');

// * Initializing express app
const app = express();

// * Helmet to protect against well known vulnerabilities by setting appropriate HTTP headers
app.use(helmet());

// * getting real source IP address
app.set('trust proxy', true);

// * Logging middleware
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

// * CORS headers setter
app.use(cors());

// * Compress all routes
app.use(compression());

// * express body-parser settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// * logging Route
// app.use(logRoute);

// * Error Route
app.use(errorController.get404);

// * Defining NoSQL relationships

// * Initialize mongoose and start service
// mongoose
//     .connect(
//         `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/?authSource=${DB_DATABASE_AUTH}&readPreference=primary&ssl=false`,
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             poolSize: 30,
//             dbName: DB_DATABASE,
//         }
//     )
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`server listening on http://${HOST}:${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// sn setup
const logindata = {
    body: {
        "userId": "revanthnemani",
        "password": "Pratima@1998",
        "yob": "1998"
    }
};

sn.snapi.userLogin(logindata)
    .then((data) => {
        console.log('UserLogin:' + data);
    })
    .catch((error) => {
        console.log(error)
    });

// app.listen(PORT, () => {
//     console.log(`server listening on http://${HOST}:${PORT}`);
// });
