define([
	'bublikApp',
	'glx!social-actions',
	'css!components/widgets/social/social.css'
], function(app){
	"use strict";

	var directive = function(){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/social/social.html',
			scope: {
				glxSocialData: '='
			},
			link: function(scope, elm, attrs){
				scope.showFollowActions = function(){
					return scope.glxSocialData && scope.glxSocialData.actions
							&& (scope.glxSocialData.actions.follow || scope.glxSocialData.actions.unfollow);
				};
			}
		}
	}
	app.directive('glxSocial', directive)
});