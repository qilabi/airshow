angular.module('common.services').service('DomainService', [
    '$http', 'prefixApiUrl', 'ResponseWrapper', '$q', function ($http, prefixApiUrl, ResponseWrapper, $q) {
        return {
            newObject:function(){
              return {
                   type: 0,
                   name: '',
                   account: '',
                   password: '',
                   id: 0,
                   token: ''
              };
            },
            getList: () => {
                let deferred = $q.defer();
                ResponseWrapper($http.get(`${prefixApiUrl}domains`))
                .then((data)=>{
                  data = data.sort((a, b)=>{
                      return b.id-a.id;
                  });
                  deferred.resolve(data);
                },(msg)=>{
                  deferred.reject(msg);
                });
                return deferred.promise;
            },
            get: (id) => {
                return ResponseWrapper($http.get(`${prefixApiUrl}domains/${id}`));
            },
            update: (connection) => {
                return ResponseWrapper($http.put(`${prefixApiUrl}domains/${connection.id}`, connection));
            },
            add: (connection) => {
                return ResponseWrapper($http.post(`${prefixApiUrl}domains`, connection));
            },
            remove: (connectionId) => {
                return ResponseWrapper($http.delete(`${prefixApiUrl}domains/${connectionId}`));
            },
            test: (connection)=> {
                return ResponseWrapper($http.put(`${prefixApiUrl}domains/test`, connection));
            },
            isDomainExists:(domain)=>{
                let data = {
                  name:domain
                };
                let deferred = $q.defer();

                ResponseWrapper($http.post(`${prefixApiUrl}domains/isexist`, data)).then(()=>{
                    deferred.resolve(1);
                }, (msg)=>{
                    if(msg.status == 404){
                      deferred.resolve(0);
                    }
                    else{
                      deferred.resolve(-1);
                    }
                });
                return deferred.promise;
            },
            sync:(id)=>{
                return ResponseWrapper($http.get(`${prefixApiUrl}domains/sync/${id}`));
            },
            getDiffList: (originList, newList)=>{
                if(!originList || originList.length<1){
                  return newList;
                }

                if(!newList || newList.length<1){
                  return [];
                }

                let ids= {};
                originList.map((item)=>{
                    ids[item.id] = true;
                });

                let rs = [];
                newList.map((item)=>{
                    if(!ids[item.id]){
                      rs.push(item);
                    }
                });
                ids= undefined;
                return rs;
            },
            getSyncStatisticsById: (domainId) => {
                return ResponseWrapper($http.get(`${prefixApiUrl}domains/statistics/${domainId}`));
            }
        };
    }
]);
