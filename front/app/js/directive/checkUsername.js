angular.module('coffee').
  directive('checkUsername', function($http, $q, $timeout,  config) {
  'use strict';
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          element.bind('blur', function() {
            console.log('blur');

            var defer = $q.defer();


              $http({
                method: 'GET',
                url: config.backend + '/api/user/checkusername',
                params: {
                  username: ngModel.$viewValue
                }
              }).success(function(data, status, headers, config) {
                if (data.exist) {
                  ngModel.$setValidity('usernameExists', false);
                } else {
                  ngModel.$setValidity('usernameExists', true);
                }
                defer.resolve;
              }).error(function(data, status, headers, config) {
                defer.resolve;
              });
            return defer.promise;
          });

            //here you should access the backend, to check if username exists
            //and return a promise
          // ngModel.$asyncValidators.usernameExists = function() {
          //   //here you should access the backend, to check if username exists
          //   //and return a promise
          //   var defer = $q.defer();

          //   $timeout(function(){
          //     $http({
          //       method: 'GET',
          //       url: config.backend + '/api/user/checkusername',
          //       params: {
          //         username: ngModel.$viewValue
          //       }
          //     }).success(function(data, status, headers, config) {
          //       console.log(data);
          //       ngModel.$setValidity('usernameExists', false);
          //       defer.resolve;
          //     }).error(function(data, status, headers, config) {
          //       console.log('error');
          //       defer.resolve;
          //     });



          //   }, 1000);





          //   return defer.promise;
          // };

            // scope.$watch(attrs.ngModel, function() {
            //     checkAvailable();
            // });

            // var checkAvailable = function() {

            //     $http({
            //         method: 'GET',
            //         url: config.backend + '/api/user/checkusername',
            //         params: {
            //             username: ngModel.$viewValue
            //         }
            //     }).success(function(data, status, headers, config) {
            //         console.log(data);
            //         ngModel.$setValidity('usernameExists', false);
            //     }).error(function(data, status, headers, config) {
            //         console.log('error');
            //         ngModel.$setValidity('usernameExists', false);
            //     });

            // };





        }
    };
});
