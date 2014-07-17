define([
    'bublikApp',
    'angular',
    'components/servicies/storage',
    'components/servicies/backend',
    'css!components/widgets/topcompanies/topcompanies.css'
], function (app) {
    "use strict";

    var directive = function (backend, storage) {
        return {
            restrict: "C",
            templateUrl: '../components/widgets/topcompanies/topcompanies.html',
            link: function (scope, elm, attrs) {
                backend.getTopOfCompanies("city", 10, 0);
                scope.topOfCompanies = storage.topOfCompanies;

            }
        }
    };
    directive.$inject = ["backend", "storage"];
    app.directive('glxTopcompanies', directive)
});
