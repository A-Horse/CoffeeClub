var bookshelf = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird');

var Coffeer = require('./coffeer');




var Wiki = bookshelf.Model.extend({
  tableName: 'wiki',

  initialize: function() {

  },

  hasTimestamps: ['created_at', 'updated_at']

}, {


});

module.exports = Wiki;
