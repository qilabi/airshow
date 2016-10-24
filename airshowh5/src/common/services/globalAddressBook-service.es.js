angular.module('common.services').service('GlobalAddressBookService', [
  '$http', 'prefixApiUrl', 'ResponseWrapper', '$q', function($http, prefixApiUrl, ResponseWrapper, $q) {
    return {
      query: function(opt) {
        let url = [];
        url.push(`${prefixApiUrl}globaladdressbook/${opt.id}?queryText=${opt.queryText}`);
        if(opt.firstId){
          url.push(`firstId=${opt.firstId}`);
        }
        if(opt.count){
          url.push(`count=${opt.count}`);
        }
        return ResponseWrapper($http.get(url.join('&')));
      },
      statistics:(domainId)=>{
        return ResponseWrapper($http.get(`${prefixApiUrl}globaladdressbook/statistics/${domainId}`));
      }
    };
  }
]);
