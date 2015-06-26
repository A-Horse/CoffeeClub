var express = require('express'),
    router = express.Router();

var logger = require('../logger'),
    Helper = require('./helper'),
    Coffeer = require('../models/coffeer'),
    BlogComment = require('../models/blogcomment'),
  Wiki = require('../models/wiki');


router.get('/', function(req, res, next){

  new Wiki({}).fetch().then(function(wikis){
    res.send(wikis);
  }, function(error){
    next(error);
  });

});

router.get('/:id', function(req, res, next){

  new Wiki({
    id: req.params.id
  }).fetch().then(function(wikis){
    res.send(wikis);
  }, function(error){
    next(error);
  });

});


module.exports = router;
