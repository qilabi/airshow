angular.module('common.directives')
    .directive('dropDownList', [() => {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: '=',
                options: '=',
                ngDeleteCallback: '='
            },
            templateUrl: 'common/directives/dropdownlist/dropdownlist.tpl.html',
            controller: ['$scope', ($scope) => {
                $scope.isShowOptions = false;

                $scope.initController = () => {
                    bindEvent();
                };

                $scope.setOption = (item) => {
                    $scope.ngModel.label = item.label;
                    $scope.ngModel.value = item.value;
                    $scope.isShowOptions = false;
                };

                $scope.deleteOption = (item, $event) => {
                    var promise = new Promise(function (resolve, reject) {
                        $scope.ngDeleteCallback(item.value, resolve, reject);
                    });
                    promise.then(()=> {
                        angular.forEach($scope.options, function (obj, key) {
                            if (obj.value == item.value) {
                                if (obj.value == $scope.ngModel.value) {
                                    $scope.ngModel = {
                                        label: '',
                                        value: 0
                                    };
                                }
                                $scope.options.splice(key, 1);
                                return;
                            }
                        });
                    });
                    $event.stopPropagation();
                };

                $scope.showOptions = ($event) => {
                    $scope.isShowOptions = !$scope.isShowOptions;
                    $event.stopPropagation();
                };

                function bindEvent() {
                    angular.element(document.body).bind('click', ()=> {
                        if ($scope.isShowOptions) {
                            $scope.isShowOptions = false;
                            $scope.$apply();
                        }
                    });
                }

                $scope.initController();
            }]
        };
    }]);
