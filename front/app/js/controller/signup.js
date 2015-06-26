angular.module('coffee.controllers')
  .controller('SignUpCtrl', [
    '$scope',
    '$location',
    '$http',
    'config',
    function( $scope , $location, $http, config){
      'use strict';

      $scope.getCaptcha = function(){

        $http({
          method: 'GET',
          url: config.backend + '/api/captcha/',
          withCredentials: true
        }).success(function(data){
          $scope.captchaUrl = '/captcha/' + data.captcha;
        }).error(function(){
          $scope.getCaptchaErr = true;
        });

      };

      $scope.resigster = function(){

        console.log('debug', 'signupData', $scope.signup);
        $http({
          method: 'POST',
          url: config.backend + '/api/user/',
          data: $scope.signup,
          withCredentials: true
        }).success(function(data){
          console.log('debug', 'signup return success', data);
          if(!data.error) {
            $scope.signErrMsg = null;
            $location.path('login');
          } else {
            $scope.signErrMsg = data.error.message;
            $scope.signup.captcha = '';
            $scope.getCaptcha();
          }
        }).error(function(data){
          console.log('error', 'signup return error', data);
          $scope.signErrMsg = data.error.message;
          $scope.signup.captcha = '';
          $scope.getCaptcha();
        });

      };


      //startup
      $scope.getCaptcha();




    }]);
