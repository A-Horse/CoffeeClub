var express = require('express'),
    router = express.Router(),
  Helper = require('./helper'),
  logger = require('../logger');

var redis = require('redis'),
    rclient = redis.createClient();

var ejs = require('ejs');



router.get('/', function(req, res, next){
  'use strict';
  rclient.srandmember('Captcha', 1, function(err, result){
    var captcha = JSON.parse(result[0]);
    req.session.captcha = captcha.captcha;
    logger.log('debug', 'set session.captcha = ', req.session.captcha);
    res.send({captcha: captcha.filename});
  });
});


router.get('/test', function(req, res, next){
  'use strict';
  rclient.srandmember('Captcha', 1, function(err, result){
    var captcha = JSON.parse(result[0]);
    logger.log('debug', typeof captcha);
    req.session.captcha = captcha.captcha;
    res.render('../templates/captchaTest', {captcha: result[0]});

  });

});



router.post('/test', Helper.checkCaptcha, function(req, res, next){
  res.send(req.session.captcha);
});


module.exports = router;
