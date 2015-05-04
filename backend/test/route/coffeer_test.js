var assert = require('assert'),
    request = require('supertest'),
    randomstring = require("randomstring");

var Coffeer = require('../../models/coffeer');

describe('Coffeer Router Test', function(){
  var domain = 'http://0.0.0.0:5000';

  var coffeerData = {
    username: randomstring.generate(6),
    password: '123456',
    email: randomstring.generate(6) + '@gmail.com',
    realname: 'Tester',
    self_description: 'I\'m good man! yeah? oh, sure!',
    city: 'Wuhan',
    country: 'China',
    phone: '13026184346'
  };

  describe('user sign in for a coffer', function(){
    it('should return 200 response', function(done){
      console.log('debug', JSON.stringify(coffeerData));
      request(domain)
      .post('/coffeer/')
      .send(coffeerData)
        .end(function(error, res){
          if(error){
            throw error;
          }
          console.log('debug', res.status);
          console.log('debug-response', res.body);
          assert.equal(res.status, 200);
          done();
        });
    });
  });

});