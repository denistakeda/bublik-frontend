define([
	'bublikApp',
	'glx!social-follow-actions',
	'css!components/widgets/social/social.css'
], function(app){
	"use strict";

	var directive = function(){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/social/social.html',
			scope: {
				socialData: '='
			},
			link: function(scope, elm, attrs){
				scope.showFollowActions = function(){
					return scope.socialData && scope.socialData.actions
							&& (scope.socialData.actions.follow || scope.socialData.actions.unfollow);
				};
			}
		}
	}
	app.directive('glxSocial', directive)
});