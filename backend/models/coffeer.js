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
 *
 * @function
 * --create
 * --loginByUsername
 * --loginByEmail
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
                    coffeerData.username = coffeerData.username.toLowerCase().trim();
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

    loginByEmail: function(email, password) {
        if (!email || !password) {
            throw new Error('Email and password are both required');
        }
        var self = this;
        return new Promise(function(resolve, reject) {
            new self({
                    email: email.toLowerCase().trim()
                })
                .fetch()
                .then(function(coffeer) {
                  if (!coffeer) {
                    return resolve(false);
                  }
                    bcrypt.compare(password, coffeer.get('password'), function(error, res) {
                        if (error) return reject(error);
                        if (res === true) {
                            return resolve(coffeer.omit('password'));
                        };
                        resolve(false);
                    });
                }, function(error) {
                    reject(error);
                })
        });
    },


    /**************************************************
     * @param {String} username {String} password
     * @return {[coffeer | false]} res
     **************************************************/

    loginByUsername: function(username, password) {
        if (!username || !password)
            throw new Error('Username and password are both required');
        var self = this;
        return new Promise(function(resolve, reject) {
            new self({
                    username: username.toLowerCase().trim()
                })
                .fetch()
                .then(function(coffeer) {
                    if (!coffeer) {
                        return resolve(false);
                    }
                    bcrypt.compare(password, coffeer.get('password'), function(error, res) {
                        if (error) return reject(error);
                        if (res === true) {
                            return resolve(coffeer.omit('password'));
                        };
                        resolve(false);
                    });
                }, function(error) {
                    reject(error);
                })
        });
    }

});

module.exports = Coffeer;