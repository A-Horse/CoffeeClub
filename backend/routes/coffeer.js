var express = require('express'),
    router = express.Router();

var logger = require('../logger'),
     Coffeer= require("../models/coffeer");


router.get('/', function(req, res, next){
  logger.log('debug', 'somebody request coffeer \'/\' ');
  res.send({
    success: 'welcome!'
  });
});


/**************************************************
 * Sign in
 **************************************************/
router.post('/', function(req, res, next){
  var coffeerDate = req.body;
  Coffeer.create(coffeerDate).then(function(coffeer){
    res.send(coffeer);
  }, function(error){
    return next(error);
  });
});


module.exports = router;