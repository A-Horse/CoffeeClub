var bookshelf = require('../db').orm,
    checkit  = require('checkit'),
    Promise  = require('bluebird'),
    bcrypt   = Promise.promisifyAll(require('bcrypt'));


/****************************************************
 *@@Model Coffeer
 *-------alias user
 *@columns:
 * --id
 * --username
 * --password
 * -- avatar
 * -- realname
 * -- email
 * -- self
 * -- city
 * -- country
 * -- phone
 * -- ismaster
 * -- isadmin
 * -- limit
 * -- isactive
 * -- created
 * -- modified
 *
 * @method
 *
 * @function
 *******************************************/

var Coffeer = bookshelf.Model.extend({
  tableName: 'Coffeer',

  initialize: function() {
    this.on('saving', this.validateSave);
  },

  validateSave: function() {
    return checkit({

    }).run(this.attributes);
  },

  articles: function(){

  }

}, {

});