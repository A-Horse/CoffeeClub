var express = require('express'),
    router = express.Router();

var logger = require('../logger');

router.get('/', function(req, res, next){
  logger.log('debug', 'somebody request coffeer \'/\' ');
  res.send({
    success: 'welcome!'
  });
});


/**************************************************
 * Sign in
 **************************************************/
router.post('/', function(req, res, next){

});


module.exports = router;