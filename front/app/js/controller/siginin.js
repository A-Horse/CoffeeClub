angular.module('coffee.controllers')
    .controller('SigninCtrl', [
      '$scope',
        '$location',
        '$http',
        function(
            $scope,
            $location,
            $http) {

            $scope.register = function() {
                $http({
                    method: 'POST',
                    url: '/coffeer/',
                    data: $scope.signin
                }).success(function(data, status, headers, config) {
                    console.log('debug', 'signin', data);
                    $location.path('login');
                }).error(function(data, status, headers, config) {
                    console.log('error', 'sigin', data);
                });
            };

        }
    ]);