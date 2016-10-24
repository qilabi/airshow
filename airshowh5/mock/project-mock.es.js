angular.module('app.mocks').service('ProjectMock', [
    '$httpBackend', 'prefixApiUrl', ($httpBackend, prefixApiUrl) => {
        let projects = [
            {
                id: 1,
                name: 'cmmtest & democmm',
                created: "0001-01-01T00:00:00.0000000+08:00",
                updated: "0001-01-01T00:00:00.0000000+08:00",
                dirSync: true,
                calQuery: true,
                domains: [
                    {
                        name: 'cmmtest.comcmmtest.comcmmtest.comcmmtest.comcmmtest.comcmmtest.comcmmtest.com',
                        id: 1
                    },
                    {
                        name: 'democmm.com',
                        id: 3
                    }
                ]
            }, {
                id: 2,
                name: 'startaway & dellcmm',
                created: "0001-01-01T00:00:00.0000000+08:00",
                updated: "0001-01-01T00:00:00.0000000+08:00",
                dirSync: false,
                calQuery: false,
                domains: [
                    {
                        name: 'startaway.com',
                        id: 2
                    },
                    {
                        name: 'dellcmm.com',
                        id: 4
                    }
                ]

            }
        ];

        $httpBackend.when('GET', `${prefixApiUrl}projects`).respond((method, url, data, headers) => {
            let rs = {
                status: 200,
                messages: [],
                data: projects
            };
            return [200, rs];
        });

        $httpBackend.when('GET', /\/api\/projects\/\d+/).respond((method, url, data, headers) => {
            let matchItems = /\/api\/projects\/(\d+)$/.exec(url);
            let project = projects.find(data => data.id == matchItems[1]);

            let rs = {
                status: 200,
                messages: [],
                data: project
            };

            if (!project) {
                rs = {
                    status: 404,
                    messages: ['Project not found.'],
                    data: null
                };
                return [404, rs];
            }

            return [200, rs];
        });

        $httpBackend.when('POST', `${prefixApiUrl}projects`).respond((method, url, data, headers) => {
            // Success
            let project = JSON.parse(data);
            project.id = new Date().getTime();
            projects.push(project);
            let rs = {
                status: 200,
                messages: [],
                data: project.id
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
        $httpBackend.when('PUT', /api\/projects\/\d/i).respond((method, url, data, headers) => {
            let rs = {
                status: 200,
                messages: [],
                data: null
            };
            return [200, rs];
        });

        $httpBackend.when('DELETE', /api\/projects\/\d/i).respond((method, url, data, headers) => {
            let id = url.replace('/api/projects/', '');
            for (let i in projects) {
                let data = projects[i];
                if (data.id == id) {
                    projects.splice(i, 1);
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
    }
]);
