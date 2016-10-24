angular.module('common.services').service('ProjectService', [
    '$http', 'prefixApiUrl', 'ResponseWrapper', ($http, prefixApiUrl, ResponseWrapper) => {
        return {
            getProjects: () => {
                return ResponseWrapper($http.get(`${prefixApiUrl}projects`));
            },
            get: (id) => {
                return ResponseWrapper($http.get(`${prefixApiUrl}projects/${id}`));
            },
            update: (project) => {
                return ResponseWrapper($http.put(`${prefixApiUrl}projects/${project.id}`, project));
            },
            add: (project) => {
                return ResponseWrapper($http.post(`${prefixApiUrl}projects`, project));
            },
            remove: (projectId) => {
                return ResponseWrapper($http.delete(`${prefixApiUrl}projects/${projectId}`));
            }
        };

    }
]);
