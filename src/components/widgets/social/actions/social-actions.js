define([
	'bublikApp',
	'components/servicies/messager/messager',
	'components/servicies/currentuser',
	'components/servicies/backends/user/userBackend',
	'css!components/widgets/social/actions/social-actions.css'
], function(app){
	"use strict";

	var directive = function(userBackend, currentUser, messager, $timeout){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/social/actions/social-actions.html',
			scope: {
				glxActions: '=',
				glxFollowers: '='
			},
			link: function(scope, elm, attrs){
				var addFollower = function(){
					var current = currentUser.menu.user;
					scope.glxFollowers.push({
						id: current.id,
						title: current.full_name,
						preview_url: current.avatar_preview_url
					});
				};

				var removeFollower = function(){
					var current = currentUser.menu.user;
					angular.forEach(scope.glxFollowers, function(f, k){
						if (f.id === current.id){
							scope.glxFollowers.splice(k, 1);
							return;
						}
					});
				};

				scope.follow = function(){
					userBackend.followUser(function(){
						scope.glxActions.follow = false;
						scope.glxActions.unfollow = true;
						$timeout(addFollower, 0);
					}, function(){
						messager.showErrorAlert('widget.userInfo.backenderror');
					});
				};

				scope.unfollow = function(){
					userBackend.unfollowUser(function(){
						scope.glxActions.follow = true;
						scope.glxActions.unfollow = false;
						$timeout(removeFollower, 0);
					}, function(){
						messager.showErrorAlert('widget.userInfo.backenderror');
					});
				}
			}
		}
	};
	directive.$inject = ["userBackend", "currentUser", "glxMessager", '$timeout'];
	app.directive('glxSocialActions', directive)
});