angular.module('coffee.controllers')
    .controller('ArticlesCtrl', [
      '$scope',
        '$http',
        function($scope, $http) {


          var coffeerName = localStorage.getItem('coffeerName');
          if(coffeerName){
            $scope.coffeerName = coffeerName;
            $scope.coffeerNameShow = true;
            $scope.loginShow = false;
          } else {
            $scope.coffeeNameShow = false;
            $scope.loginShow = true;
          }
          $scope.coffeerNameShow = true;

        }
    ]);
