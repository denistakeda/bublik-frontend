define([
	'bublikApp',
	'angular',
	'components/services/messager/messager',
	'css!components/widgets/useralerts/useralerts.css'
], function(app, angular){
	"use strict";

	var directive = function(messager){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/useralerts/useralerts.html',
			link: function(scope, elm, attrs){
				scope.identity = angular.identity;
				scope.alerts = messager.alerts;
			}
		}
	};
	directive.$inject = ["glxMessager"];
	app.directive('glxUserAlerts', directive)
});
