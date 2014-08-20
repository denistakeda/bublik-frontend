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
				glxActions: '='
			},
			link: function(scope, elm, attrs){
				scope.follow = function(){
					userBackend.followUser(function(){
						scope.glxActions.follow = false;
						scope.glxActions.unfollow = true;
					}, function(){
						messager.showErrorAlert('widget.userInfo.backenderror');
					});
				};

				scope.unfollow = function(){
					userBackend.unfollowUser(function(){
						scope.glxActions.follow = true;
						scope.glxActions.unfollow = false;
					}, function(){
						messager.showErrorAlert('widget.userInfo.backenderror');
					});
				}
			}
		}
	};
	directive.$inject = ["userBackend", "glxMessager"];
	app.directive('glxSocialFollowActions', directive)
});