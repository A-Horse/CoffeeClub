
var _ = require('lodash');

var CoffeeError = {

  CaptchaError: function(message){
    'use strict';

    this.name = 'CaptchaError';
    this.code = 3;
    this.message = message || 'CaptchaError';
  },

};


_.forOwn(CoffeeError, function(eachError, key){
  'use strict';
  eachError.prototype = Object.create(eachError.prototype);
  eachError.prototype.constructor = eachError;
});


module.exports = CoffeeError;
