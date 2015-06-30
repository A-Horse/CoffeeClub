angular.module('coffee').
  directive('navHamburger', function($http, $q, $timeout,  config) {
  'use strict';
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModel) {


          var target = $(element).data('target');
          if(!target) {return ;}
          var $target = $(target);
          if(!target) {return ;}

          var targetChange = function(){
            if($target.hasClass('on')){
              $target.removeClass('on');
            } else {
              $target.addClass('on');
            }
          };

          element.on('click', targetChange);

          $target.delegate('li a', 'click', targetChange);

        }
    };
});
