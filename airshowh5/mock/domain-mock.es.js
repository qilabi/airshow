angular.module('app.mocks').service('DomainMock', [
    '$httpBackend', 'prefixApiUrl', ($httpBackend, prefixApiUrl) => {
        let domains = [
            {
                type: 1,
                name: 'cmmtest.com',
                account: "test@google.com",
                password: "",
                token: 'ya29.CjHzAjslYbX2eQAUTzGCSzsADTQn9WxxjF2cslTm9Fz7ywHjMcC0Zsrb6lm4RUgRa1b6',
                refreshToken: '',
                id: 1,
                "created": "2016-04-24T10:41:58",
                "updated": "2016-04-27T10:47:37"
            },
            {
                type: 1,
                name: 'startaway.com',
                account: "test@google.com",
                password: "",
                token: 'ya29.CjHzAjslYbX2eQAUTzGCSzsADTQn9WxxjF2cslTm9Fz7ywHjMcC0Zsrb6lm4RUgRa1b6',
                refreshToken: '',
                id: 2,
                "created": "2016-04-25T10:41:58",
                "updated": "2016-04-27T10:47:37"
            }, {
                type: 2,
                name: 'democmm.com',
                account: "test@office.com",
                password: "123456",
                token: '',
                refreshToken: '',
                id: 3,
                "created": "2016-04-26T10:41:58",
                "updated": "2016-04-27T10:47:37"
            }, {
                type: 2,
                name: 'dellcmm2.com',
                account: "test@office.com",
                password: "123456",
                token: '',
                refreshToken: '',
                id: 4,
                "created": "2016-04-27T10:41:58",
                "updated": "2016-04-27T10:47:37"
            },
            {
                type: 1,
                name: 'cmmtest3.com',
                account: "test@google.com",
                password: "",
                token: 'ya29.CjHzAjslYbX2eQAUTzGCSzsADTQn9WxxjF2cslTm9Fz7ywHjMcC0Zsrb6lm4RUgRa1b6',
                refreshToken: '',
                id: 5,
                "created": "2016-04-28T10:41:58",
                "updated": "2016-04-27T10:47:37"
            },
            {
                type: 1,
                name: 'startaway3.com',
                account: "test@google.com",
                password: "",
                token: 'ya29.CjHzAjslYbX2eQAUTzGCSzsADTQn9WxxjF2cslTm9Fz7ywHjMcC0Zsrb6lm4RUgRa1b6',
                refreshToken: '',
                id: 6,
                "created": "2016-04-29T10:41:58",
                "updated": "2016-04-27T10:47:37"
            }, {
                type: 0,
                name: 'democmm4.com',
                account: "",
                password: "",
                token: '',
                refreshToken: '',
                id: 7,
                "created": "2016-04-30T10:41:58",
                "updated": "2016-04-27T10:47:37"
            }, {
                type: 2,
                name: 'dellcmm4.com',
                account: "test@office.com",
                password: "123456",
                token: '',
                refreshToken: '',
                id: 8,
                "created": "2016-05-27T10:41:58",
                "updated": "2016-04-27T10:47:37"
            }
            /*,
             {
             name: 'MyGoogle 2',
             type: 1,
             domain: 'google.com',
             account: "test@google.com",
             clientId:"123456789",
             clientSecret:"123456789",
             password:"",
             id:3
             }, {
             name: 'MyOffice365 2',
             type: 2,
             domain: 'office.com',
             account: "test@office.com",
             clientId:"",
             clientSecret:"",
             password:"123456",
             id:4
             }*/
        ];

        //GET
        $httpBackend.when('GET', `${prefixApiUrl}domains`).respond((method, url, data, headers) => {
            let rs = {
                status: 200,
                messages: [],
                data: domains
            };
            return [200, rs];
        });

        //GET
        $httpBackend.when('GET', /\/api\/domains\/\d+/).respond((method, url, data, headers) => {
            let matchItems = /\/api\/domains\/(\d+)$/.exec(url);
            let domain = domains.find(d => d.id == matchItems[1]);

            let rs = {
                status: 200,
                messages: [],
                data: domain
            };

            if (!domain) {

                rs = {
                    status: 404,
                    messages: ['Domain not found.'],
                    data: null
                };
                return [404, rs];
            }

            return [200, rs];
        });
        //sync
        $httpBackend.when('GET', /\/api\/domains\/sync\/\d+/).respond((method, url, data, headers) => {

            let rs = {
                status: 200,
                messages: [],
                data: null
            };

            return [200, rs];
        });

        //POST add
        $httpBackend.when('POST', `${prefixApiUrl}domains`).respond((method, url, data, headers) => {
            // Success
            let domain = JSON.parse(data);
            domain.id = new Date().getTime();
            domains.push(domain);
            let rs = {
                status: 200,
                messages: [],
                data: domain.id
            };

            //Error
            /*rs = {
             status: 500,
             messages: ["Failed to connect to the service."],
             data: null
             };*/
            return [200, rs];
        });

        //PUT Update
        $httpBackend.when('PUT', /api\/domains\/\d/i).respond((method, url, data, headers) => {
            let id = url.replace('/api/domains/', '');
            for (let i in domains) {
                let domain = domains[i];
                if (domain.id == id) {
                    domains[i] = JSON.parse(data);
                    break;
                }
            }
            let rs = {
                status: 200,
                messages: [],
                data: null
            };
            return [200, rs];
        });

        //DELETE
        $httpBackend.when('DELETE', /api\/domains\/\d/i).respond((method, url, data, headers) => {
            let id = url.replace('/api/domains/', '');
            for (let i in domains) {
                let domain = domains[i];
                if (domain.id == id) {
                    domains.splice(i, 1);
                    break;
                }
            }
            let rs = {
                status: 200,
                messages: [],
                data: null
            };
            return [200, rs];
        });

        //status
        //GET
        /*$httpBackend.when('GET', `${prefixApiUrl}domainstatus`).respond((method, url, data, headers) => {
         let rs = {
         status: 200,
         messages: []
         };
         return [200, rs];
         });*/

        $httpBackend.when('PUT', `${prefixApiUrl}domains/test`).respond((method, url, data, headers) => {
            let status = 200;//Math.random()>0.5 ? 200 : 404;
            let rs = {
                status: status,
                messages: []
            };
            return [status, rs];
        });


        //POST add
        $httpBackend.when('POST', `${prefixApiUrl}domains/isexist`).respond((method, url, data, headers) => {
            // Success
            let domain = JSON.parse(data);
            let exists = false;
            for (let i in domains) {
                let d = domains[i];
                if (d.name == domain.name) {
                    exists = true;
                    break;
                }
            }
            let status = exists ? 200 : 404;
            let rs = {
                status: status,
                messages: [],
                data: null
            };

            //Error
            /*rs = {
             status: 500,
             messages: ["Failed to connect to the service."],
             data: null
             };*/
            return [status, rs];
        });

        //GET last sync statistics
        $httpBackend.when('GET', /\/api\/domains\/statistics\/\d+/).respond((method, url, data, headers) => {
            let statisticsData = [
                {
                    domainId: 1,
                    syncStartTime: "2016-06-11T10:41:58",
                    syncEndTime: "2016-06-11T11:55:55",
                    lastSyncTime: "2016-06-11T1:00:58",
                    addUserSuccessCount: 1,
                    addGroupSuccessCount: 2,
                    addContactSuccessCount: 3,
                    addResourceSuccessCount: 4,
                    updateUserSuccessCount: 5,
                    updateGroupSuccessCount: 6,
                    updateContactSuccessCount: 7,
                    updateResourceSuccessCount: 8,
                    deleteUserSuccessCount: 9,
                    deleteGroupSuccessCount: 10,
                    deleteContactSuccessCount: 11,
                    deleteResourceSuccessCount: 12,
                    addUserFailCount: 13,
                    addGroupFailCount: 14,
                    addContactFailCount: 15,
                    addResourceFailCount: 16,
                    updateUserFailCount: 17,
                    updateGroupFailCount: 18,
                    updateContactFailCount: 19,
                    updateResourceFailCount: 20,
                    deleteUserFailCount: 21,
                    deleteGroupFailCount: 22,
                    deleteContactFailCount: 23,
                    deleteResourceFailCount: 24
                },
                {
                    domainId: 2,
                    syncStartTime: "2016-06-12T10:41:58",
                    syncEndTime: "2016-06-12T11:45:52",
                    lastSyncTime: "2016-06-12T11:00:58",
                    addUserSuccessCount: 25,
                    addGroupSuccessCount: 26,
                    addContactSuccessCount: 27,
                    addResourceSuccessCount: 28,
                    updateUserSuccessCount: 29,
                    updateGroupSuccessCount: 30,
                    updateContactSuccessCount: 31,
                    updateResourceSuccessCount: 32,
                    deleteUserSuccessCount: 33,
                    deleteGroupSuccessCount: 34,
                    deleteContactSuccessCount: 35,
                    deleteResourceSuccessCount: 36,
                    addUserFailCount: 37,
                    addGroupFailCount: 38,
                    addContactFailCount: 39,
                    addResourceFailCount: 40,
                    updateUserFailCount: 40,
                    updateGroupFailCount: 42,
                    updateContactFailCount: 43,
                    updateResourceFailCount: 44,
                    deleteUserFailCount: 45,
                    deleteGroupFailCount: 46,
                    deleteContactFailCount: 47,
                    deleteResourceFailCount: 48
                },
                {
                    domainId: 3,
                    syncStartTime: "0001-01-01T00:00:00.0000000+08:00",
                    syncEndTime: "0001-01-01T00:00:00.0000000+08:00",
                    lastSyncTime: "0001-01-01T00:00:00.0000000+08:00",
                    addUserSuccessCount: 0,
                    addGroupSuccessCount: 0,
                    addContactSuccessCount: 0,
                    addResourceSuccessCount: 0,
                    updateUserSuccessCount: 0,
                    updateGroupSuccessCount: 0,
                    updateContactSuccessCount: 0,
                    updateResourceSuccessCount: 0,
                    deleteUserSuccessCount: 0,
                    deleteGroupSuccessCount: 0,
                    deleteContactSuccessCount: 0,
                    deleteResourceSuccessCount: 0,
                    addUserFailCount: 0,
                    addGroupFailCount: 0,
                    addContactFailCount: 0,
                    addResourceFailCount: 0,
                    updateUserFailCount: 0,
                    updateGroupFailCount: 0,
                    updateContactFailCount: 0,
                    updateResourceFailCount: 0,
                    deleteUserFailCount: 0,
                    deleteGroupFailCount: 0,
                    deleteContactFailCount: 0,
                    deleteResourceFailCount: 0
                },
                {
                    domainId: 4,
                    syncStartTime: "2016-06-13T10:41:58",
                    syncEndTime: "2016-06-13T12:00:59",
                    lastSyncTime: "2016-06-13T11:00:58",
                    addUserSuccessCount: 49,
                    addGroupSuccessCount: 50,
                    addContactSuccessCount: 51,
                    addResourceSuccessCount: 52,
                    updateUserSuccessCount: 53,
                    updateGroupSuccessCount: 54,
                    updateContactSuccessCount: 55,
                    updateResourceSuccessCount: 56,
                    deleteUserSuccessCount: 57,
                    deleteGroupSuccessCount: 58,
                    deleteContactSuccessCount: 59,
                    deleteResourceSuccessCount: 60,
                    addUserFailCount: 61,
                    addGroupFailCount: 62,
                    addContactFailCount: 63,
                    addResourceFailCount: 64,
                    updateUserFailCount: 65,
                    updateGroupFailCount: 66,
                    updateContactFailCount: 67,
                    updateResourceFailCount: 68,
                    deleteUserFailCount: 69,
                    deleteGroupFailCount: 70,
                    deleteContactFailCount: 71,
                    deleteResourceFailCount: 72
                }
            ];
            let matchItems = /\/api\/domains\/statistics\/(\d+)$/.exec(url);
            let statistics = statisticsData.find(s => s.domainId == matchItems[1]);

            let rs = {
                status: 200,
                messages: [],
                data: statistics
            };

            if (!statistics) {
                rs = {
                    status: 404,
                    messages: ['Statistics not found.'],
                    data: null
                };
                return [404, rs];
            }

            return [200, rs];

        });
    }
]);
