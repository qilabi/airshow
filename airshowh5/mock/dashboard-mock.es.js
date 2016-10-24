angular.module('app.mocks').service('DashboardMock', [
    '$httpBackend', 'prefixApiUrl', ($httpBackend, prefixApiUrl) => {
        return $httpBackend.when('GET', prefixApiUrl + "dashboard")
            .respond((method, url, data, headers) => {
                var rs;
                rs = [
                    {
                        Id: 1,
                        Name: 'My Project 1',
                        Connections: [
                            {
                                id: 1,
                                name: 'My Google 1',
                                status: true
                            },
                            {
                                id: 1,
                                name: 'My O365 1',
                                status: true
                            }
                        ],
                        Active: true,
                        doughnutChart: {
                            data: [300, 500, 100, 250],
                            labels: ['Completed', 'Pending', 'Ignore', 'Error']
                        }
                    },
                    {
                        Id: 2,
                        Name: 'My Project 2',
                        Connections: [
                            {
                                id: 1,
                                name: 'My Google 1',
                                status: true
                            },
                            {
                                id: 1,
                                name: 'My O365 1',
                                status: false
                            }
                        ],
                        Active: true,
                        doughnutChart: {
                            data: [300, 500, 100, 250],
                            labels: ['Completed', 'Pending', 'Ignore', 'Error']
                        }
                    }/*,
                    {
                        Id: 3,
                        Name: 'My Project 3',
                        Connections: [
                            {
                                id: 1,
                                name: 'My Google 1',
                                status: false
                            },
                            {
                                id: 1,
                                name: 'My O365 1',
                                status: true
                            }
                        ],
                        Active: true,
                        doughnutChart: {
                            data: [300, 500, 100, 250],
                            labels: ['Completed', 'Pending', 'Ignore', 'Error']
                        }
                    }*/
                ];
                return [200, rs];
            });
    }
]);
