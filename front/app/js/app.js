angular.module('coffee', [
        'ui.router',
        'coffee.controllers'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dash', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            });

        $urlRouterProvider.otherwise('/home');
    });