angular.module('coffee.controllers')
    .controller('LoginCtrl', [
        '$scope',
        '$location',
        '$http',
        function(
            $scope,
            $location,
            $http) {

          $scope.error = false;

            $scope.login = function() {
                var data;
                if ($scope.loginData.loginstr.indexOf('@') > 0) {
                    data = {
                        email: $scope.loginData.loginstr,
                        password: $scope.loginData.password,
                        type: '2'
                    };
                } else {
                    data = {
                        username: $scope.loginData.loginstr,
                        password: $scope.loginData.password,
                        type: '1'
                    };
                }
                $http({
                        method: 'POST',
                        url: 'coffeer/login',
                        data: data
                    })
                    .success(function(data, status, headers, config) {
                        console.log('debug', 'login', data);
                      if(data.error){
                        $scope.error = true;
                      } else {
                        localStorage.setItem('coffeerName', data.username);
                        $location.path('dash');
                      }
                    }).error(function(data, status, headers, config) {
                        console.log('error', 'login', data);
                      $scope.error = true;
                    });
            }

        }
    ]);