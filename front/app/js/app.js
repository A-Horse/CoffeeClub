angular.module('coffee', [
  'ui.router',
  'textAngular',
  'ui.bootstrap',
  'coffee.controllers'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dash', {
              url: '/dash',
              templateUrl: 'templates/dash.html',
              controller: 'DashCtrl'
            })
        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        })
        .state('logout', {
          url: '/logout',
          templateUrl: 'templates/logout.html',
          controller: 'LogoutCtrl'
        })
        .state('signin', {
          url: '/signin',
          templateUrl: 'templates/signin.html',
          controller: 'SigninCtrl'
        })
        .state('articles', {
          url: '/articles',
          templateUrl: 'templates/articles.html',
          controller: 'ArticlesCtrl'
        })
        .state('profile', {
          url: '/profile',
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        })
        .state('editor', {
          url: '/editor',
          templateUrl: 'templates/editor.html',
          controller: 'EditorCtrl'
        });
        $urlRouterProvider.otherwise('/dash');
    });