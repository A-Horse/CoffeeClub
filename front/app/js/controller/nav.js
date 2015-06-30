angular.module('coffee.controllers')
  .controller('NavCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    '$http',
    '$cookies',
    '$state',
    'config',
    function( $scope, $rootScope, $location, $http, $cookies, $state, config ){
      'use strict';
      $rootScope.userIsLogin = false;
      $scope.showLogBar = true;

      $scope.checkAlive = function(){

        $http({
          method: 'GET',
          url: config.backend + '/api/user/alive',
          withCredentials: true
        }).success(function(data){
          console.log('debug', 'alive data = ', data);
          if (data.alive) {
            $scope.showUser(data.username);
            $rootScope.userIsLogin = true;
          }
        });
      };

      $rootScope.$on('loginSuccess', function (event, data) {
        $scope.showUser(data.username);
        $rootScope.userIsLogin = true;
      });

      $scope.showUser = function(username){
        $scope.showLogBar = false;
        $scope.username = username;
      };


      $scope.logout = function(){
        $http({
          method: 'POST',
          url: config.backend + '/api/user/logout',
          withCredentials: true
        }).success(function(data){
          console.log('debug', 'logout return success data', data);
          if(!data.error) {
            var cookies = $cookies.getAll();
            angular.forEach(cookies, function (v, k) {
              $cookies.remove(k);
            });
            $scope.showLogBar = true;
            $location.path('home');
          }

        });
      };

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if($.inArray(toState.name, ['home', 'wiki', 'shop', 'blog', 'forum']) > -1 ){

          angular.element('.wnav-list li span').css('opacity', '0');
          angular.element('#nav-' + toState.name + ' span').css('opacity', '1');
        }
      });


      //404 handler
      // $rootScope.$on('$stateChangeStart',
      //                function(event, toState, toParams, fromState, fromParams){
      //                  event.preventDefault();
      //                  // transitionTo() promise will be rejected with
      //                  // a 'transition prevented' error
      //                });

      // $rootScope.$on('$stateNotFound',
      //                function(event, unfoundState, fromState, fromParams){
      //                  console.log('sdsd');
      //                  console.log(unfoundState.to); // "lazy.state"
      //                  console.log(unfoundState.toParams); // {a:1, b:2}
      //                  console.log(unfoundState.options); // {inherit:false} + default options
      //                });

      // $rootScope.$on('$stateChangeError',
      //                function(event, toState, toParams, fromState, fromParams, error){
      //                  console.log('state change error');
      //                });
      // $rootScope.$on('$stateChangeStart',
      //                function(event, toState, toParams, fromState, fromParams){
      //                  event.preventDefault();
      //                  // transitionTo() promise will be rejected with
      //                  // a 'transition prevented' error
      //                });

      $scope.checkAlive();

    }]);
