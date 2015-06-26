var CaptchaError = require('../error/captchaError'),
 LoginError = require('../error/loginError'),
  logger = require('../logger');


var Helper = {
  checkCaptcha: function(req, res, next){
    'use strict';
    var captcha = req.body.captcha;
    logger.log('debug', 'req.captcha = ', captcha);
    logger.log('debug', 'session.captcha = ', req.session.captcha);
    if(captcha !== req.session.captcha){
      req.session.captcha = '';
      return next(new CaptchaError());
    } else {
      req.session.captcha = '';
      next();
    }
  },

  checkLogin: function(req, res, next){
    'use strict';
    if(!req.session.user) {
      return next(new LoginError());
    } else {
     return next();
    }

  },


};

module.exports = Helper;
