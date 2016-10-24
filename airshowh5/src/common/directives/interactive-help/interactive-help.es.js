angular.module('common.directives')
    .directive('interactiveHelp', ['$state', '$compile', ($state, $compile) => {
        return {
            restrict: 'A',
            replace:true,
            scope:{
              shown: '=ngShow'
            },
            link: ($scope, element, attrs, ctrl) => {
                $scope.shown = false;
                function camelCaseToDash( myStr ) {
                    return myStr.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
                }
                $scope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams)=>{
                    $scope.shown = false;
                    element.empty();
                    if(['dashboard', 'connections', 'editConnection'].indexOf(toState.name) > -1 ){
                        let compName = camelCaseToDash(`${toState.name}Helper`);
                        let template = `<${compName}></${compName}>`;
                        console.log(`Loading ${template}`);
                        let comp = angular.element(template);
                        $compile(comp)($scope.$new());
                        element.append(comp);
                        $scope.shown = true; 
                    }

                });

            }
        };
    }]);