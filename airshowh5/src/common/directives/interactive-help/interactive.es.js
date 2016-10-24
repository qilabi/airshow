angular.module('common.directives')
    .directive('interactive', ['$parse', '$rootScope', ($parse, $rootScope) => {
        return {
            restrict: 'A',
            scope:{},
            link: ($scope, element, attrs, ctrl) => {
                element.bind('focus', ()=>{
                    console.log('focus')
                    let name = `${attrs.interactive}`;
                    $rootScope.$broadcast('CMM.InteractiveFocus', name);
                });
                element.bind('blur', ()=>{
                    console.log('blur')
                    let name = `${attrs.interactive}`;
                    $rootScope.$broadcast('CMM.InteractiveBlur', name);
                });

            }
        };
    }]);
 
