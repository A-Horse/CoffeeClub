angular.module('coffee.controllers')
    .controller('ArticlesCtrl', [
        '$scope'
        '$http', ,
        function(
            $scope,
            $http) {

          var coffeerName = localStorage.getItem('coffeerName');

        }
    ]);