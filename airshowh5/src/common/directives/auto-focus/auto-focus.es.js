angular.module('common.directives')
    .directive('autoFocus', [() => {
        return {
            restrict: 'A',
            link: ($scope, element) => {
                element.focus();
            }
        };
    }]);
 
