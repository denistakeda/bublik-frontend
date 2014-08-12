define([
	'bublikApp',
	'angular',
	'css!components/utils/tags/tags.css'
], function(app){
	"use strict";

	var directive = function($timeout){
		return {
			restrict: "C",
			templateUrl: '../components/utils/tags/tags.html',
			require: "glxModel",
			scope: {
				glxModel: "="
			},
			link: function(scope, elm, attrs){
			}
		}
	};
	directive.$inject = [];
	app.directive('glxTags', directive)
});

