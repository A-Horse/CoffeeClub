var CaptchaError = function(message){
  'use strict';

  this.name = 'CaptchaError';
  this.code = 3;
  this.message = message || 'Captcha not match';
};

CaptchaError.prototype = Object.create(Error.prototype);
CaptchaError.prototype.constructor = CaptchaError;

module.exports = CaptchaError;
