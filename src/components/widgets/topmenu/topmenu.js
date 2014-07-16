define([
	'bublikApp',
    'components/filters/translate',
	'css!components/widgets/topmenu/topmenu.css'
], function (app) {
	"use strict";

	var directive = function () {
		return {
			restrict: "C",
			templateUrl: '../components/widgets/topmenu/topmenu.html',
			link: function (scope, elm, attrs) {
			}
		}
	}
	//directive.$inject = ["ibxStorage", "Request", "ibxBackend", "ibxConfig"];
	app.directive('glxTopmenu', directive)
});
