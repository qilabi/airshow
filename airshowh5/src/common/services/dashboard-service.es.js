angular.module('common.services').service('DashboardService', [
  '$http', 'prefixApiUrl', function($http, prefixApiUrl) {
    return {
      getProjects: function() {
        return $http.get(`${prefixApiUrl}dashboard`);
      }
    };
  }
]);
