define([
	'bublikApp',
	'css!components/widgets/header/header.css'
], function (app) {
	"use strict";

	var directive = function () {
		return {
			restrict: "C",
			templateUrl: '../components/widgets/header/header.html'
		}
	}
	app.directive('glxHeader', directive)
});
