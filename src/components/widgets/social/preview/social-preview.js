define([
	'bublikApp',
	'css!components/widgets/social/preview/social-preview.css'
], function(app){
	"use strict";

	var directive = function(){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/social/preview/social-preview.html',
			scope: {
				glxObjects: '=',
				glxRedirectFunc: '='
			}
		}
	};
	directive.$inject = [];
	app.directive('glxSocialPreview', directive)
});