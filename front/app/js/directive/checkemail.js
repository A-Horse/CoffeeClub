angular.module('coffee').
directive('checkEmail', function($http, $q, $timeout, config) {
    'use strict';
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            element.bind('blur', function() {
                var defer = $q.defer();

                $http({
                    method: 'GET',
                    url: config.backend + '/api/user/checkemail',
                    params: {
                        email: ngModel.$viewValue
                    }
                }).success(function(data, status, headers, config) {
                    if (data.exist) {
                        ngModel.$setValidity('emailExists', false);
                    }
                    defer.resolve;
                }).error(function(data, status, headers, config) {
                    defer.resolve;
                });
                return defer.promise;
            });



        }
    };
});
