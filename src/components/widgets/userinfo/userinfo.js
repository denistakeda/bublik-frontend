define([
	'bublikApp',
	'angular',
	'components/servicies/messager/messager',
	'components/servicies/backends/user/userBackend',
	'glx-utils!editablefield',
	'glx-utils!tags',
	'glx!userinfo-avatar',
	'css!components/widgets/userinfo/userinfo.css'
], function(app){
	"use strict";

	var directive = function($routeParams, userBackend, commonBackend, storage, $modal, messager){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/userinfo/userinfo.html',
			link: function(scope, elm, attrs){
				scope.changeAvatar = function(){
					var avatarModalInstanse = $modal.open({
						templateUrl: "../components/widgets/userinfo/avatar/userinfo-avatar.html",
						controller: "userInfoAvatarCtrl"
					});
				};

				scope.updateFirstName = function(){
					userBackend.updateUserFirstName(scope.userInfo.first_name, function(){
						messager.showSuccessAlert("widget.userInfo.alert.firstNameChange.success");
					}, function(){
						messager.showErrorAlert("widget.userInfo.alert.firstNameChange.error");
					});
				};

				scope.updateLastName = function(){
					userBackend.updateUserLastName(scope.userInfo.last_name, function(){
						messager.showSuccessAlert("widget.userInfo.alert.secondNameChange.success");
					}, function(){
						messager.showErrorAlert("widget.userInfo.alert.secondNameChange.error");
					});
				};

				userBackend.getUserInfo($routeParams.userId, function(){
					scope.userInfo = storage.userInfo;
					commonBackend.alreadyLoaded();
				});

			}
		}
	};
	directive.$inject = ["$routeParams", "userBackend", "commonBackend", "storage", "$modal", "glxMessager"];
	app.directive('glxUserInfo', directive)
});

