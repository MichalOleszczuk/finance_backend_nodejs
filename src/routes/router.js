const express = require('express')
const router = express.Router()

const { app } = require('./app')

exports.router=function routes( db ) {
    router.use('/app', app( db ));
    return router;
};