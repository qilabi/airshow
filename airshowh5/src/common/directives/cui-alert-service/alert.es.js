angular.module('common.services').directive('cuiAlert', ['$timeout', '$q', function($timeout, $q) {
  var TRANSITION_TIME, getDefaults;
  TRANSITION_TIME = 250;
  getDefaults = function(type) {
    switch (type) {
      case 'danger':
        return ['exclamation-sign', 'Danger'];
      case 'warning':
        return ['warning-sign', 'Warning'];
      case 'unknown':
        return [null, 'Unknown'];
      case 'success':
        return ['ok-sign', 'Success'];
      default:
        return ['info-sign', 'Note'];
    }
  };
  return {
    templateUrl: "common/directives/cui-alert-service/alert.tpl.html",
    restrict: 'EA',
    transclude: true,
    scope: {
      cuiType: '@',
      destroyAfter: '@',
      dismissable: '=?',
      icon: '@',
      label: '@'
    },
    link: function(scope, element, attrs) {
      var icon, label, _ref;
      scope.isClosed = false;
      if (scope.dismissable == null) {
        scope.dismissable = true;
      }
      scope._icon = scope.icon;
      scope._label = scope.label;
      _ref = getDefaults(scope.cuiType), icon = _ref[0], label = _ref[1];
      if (((scope.icon == null) || scope.icon === '') && (icon != null)) {
        element.attr('icon', '');
        scope._icon = icon;
      }
      if ((scope.label == null) || scope.label === '') {
        scope._label = label;
      }
      if (angular.isNumber(parseInt(scope.destroyAfter)) && scope.destroyAfter > 0) {
        $timeout((function() {
          return scope.close();
        }), scope.destroyAfter);
      }
      scope.$on('cui:collapse:expanded', function(e) {
        return e.stopPropagation();
      });
      scope.$on('cui:alert:dismiss', function() {
        return scope.close();
      });
      return scope.close = function() {
        var deferred;
        deferred = $q.defer();
        scope.$on('cui:collapse:collapsed', function(e) {
          e.stopPropagation();
          scope.$emit('cui:alert:dismissed');
          element.remove();
          return deferred.resolve();
        });
        scope.isClosed = true;
        return deferred.promise;
      };
    }
  };
}]);
