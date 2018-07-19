const express = require('express')
const router = express.Router()
const h = require('../helpers');

exports.app=function app( db ) {
  router.get('/:id', function (req, res) {
    const id = req.params.id;
    const response = db.connection.db.collection('cats').find({name: id}).toArray();
    response.then((data) => h.sendOk(req, res, data))
  })
  router.post('/', function (req, res) {
    if (error = h.bodyValidation(req, {
        val: 'name',
        type: 'string'
      })){
          h.sendError(error, 400, req, res);
          return;
      }
      const Cat = db.model('Cat', { name: String });

      const kitty = new Cat({ name: req.body.name });
      kitty.save().then(() => h.sendOk(req, res));
  })
  return router;
};