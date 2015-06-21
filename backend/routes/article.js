var express = require('express'),
    router = express.Router();

var logger = require('../logger'),
    Coffeer = require('../models/coffeer'),
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

module.exports = router;
