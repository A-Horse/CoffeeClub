var bookshelf = require('../db').orm,
    checkit = require('checkit'),
    Promise = require('bluebird'),
    bcrypt = Promise.promisifyAll(require('bcrypt'));


/****************************************************
 *@@Model Coffeer
 *-------alias user
 * @columns:
 * --id
 * --username
 * --password
 * -- avatar
 * -- realname
 * -- email
 * -- self_description
 * -- city
 * -- country
 * -- phone
 * -- ismaster
 * -- isadmin
 * -- limit_login
 * -- isactive
 * -- created_at
 * -- updated_at
 *
 * @method
 *
 * @function
 *
 *******************************************/

var Coffeer = bookshelf.Model.extend({
    tableName: 'coffeer',

    initialize: function() {
        this.on('saving', this.validateSave);
    },

    validateSave: function() {
        return checkit({
            username: ['required'],
            password: ['required'],
            email: ['required', 'email'],
            realname: ['required']
        }).run(this.attributes);
    },

    articles: function() {

    },

  hasTimestamps: ['created_at', 'updated_at']

}, {

    create: function(coffeerData) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var password_raw = coffeerData.password;
            bcrypt.genSalt(10, function(error, salt) {
                bcrypt.hash(password_raw, salt, function(error, password) {
                    //begin to store
                    //---clean up some columns
                    coffeerData.password = password;
                    coffeerData.email = coffeerData.email.toLowerCase().trim();
                    //.........maybe more
                    new self(coffeerData).save().then(function(coffeer) {
                        resolve(coffeer);
                    }, function(error) {
                        reject(error);
                    });
                });
            });
        });
    },


});

module.exports = Coffeer;