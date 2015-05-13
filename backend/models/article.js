var bookshelf = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird');

var Coffeer = require('./coffeer');


/**************************************************
 *@@Model Article
 * @columns
 * --id serial NOT NULL,
 * --coffeer_id integer NOT NULL,
 * --title character varying(255) NOT NULL,
 * --content text NOT NULL,
 * --isstar boolean NOT NULL DEFAULT false,
 * --type integer NOT NULL DEFAULT 1,
 * -------1: normal
 * -------2: help
 * --created_at timestamp with  time zone NOT NULL,
 * --updated_at timestamp with time zone,
 *
 *@ method
 *
 * @function
 *
 ***************************************************/

var Article = bookshelf.Model.extend({
  tableName: 'article',

  initialize: function() {
    this.on('saving', this.validateSave);
  },

  validateSave: function() {
    return checkit({
      coffeer_id: ['required'],
      title: ['required'],
      content: ['required'],
      type: ['required']
    }).run(this.attributes);
  },

  coffer: function(){
    return this.hasOne(Coffeer);
  },

  hasTimestamps: ['created_at', 'updated_at']

}, {


})

module.exports = Article;