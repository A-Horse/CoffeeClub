var bookshelf = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird');

var Coffeer = require('./coffeer');




var Product = bookshelf.Model.extend({
  tableName: 'product',

  initialize: function() {

  },

  hasTimestamps: ['created_at', 'updated_at']

}, {


});

module.exports = Product;
