angular.module('coffee.controllers')
    .controller('ProfileCtrl', [
        '$scope',
      '$modal',
      '$http',
        function(
          $scope,
          $modal,
        $http) {

            $scope.animationsEnabled = true;
            $scope.coffeerName = 'Tyan';
            $scope.coffeer = {
                avatar: '/img/default-avatar.png',
                username: 'Tyan',
                realname: 'Tyan Chan'
            };

            $scope.open = function(size) {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'editProfile.html',
                    controller: 'EditProfileCtrl',
                    size: size
                });
                modalInstance.result.then(function(coffeer) {
                    $scope.coffeer = coffeer;
                }, function() {

                });
            };

        }
    ])
    .controller('EditProfileCtrl', [
        '$scope',
      '$http',
      '$modalInstance',
      function($scope,
               $http,
               $modalInstance) {
        $scope.ok = function () {
          $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
        }
    ]);