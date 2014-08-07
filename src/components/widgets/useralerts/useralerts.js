define([
	'bublikApp',
	'components/filters/translate',
	'components/servicies/messager',
	'css!components/widgets/useralerts/useralerts.css'
], function(app){
	"use strict";

	var directive = function(backend, messager){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/useralerts/useralerts.html',
			link: function(scope, elm, attrs){
				scope.alerts = messager.alerts;
			}
		}
	};
	directive.$inject = ["backend", "glxMessager"];
	app.directive('glxUserAlerts', directive)
});
