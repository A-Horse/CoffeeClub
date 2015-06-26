var express = require('express'),
    router = express.Router();

var logger = require('../logger'),
    Helper = require('./helper'),
    Coffeer = require('../models/coffeer'),
    BlogComment = require('../models/blogcomment'),
  Product = require('../models/product');


router.get('/:id', function(req, res, next){
  'use strict';
  new Product({
    id: req.params.id
  }).fetch().then(function(product){
    res.send(product);
  }, function(error){
    next(error);
  });
});

router.get('/:', function(req, res, next){
  'use strict';
  new Product({
  }).fetch().then(function(product){
    res.send(product);
  }, function(error){
    next(error);
  });
});

module.exports = router;
