define([
	'bublikApp',
	'components/services/config',
	'css!components/widgets/social/preview/social-preview.css'
], function(app){
	"use strict";

	var directive = function(config){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/social/preview/social-preview.html',
			scope: {
				glxObjects: '=',
				glxRedirectFunc: '='
			},
			link: function(scope){
				scope.getPreviewImage = function(preview){
					return preview.preview_url || config.defaultAvatar;
				}
			}
		}
	};
	directive.$inject = ['glxConfig'];
	app.directive('glxSocialPreview', directive)
});