define([
	'bublikApp',
	'angular'
], function(app){
	"use strict";
	var directive = function(){
		return {
			restrict: "A",
			template: '<div us-spinner ng-show="glxLoad"></div><ng-transclude ng-hide="glxLoad"></ng-transclude>',
			transclude: true,
			scope: {
				glxLoad: "="
			}
		}
	};
	app.directive('glxLoad', directive)
});

