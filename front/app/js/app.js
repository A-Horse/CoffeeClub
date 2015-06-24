angular.module('coffee', [
        'ui.router',
        'coffee.controllers',
        'ngAnimate'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dash', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })
        .state('blog', {
          url: '/blog',
          templateUrl: 'templates/blog.html',
          controller: 'BlogCtrl'
        })
        .state('blogarticles', {
          url: '/blogs/:blogId',
          templateUrl: 'templates/blogarticle.html',
          controller: 'BlogArticleCtrl'
        })
        .state('demoblogarticle', {
          url: '/blog/demo',
          templateUrl: 'templates/demoblogarticle.html',
          controller: 'DemoArticleCtrl',
        })
        .state('shop', {
          url: '/shop',
          templateUrl: 'templates/shop.html',
          controller: 'ShopCtrl'
        })
        .state('forum', {
          url: '/forum',
          templateUrl: 'templates/forum.html',
          controller: 'ForumCtrl'
        })
        .state('wiki', {
          url: '/wiki',
          templateUrl: 'templates/wiki.html',
          controller: 'WikiCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'templates/coffeelogin.html',
          controller: 'LogInCtrl'
        })
        .state('signin', {
          url: '/signin',
          templateUrl: 'templates/coffeesignin.html',
          controller: 'SignInCtrl'
        });

        $urlRouterProvider.otherwise('/home');
    });
