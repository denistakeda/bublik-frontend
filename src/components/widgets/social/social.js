define([
	'bublikApp',
	'glx!social-actions',
	'glx!social-followed',
	'glx!social-followers',
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

				scope.showFollowedUsers = function(){
					return scope.glxSocialData && scope.glxSocialData && scope.glxSocialData.followed_users.length > 0;
				};

				scope.showFollowers = function(){
					return scope.glxSocialData && scope.glxSocialData && scope.glxSocialData.followers.length > 0;
				};
			}
		}
	}
	app.directive('glxSocial', directive)
});