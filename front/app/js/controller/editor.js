angular.module('coffee.controllers')
  .controller('EditorCtrl', [
    '$scope', function(
      $scope){

      $scope.show = function(){
        alert($scope.htmlVariable);
      };
    }]);