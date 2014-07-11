define([
    'bublikApp',
    'css!components/widgets/rigthmenu/rigthmenu.css'
], function (app) {
    "use strict";

    var directive = function () {
        return {
            restrict: "C",
            templateUrl: '../components/widgets/rigthmenu/rigthmenu.html',
            link: function (scope, elm, attrs) {
            }
        }
    }
    //directive.$inject = ["ibxStorage", "Request", "ibxBackend", "ibxConfig"];
    app.directive('glxRigthMenu', directive)
});
