var bookshelf = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird');

var Coffeer = require('./coffeer'),
  Article = require('./article');




var BlogComment = bookshelf.Model.extend({
  tableName: 'blogcomment',

  initialize: function() {

  },

  article: function(){
    return this.belongsTo(Article);
  },

  author: function(){
    return this.belongsTo(Coffeer);
  },

  hasTimestamps: ['created_at', 'updated_at']

}, {


});

module.exports = BlogComment;
