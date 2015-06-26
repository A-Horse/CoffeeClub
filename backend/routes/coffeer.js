var express = require('express'),
  _ = require('underscore'),
    router = express.Router();

var logger = require('../logger'),
  Helper = require('./helper');
    Coffeer = require("../models/coffeer");


router.get('/', function(req, res, next) {
    logger.log('debug', 'somebody request coffeer \'/\' ');
    res.send({
        success: 'welcome!'
    });
});

/**************************************************
 * Sign up
 **************************************************/
router.post('/', Helper.checkCaptcha, function(req, res, next) {
  var coffeerData = _.omit(req.body, 'captcha');
    Coffeer.create(coffeerData).then(function(coffeer) {
        res.send(coffeer.omit('password'));
    }, function(error) {
        return next(error);
    });
});

router.put('/', function(req, res, next) {
    var coffeerData = req.body;
    Coffeer({
        id: coffeerData.id
    }).fetch().then(function(coffeer) {
        coffeer.save(coffeerData).then(function(coffeer) {
            res.send(coffeer.omit('password'));
        }, function(error) {
            next(error);
        });
    }, function(error) {
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
router.post('/login', function(req, res, next) {
    if (req.body.type === '1') {
        var username = req.body.username,
            password = req.body.password;
        logger.log('debug', 'coffeer login', username + ':' + password);
        Coffeer.loginByUsername(username, password).then(function(coffeer) {
            if (coffeer === false) {
                return res.status(400).send({
                    error: 'sorry, username or password error!'
                });
            }
            req.session.user = coffeer;
            return res.send(coffeer);
        });
    } else if (req.body.type === '2') {
        var email = req.body.email,
            password = req.body.password;
        logger.log('debug', 'coffeer login', email + ':' + password);
        Coffeer.loginByEmail(email, password).then(function(coffeer) {
            if (coffeer === false) {
                return res.status(400).send({
                    error: 'sorry, email or password error!'
                });
            }
            req.session.user = coffeer;
            return res.send(coffeer);
        });
    } else {
        return next(new Error('login type is invalid'));
    }
});


/**************************************************
 * User logout
 **************************************************/
router.post('/logout', function(req, res, next){
  req.session.destroy();
  res.send({
    logout: 'succcess'
  });
});

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.send({
    logout: 'succcess'
  });
});
/**************************************************
 *  Check Coffeer username exist
 **************************************************/
router.get('/checkusername', function(req, res, next) {
    var username = req.query.username;
  if(!username) {
    return res.send({
      error: 'not give param'
    });
  }
    new Coffeer({
      username: username.toLowerCase().trim()
    }).fetch().then(function(coffeer) {
      if(coffeer){
        res.send({
          exist: true
        });
      } else {
        res.send({
          exist: false
        });
      }
    }, function(error) {
      next(error);
    });
});


router.get('/checkemail', function(req, res, next) {
  var email = req.query.email;
  if(!email) {
    return res.send({
      error: 'not give param'
    });
  }
  new Coffeer({
    email: email.toLowerCase().trim()
  }).fetch().then(function(coffeer) {
    if(coffeer){
      res.send({
        exist: true
      });
    } else {
      res.send({
        exist: false
      });
    }
  }, function(error) {
    next(error);
  });
});

router.get('/alive', function(req, res, next){
  'use strict';

  if(req.session.user) {
    res.send({
      alive: true,
      username: req.session.user.username
    });
  } else {
    res.send({alive: false});
  }

});


module.exports = router;
