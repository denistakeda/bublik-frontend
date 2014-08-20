define([
	'bublikApp',
	'components/servicies/messager/messager',
	'components/servicies/backends/user/userBackend',
	'css!components/widgets/social/follow/actions/social-follow-actions.css'
], function(app){
	"use strict";

	var directive = function(userBackend, messager){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/social/follow/actions/social-follow-actions.html',
			scope: {
				actions: '='
			},
			link: function(scope, elm, attrs){
				scope.follow = function(){
					userBackend.followUser(function(){
						scope.actions.follow = false;
						scope.actions.unfollow = true;
					}, function(){
						messager.showErrorAlert('widget.userInfo.social.actions.followError');
					});
				};

				scope.unfollow = function(){
					userBackend.unfollowUser(function(){
						scope.actions.follow = true;
						scope.actions.unfollow = false;
					}, function(){
						messager.showErrorAlert('widget.userInfo.social.actions.unfollowError');
					});
				}
			}
		}
	};
	directive.$inject = ["userBackend", "glxMessager"];
	app.directive('glxSocialFollowActions', directive)
});