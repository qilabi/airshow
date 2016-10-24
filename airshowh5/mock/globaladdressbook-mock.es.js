angular.module('app.mocks').service('GlobalAddressBookMock', [
    '$httpBackend', 'prefixApiUrl', ($httpBackend, prefixApiUrl) => {

        let idIndex = 0;
        $httpBackend.when('GET', /\/api\/globaladdressbook\/(\d+)\?(.*)$/).respond((method, url, data, headers) => {
            let matchItems = /\/api\/globaladdressbook\/(\d+)\?(.*)$/.exec(url);
            let domainId = matchItems[1];

            let gab = [];
            let endIdIndex = idIndex+11
            for(var i= idIndex; i < endIdIndex; i++){
              let item = {
                 "id": i,
                 "firstName": "Sam",
                 "lastName": "Huang " + i,
                 "primaryEmail": "sam.huang"+i+"@brutus.qsftdemo.com",
                 "phone": "1234567890",
                 "company": "Dell",
                 "category": 1,
                 "created": "2016-04-24T10:41:58.0000000+08:00",
                 "updated": "2016-04-24T10:41:58.0000000+08:00",
                 "adType": 0,
                 "projectId": 1,
                 "domainId": 1
             };
             idIndex += 10;
              gab.push(item);
            }

            let rs = {
                status: 200,
                messages: [],
                data: gab
            };

            return [200, rs];
        });

        $httpBackend.when('GET', /\/api\/globaladdressbook\/statistics\/(\d+)$/).respond((method, url, data, headers) => {


            let rs = {
                status: 200,
                messages: [],
                data: {
                  "users": 3600,
                  "groups": 21700,
                  "resources": 400000000000,
                  "contacts": 200
                }
            };

            return [200, rs];
        });


    }
]);
