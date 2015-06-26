angular.module('coffee.controllers')
  .controller('WikiArticleCtrl', [
    '$scope',
    '$location',
    '$http',
    '$stateParams',
    'config',
    function( $scope, $location, $http, $stateParams, config){

      $scope.getWiki = function(id){
        $http({
          method: 'GET',
          url: config.backend + '/api/wiki/' + id,
          withCredentials: true
        }).success(function(data){
          console.log('debug', 'get wikis return success', data);

          if(data && !data.error) {
          }

        }).error(function(data){
          console.log('error', 'get wikis return error', data);
        });
      };

      //$scope.getWiki($stateParams.id);

    }]);






