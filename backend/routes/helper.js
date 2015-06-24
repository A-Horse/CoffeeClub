
var Helper = {
  checkCaptcha: function(req, res, next){
    var captcha = req.body.captcha;
    if(captcha !== req.session.captcha){
      return next(new Error('Captcha not match'));
    } else {
      req.session.captcha = '';
      next();
    }
  },


};




module.exports = Helper;
