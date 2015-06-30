angular.module('coffee', [
        'ui.router',
        'coffee.controllers',
        'ngAnimate',
        //'textAngular',
        'ngCookies',
        'ngTouch',
    ])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('home', {
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
        .state('order', {
          url: '/order/:productId',
          templateUrl: 'templates/order.html',
          controller: 'OrderCtrl'
        })
        .state('forum', {
          url: '/forum',
          templateUrl: 'templates/forum.html',
          controller: 'ForumCtrl'
        })
        .state('forumNew', {
          url: '/forum/new',
          templateUrl: 'templates/newPost.html',
          controller: 'NewPostCtrl'
        })
        .state('wiki', {
          url: '/wiki',
          templateUrl: 'templates/wiki.html',
          controller: 'WikiCtrl'
        })
        .state('wikiarticles', {
          url: '/wiki/:id',
          templateUrl: 'templates/wikiarticle.html',
          controller: 'WikiArticleCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'templates/coffeelogin.html',
          controller: 'LogInCtrl'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'templates/csignup.html',
          controller: 'SignUpCtrl'
        })
        .state('404', {
          url: '/404',
          templateUrl: 'templates/404.html',
        })
        .state('building', {
          url: '/building',
          templateUrl: 'templates/building.html',
        });

        $urlRouterProvider.otherwise('/home');

      // $urlRouterProvider.otherwise(function ($injector, $location) {
      //   $injector.invoke(['$state', function ($state) {
      //     console.log($location);
      //     if ($location.url === '') {
      //       $state.go('home');
      //     } else {
      //     $state.go('404');
      //     }
      //   }]);
      //   return true;
      // });

    });
