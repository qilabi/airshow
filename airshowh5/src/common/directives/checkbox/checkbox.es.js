angular.module('common.directives')
    .directive('checkbox', [() => {
        return {
            restrict: 'E',
            transclude: true,
            replace:true,
            scope: {
                ngModel: '=',
                ngDisabled: '='
            },
            templateUrl: 'common/directives/checkbox/checkbox.tpl.html'
        };
    }]);
