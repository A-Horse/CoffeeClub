angular.module('coffee.controllers')
  .controller('LogInCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    '$http',
    'config',
    function($scope, $rootScope, $location, $http, config){
      'use strict';

      $scope.loginToCoffee= function(){

        console.log('debug', 'loginData', $scope.login);
        var data;
        if($scope.login.username.indexOf('@') > 0) {
          data = {
            email:  $scope.login.username,
            password:  $scope.login.password,
            type: '2'
          };
        } else {
          data = {
            username:  $scope.login.username,
            password:  $scope.login.password,
            type: '1'
          };
        }

        $http({
          method: 'POST',
          url: config.backend + '/api/user/login',
          data: data,
          withCredentials: true
        }).success(function(data){
          console.log('debug', 'signup return success', data);
          if(!data.error) {
            $scope.loginErrMsg = null;
            $rootScope.$broadcast('loginSuccess', data);
            $location.path('home');
          }
        }).error(function(data){
          console.log('error', 'login return error', data);
          $scope.signErrMsg = data.error.message;
        });


      };


    }]);
