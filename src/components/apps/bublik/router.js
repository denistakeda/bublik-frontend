define([
    'bublikApp'
], function (app) {
    "use strict";
    console.log("lknfvln");
    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/top', {
                    template: '<div class="glx-top"></div>'
                }).
                when('/user', {
                    template: '<div class="glx-user"></div>'
                }).
                otherwise({
                    redirectTo: '/top'
                });
        }]);
});
