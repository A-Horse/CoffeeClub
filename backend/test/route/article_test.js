var assert = require('assert'),
    request = require('supertest'),
    randomstring = require("randomstring");

var Coffeer = require('../../models/coffeer'),
    Article = require('../../models/article'),
    setting = require('../../setting');

describe('Article Model Route Test', function(){
  var domain = setting.backend;
  var articleData = {
    id:1,
    coffeer_id: 1,
    title: 'hi, I\'m love coffee!',
    content: 'No one can understand the truth until he drinks of coffees frothy goodness. Sheik Abd-al-Kadir',
    type: 1
  };

  describe('create a artcle', function(){
    it('it should return  a article json', function(done){
      request(domain)
      .post('/article')
      .send(articleData)
        .end(function(error, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.coffeer_id, articleData.coffeer_id);
          console.log('post', res.body);
          done();
        });
    });
  });

  describe('get a article by id', function(){
    it('should return a article json', function(done){
      request(domain)
        .get('/article/' + articleData.id)
        .end(function(error, res){
          console.log('get', res.body);
          assert.equal(res.status, 200);
          assert.equal(res.body.coffeer_id, articleData.coffeer_id);
          done();
        });
    });
  });

});

