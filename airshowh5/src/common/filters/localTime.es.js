angular.module('common.filters').filter('localTime', [() => {
    return (number, format) => {
        return moment.utc(number).format(format);
    }
}
]);
