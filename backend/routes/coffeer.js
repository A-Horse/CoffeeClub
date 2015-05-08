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
  var coffeerData = req.body;
  Coffeer.create(coffeerData).then(function(coffeer){
    res.send(coffeer);
  }, function(error){
    return next(error);
  });
});

router.put('/', function(req, res, next){
  var coffeerData = req.body;
  Coffeer({
    id: coffeerData.id
  }).fetch().then(function(coffeer){
    coffeer.save(coffeerData).then(function(coffeer){
      res.send(coffeer.omit('password'));
    }, function(error){
      next(error);
    });
  }, function(error){
    next(error);
  });
});

/**************************************************
 * Coffeer Login
 * @param {String} <username or email>
 *               {String} password
 *               {type}   type [1: username, 2: email]
 * @return {String}
 **************************************************/
router.post('/login', function(req, res, next){
  if(req.body.type === '1'){
    var username = req.body.username,
        password = req.body.password;
    logger.log('debug', 'coffeer login', username + ':' + password);
    Coffeer.loginByUsername(username, password).then(function(coffeer){
      if(coffeer === false){
        return res.status(400).send({
          error: 'sorry, username or password error!'
        });
      }
      req.session.coffeer = coffeer;
      return res.send(coffeer);
    });
  } else if (req.body.type === '2') {
    var email = req.body.email,
        password = req.body.password;
    logger.log('debug', 'coffeer login', email + ':' + password);
    Coffeer.loginByEmail(email, password).then(function(coffeer){
      if(coffeer === false){
        return res.status(400).send({
          error: 'sorry, email or password error!'
        });
      }
      req.session.coffeer = coffeer;
      return res.send(coffeer);
    });
  } else {
    return next(new Error('login type is invalid'));
  }
});


module.exports = router;