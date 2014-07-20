define([
    'bublikApp',
    "components/servicies/backend",
    'libs/bootstrap/js/affix',
    'css!components/widgets/rigthmenu/rigthmenu.css'
], function (app) {
    "use strict";

    var directive = function (backend) {
        return {
            restrict: "C",
            templateUrl: '../components/widgets/rigthmenu/rigthmenu.html',
            link: function (scope, elm, attrs) {
            }
        }
    }
    directive.$inject = ["backend"];
    app.directive('glxRigthMenu', directive)
});
