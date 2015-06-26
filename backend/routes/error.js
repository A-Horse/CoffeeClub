var express = require('express'),
  logger = require('../logger');


ErrorHandler = {
  log: function(err, req, res, next){
    logger.log('error', err.message);
    logger.log('error', err.stack);
    next(err);
  },

  clientErrorHandler: function(err, req, res, next){
    if (req.xhr) {
      res.status(500).send({ error: 'Something blew up!' });
    } else {
      next(err);
    }
  },

  errorHandler: function(err, req, res, next){
    res.status(500);
    //res.render('../templates/error', { error: err.message, stack: err.stack });
    res.send({
      error: {
        name: err.name,
        message: err.message,
        code: err.code
      }
    });
  }

};


module.exports = ErrorHandler;
