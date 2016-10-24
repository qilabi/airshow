angular.module('common.directives')
  .directive('template', function($compile, $parse) {
    return {
      restrict: 'E',
      scope:{
        content:"=?"
      },
      templateUrl: 'common/directives/template/template.tpl.html',
      link: function(scope, element, attr) {
        /*scope.$watch(scope.content, (function() {
          element.empty().append(scope.content);
          //element.html($parse(attr.content)(scope));
          //$compile(element.contents())(scope);
        }), true);*/
      }
    };
  });
