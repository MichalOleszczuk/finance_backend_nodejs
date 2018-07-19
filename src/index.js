const fs = require('fs');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');
const rfs = require('rotating-file-stream')
const constants = require('./constants');
const middlewares = require('./helpers');
const { router } = require('./routes/router')
const initializeDb = require('./db').db;

// ensure log directory exists
fs.existsSync(constants.LOGS_PATH) || fs.mkdirSync(constants.LOGS_PATH)

// create a rotating write stream
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: constants.LOGS_PATH
  })

// logger
app.use(morgan('common', {stream: accessLogStream}));

// CORS
app.use(middlewares.allowOrigins);

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// connect to db
initializeDb( db => {

    app.use('/api', router( db ));

    app.listen(constants.EXPRESS_PORT, constants.EXPRESS_HOST, () => 
        console.log(`Express app listening on ${constants.EXPRESS_HOST}:${constants.EXPRESS_PORT}`)
    )
})