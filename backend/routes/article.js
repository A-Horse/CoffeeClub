var express = require('express'),
    router = express.Router();

var logger = require('../logger'),
  Helper = require('./helper'),
    Coffeer = require('../models/coffeer'),
    BlogComment = require('../models/blogcomment'),
    Article = require('../models/article');

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    new Article({
            id: id
        }).fetch()
        .then(function(article) {
            if (article) {
                res.send(article);
            } else {
                res.status(404)
                    .send({
                        error: 'not found!'
                    });
            }
        }, function(error) {
            next(error);
        });
});

router.post('/', function(req, res, next) {
    var data = {
        coffeer_id: req.body.coffeer_id,
        title: req.body.title,
        content: req.body.content,
        type: req.body.type
    };
    new Article(data)
        .save(null, {
            method: 'insert'
        })
        .then(function(article) {
            res.send(article);
        }, function(error) {
            next(error);
        });
});

router.post('/:articlesId/comment', Helper.checkLogin, function(req, res, next){
  'use strict';

  var data = {
    article_id: req.params.articleId,
    user_id: req.session.user.id,
    comment: req.body.comment
  };
  if (req.body.for_comment_id) {
    data.is_for = true;
  }
  new BlogComment(data)
      .save(null, {
        method: 'insert'
      })
      .then(function(comment){
        res.send(comment);
      }, function(error){
        next(error);
      });
});


router.get('/:articleId/comment', function(req, res, next){
  'use strict';

  return BlogComment.collection().fetch({
    article_id: req.params.article_id,
  }).then(function(comments){
    res.send(comments);
  }, function(error){
    next(error);
  });

});

module.exports = router;

