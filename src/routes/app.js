const express = require('express')
const router = express.Router()
const h = require('../helpers');

exports.app=function app( db ) {
  router.get('/', function (req, res) {
    h.sendOk(req, res, {message: 'hello, world!'})
  })
  return router;
};