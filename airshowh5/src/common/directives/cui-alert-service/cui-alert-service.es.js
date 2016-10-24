


angular.module('common.services').factory('cuiAlertService', ['$document', '$timeout', '$q', '$rootScope', '$sce', '$compile', '$templateCache', function($document, $timeout, $q, $rootScope, $sce, $compile, $templateCache) {
  var alertService, getAlertsLocation, getDocument, setAlerts;
  getDocument = function(args, type) {
    var deferred;
    deferred = $q.defer();
    $timeout((function() {
      return setAlerts(args, type, deferred);
    }), 0);
    return deferred.promise;
  };
  alertService = function() {
    return getDocument(arguments);
  };
  alertService.danger = function() {
    return getDocument(arguments, 'danger');
  };
  alertService.warning = function() {
    return getDocument(arguments, 'warning');
  };
  alertService.unknown = function() {
    return getDocument(arguments, 'unknown');
  };
  alertService.success = function() {
    return getDocument(arguments, 'success');
  };
  alertService.flush = function(id) {
    var elLocation;
    elLocation = getAlertsLocation(id);
    return angular.forEach(elLocation.children(), function(child) {
      return angular.element(child).isolateScope().$broadcast('cui:alert:dismiss');
    });
  };
  getAlertsLocation = function(id) {
    var alertPlaceholder;
    if (id == null) {
      id = 'cui-application-frame-alert-service';
    }
    alertPlaceholder = angular.element(document.getElementById(id));
    if (alertPlaceholder.length !== 1) {
      throw new Error("Couldn't find alert service location with id '" + id + "'");
    }
    return alertPlaceholder;
  };
  setAlerts = function(args, type, deferred) {
    var alert, el, elContent, elLocation, scope;
    alert = {
      type: type
    };
    if (angular.isString(args[0])) {
      alert.content = args[0];
      if (angular.isObject(args[1])) {
        alert = angular.extend(alert, args[1]);
      } else if (angular.isString(args[1])) {
        alert.location = args[1];
        if (args[2] != null) {
          alert = angular.extend(alert, args[2]);
        }
      }
    } else if (angular.isObject(args[0])) {
      alert = args[0];
    }
    elContent = $templateCache.get("common/directives/cui-alert-service/cui-alert-service.tpl.html");
    el = angular.element(elContent);
    scope = $rootScope.$new();
    scope.content = $sce.trustAsHtml(alert.content);
    scope.dismissable = alert.dismissable;
    scope.label = alert.label;
    scope.id = alert.id;
    scope.type = alert.type;
    scope.icon = alert.icon;
    scope.dismissable = alert.dismissable;
    scope.destroyAfter = alert.destroyAfter;
    el = $compile(el)(scope);
    elLocation = getAlertsLocation(alert.location);
    elLocation.append(el);
    if (elLocation.children().length > 3) {
      angular.element(elLocation.children()[0]).isolateScope().$broadcast('cui:alert:dismiss');
    }
    return scope.$on('cui:alert:dismissed', function() {
      return deferred.resolve(alert.id);
    });
  };
  return alertService;
}]);
