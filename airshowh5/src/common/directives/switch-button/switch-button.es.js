angular.module('common.directives')
    .directive('switchButton', [() => {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                status: '='
            },
            templateUrl: 'common/directives/switch-button/switch-button.tpl.html',
            controller: ['$scope', ($scope) => {
                $scope.initController = () => {
                    $scope.statusText = $scope.getStatusText();
                };

                $scope.switchStatus = (status) => {
                    $scope.status = !status;
                    $scope.statusText = $scope.getStatusText();
                };

                $scope.getStatusText = () => {
                    return $scope.status ? 'ON': 'OFF';
                };

                $scope.initController();
            }]
        };
    }]);
