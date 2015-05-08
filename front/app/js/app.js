angular.module('coffee', ['ui.router', 'textAngular', 'coffee.controllers'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dash', {
              url: '/dash',
              templateUrl: 'templates/dash.html',
              controller: 'DashCtrl'
            })
        .state('articles', {
          url: '/articles',
          templateUrl: 'templates/articles.html',
          controller: 'ArticlesCtrl'
        })
        .state('editor', {
          url: '/editor',
          templateUrl: 'templates/editor.html',
          controller: 'EditorCtrl'
        });
        $urlRouterProvider.otherwise('/dash');
    });