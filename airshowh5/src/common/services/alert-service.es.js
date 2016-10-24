class AlertService {

    constructor(cuiAlertService) {
        this.cuiAlertService = cuiAlertService;
        this.location = "alert-service";
    }

    alert(type, message, destroyAfter = 3000){
        this.cuiAlertService({
            location: this.location,
            type: type,
            content: message,
            destroyAfter: destroyAfter
        });
    }

    Success(message, destroyAfter = 3000) {
        this.alert('success', message, destroyAfter);
    }

    Error(message, destroyAfter = 0) {
        this.alert('danger', message, destroyAfter);
    }

    Warning(message, destroyAfter = 3000) {
         this.alert('warning', message, destroyAfter);
    }
}

angular.module('common.services').service('AlertService', ['cuiAlertService', (cuiAlertService) => {
        return new AlertService(cuiAlertService);
    }
]);
