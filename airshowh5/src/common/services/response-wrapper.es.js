angular.module('common.services').service('ResponseWrapper', ['$q', function ($q) {
    return (promise)=> {
        if(!promise){
            return promise;
        }

        let defer = $q.defer();
        promise.then( (rs)=>{
            //TODO Check messages
            if(rs.status == 200 && rs.data.status == 200){
                defer.resolve(rs.data.data);
            }
            else{
                defer.reject(rs.data);
            }
        }, (rs)=>{
            let msg = {
                status: rs.status,
                messages: [rs.statusText || 'Request failed']
            };
            defer.reject(msg);
        });

        return defer.promise;
    }
}
]);
