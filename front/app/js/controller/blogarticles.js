angular.module('coffee.controllers')
  .controller('BlogArticleCtrl', [
    '$scope',
    '$stateParams',
    function( $scope, $stateParams){
      'use strict';


      $scope.article = {
        url: 'templates/blogs/' + $stateParams.blogId + '.html',
      };




    }]);
