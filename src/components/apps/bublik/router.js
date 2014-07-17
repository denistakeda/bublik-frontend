define([
    'bublikApp'
], function (app) {
    "use strict";
    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/top', {
                    template: '<div class="glx-topcompanies"></div>'
                }).
                when('/user', {
                    template: '<div class="glx-user"></div>'
                }).
                otherwise({
                    redirectTo: '/top'
                });
        }]);
});
