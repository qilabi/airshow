angular.module('common.services').service('VersionService', ['$http', '$q', ($http, $q) => {
        return {
            get: () => {
                let defer = $q.defer();
                $http.get("version.json").then((data)=>{
                    defer.resolve(data.data.version);
                },()=>{
                  defer.resolve("unknown");
                });
                return defer.promise;
            }
        };

    }
]);
