define([
	'bublikApp',
	'angular',
	'glx-utils!editablefield',
	'glx!userinfo-avatar',
	'css!components/widgets/userinfo/userinfo.css'
], function(app){
	"use strict";

	var directive = function($routeParams, backend, storage, $modal){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/userinfo/userinfo.html',
			link: function(scope, elm, attrs){
				scope.changeAvatar = function(){
					var avatarModalInstanse = $modal.open({
						templateUrl: "../components/widgets/userinfo/avatar/userinfo-avatar.html",
						controller: 'userInfoAvatarCtrl'
					});
				};

				scope.updateFirstName = function(){
					backend.updateUserFirstName(scope.userInfo.first_name);
				};

				scope.updateLastName = function(){
					backend.updateUserLastName(scope.userInfo.last_name);
				};

				backend.getUserInfo($routeParams.userId, function(){
					scope.userInfo = storage.userInfo;
					backend.alreadyLoaded();
				});

			}
		}
	};
	directive.$inject = ["$routeParams", "backend", "storage", "$modal"];
	app.directive('glxUserInfo', directive)
});

