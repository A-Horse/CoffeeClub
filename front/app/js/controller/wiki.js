angular.module('coffee.controllers')
  .controller('WikiCtrl', [
    '$scope',
    '$location',
    '$http',
    'config',
    function( $scope, $location, $http, config){

      $scope.getWikis = function(sort){
        $http({
          method: 'GET',
          url: config.backend + '/api/wiki/' + (sort||''),
          withCredentials: true
        }).success(function(data){
          console.log('debug', 'get wikis return success', data);

          if(data && !data.error) {

          }

        }).error(function(data){
          console.log('error', 'get wikis return error', data);
        });
      };

     //$scope.getWikis();


    }]);
