var LoginError = function(message){
  'use strict';

  this.name = 'LoginError';
  this.code = 2;
  this.message = message || 'Not Login';
};

LoginError.prototype = Object.create(Error.prototype);
LoginError.prototype.constructor = LoginError;

module.exports = LoginError;
