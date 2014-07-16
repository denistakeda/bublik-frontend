define([
    'bublikApp',
    "components/servicies/backend",
    'css!components/widgets/rigthmenu/rigthmenu.css'
], function (app) {
    "use strict";

    var directive = function (backend) {
        return {
            restrict: "C",
            templateUrl: '../components/widgets/rigthmenu/rigthmenu.html',
            link: function (scope, elm, attrs) {
                backend.getLocalization();
            }
        }
    }
    directive.$inject = ["backend"];
    app.directive('glxRigthMenu', directive)
});
