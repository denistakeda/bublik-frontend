define([
	'bublikApp',
	'components/filters/translate',
	'components/servicies/currentuser',
	'css!components/widgets/topmenu/topmenu.css'
], function(app){
	"use strict";

	var directive = function(currentUser){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/topmenu/topmenu.html',
			link: function(scope, elm, attrs){
			}
		}
	}
	directive.$inject = ["currentUser"];
	app.directive('glxTopmenu', directive)
});
