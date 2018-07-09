let app = angular.module('app', ['ngCookies']);

app.factory("hostApis", function () {
    return "http://192.168.3.107:2003";
})
.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);