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
                realname: 'Tyan Chan',
                self_description: '沙漠的另一边会是什么，又一片沙漠罢了',
                city: 'Wuhan',
                country: 'China'
            };

            $scope.edit_profile = function(size) {
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

          $scope.change_avatar = function(size) {
            var modalInstance = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'changeAvatar.html',
              controller: 'ChangeAvatarCtrl',
              size: size
            });
            modalInstance.result.then(function(avatar) {
              $scope.coffeer.avatar = avatar;
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
            $scope.submit  = function() {
                $modalInstance.close($scope.selected.item);
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ])
    .controller('ChangeAvatarCtrl', ['$scope',
        '$http',
        '$modalInstance',
        function($scope,
            $http,
            $modalInstance) {
          $scope.ok  = function() {
           //$modalInstance.close($scope.selected.item);
          };

          $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        }
    ]);