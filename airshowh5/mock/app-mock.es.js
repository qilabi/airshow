angular.module("app.mocks", ["ngMockE2E", "common.config"]).run([
  "$httpBackend",
  "DomainMock",
  "ProjectMock",
  "DashboardMock",
  "GlobalAddressBookMock",
  function($httpBackend) {
    $httpBackend.whenGET(/^[\/]{0,1}app\//).passThrough();
    $httpBackend.whenGET(/^http/).passThrough();
    $httpBackend.whenGET(/^http/).passThrough();
    $httpBackend.whenGET(/^[\/]{0,1}language\//).passThrough();
    $httpBackend.whenGET(/[licenses\.json|thirdParty\.json|version\.json]/).passThrough();

  }
]);
