var assert = require('assert'),
    request = require('supertest'),
    randomstring = require("randomstring");

var Coffeer = require('../../models/coffeer'),
    setting = require('../../setting');

describe('Coffeer Router Test', function() {
    var domain = setting.backend + '/api';

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

    describe('user sign in for a coffer', function() {
        it('should return 200 response', function(done) {
            console.log('debug', JSON.stringify(coffeerData));
            request(domain)
                .post('/user/')
                .send(coffeerData)
                .end(function(error, res) {
                    if (error) {
                        throw error;
                    }
                    console.log('debug', res.status);
                    console.log('debug-response', res.body);
                    assert.equal(res.status, 200);
                    done();
                });
        });
    });


    describe('coffeer login by username', function() {
        it('should return 200 response', function(done) {
            request(domain)
                .post('/user/login')
                .send({
                    username: coffeerData.username,
                    password: coffeerData.password,
                    type: '1'
                })
                .end(function(error, res) {
                    if (error) throw error;
                    if (res.body.error)
                        throw new Error('Error!');
                    assert.equal(res.status, 200);
                    assert.equal(res.body.username, coffeerData.username.toLowerCase().trim());
                    done();
                });
        });
    });

    describe('coffeer login by username but password invalid', function() {
        it('should return 400 response', function(done) {
            request(domain)
                .post('/user/login')
                .send({
                    username: coffeerData.username,
                    password: coffeerData.password + '1',
                    type: '1'
                })
                .end(function(error, res) {
                    assert.ok(res.body.error);
                    assert.equal(res.status, 400);
                    done();
                });
        });
    });


    describe('coffeer login by email', function() {
        it('should return 200 response', function(done) {
            request(domain)
                .post('/user/login')
                .send({
                    email: coffeerData.email,
                    password: coffeerData.password,
                    type: '2'
                })
                .end(function(error, res) {
                    if (error) throw error;
                    if (res.body.error)
                        throw new Error('Error!');
                    assert.equal(res.status, 200);
                    assert.equal(res.body.email, coffeerData.email.toLowerCase().trim());
                    done();
                });
        });
    });

    describe('coffeer login by email but password invalid', function() {
        it('should return 400 response', function(done) {
            request(domain)
                .post('/user/login')
                .send({
                    email: coffeerData.email,
                    password: coffeerData.password + '1',
                    type: '2'
                })
                .end(function(error, res) {
                    assert.ok(res.body.error);
                    assert.equal(res.status, 400);
                    done();
                });
        });
    });

    /****************************************************
     * Test Check Username Route
     ****************************************************/
    describe('Test Check Username Route', function() {
        it('should return true', function(done) {
            request(domain)
                .get('/user/checkusername')
                .query({
                    username: coffeerData.username
                })
                .end(function(error, res) {
                    if (error) throw error;
                    console.log('checkusername result = ', res.body);
                  assert.equal(res.body.exist, true);
                  assert.equal(res.status, 200);
                    done();
                });
        });
    });

  describe('Test Check Username Route', function() {
    it('should return true', function(done) {
      request(domain)
        .get('/user/checkusername')
        .query({
          username: 'xxxx'
        })
        .end(function(error, res) {
          if (error) throw error;
          console.log('checkusername result = ', res.body);
          assert.equal(res.body.exist, false);
          assert.equal(res.status, 200);
          done();
        });
    });
  });



});
