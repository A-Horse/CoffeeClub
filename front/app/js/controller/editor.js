angular.module('coffee.controllers')
  .controller('EditorCtrl', [
    '$scope', '$modal', '$log', function(
      $scope, $modal, $log){
      $scope.items = ['item1', 'item2', 'item3'];

      $scope.animationsEnabled = true;
      $scope.open = function (size) {

        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myModalContent.html',
          controller: 'UploadModalCtrl',
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
          $scope.htmlVariable = '<img src=\''+ selectedItem +'\'/>';
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

    }])

  .controller('UploadModalCtrl', ['$scope', '$modalInstance', 'items', function(
    $scope, $modalInstance, items){
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      //$modalInstance.close($scope.selected.item);
      $modalInstance.close('/img/coffee_dash.jpg');
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);