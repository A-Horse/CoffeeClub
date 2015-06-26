angular.module('coffee.controllers')
  .controller('OrderCtrl', [
    '$scope',
    '$stateParams',
    '$http',
    '$state',
    'config',
    function( $scope, $stateParams, $http, $state, config){
      'use strict';

      var productId = $stateParams.productId;
      if (productId > 2) {
        productId = 1;
      }

      $http({
        method: 'GET',
        url: config.backend + '/api/product/' + productId,
          withCredentials: true
        }).success(function(data){
          console.log('debug', 'get a product return success', data);
          if (!data.error) {
            $scope.product = data;
          }
        }).error(function(data){
          console.log('error', 'get a production return error', data);

        });




    }]);
