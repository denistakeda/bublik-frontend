define([
	'bublikApp',
	'angular',
	'components/servicies/messager/messager',
	'glx-utils!editablefield',
	'glx!userinfo-avatar',
	'css!components/widgets/userinfo/userinfo.css'
], function(app){
	"use strict";

	var directive = function($routeParams, backend, storage, $modal, userInfoAvatarCtrl, messager){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/userinfo/userinfo.html',
			link: function(scope, elm, attrs){
				scope.changeAvatar = function(){
					var avatarModalInstanse = $modal.open({
						templateUrl: "../components/widgets/userinfo/avatar/userinfo-avatar.html",
						controller: userInfoAvatarCtrl
					});
				};

				scope.updateFirstName = function(){
					backend.updateUserFirstName(scope.userInfo.first_name, function(){
						messager.showSuccessAlert("Успех!", "Ваше имя успешно обновлено!");
					}, function(){
						messager.showErrorAlert("Антиуспех!", "Что-то пошло не так! Пока неясно что!");
					});
				};

				scope.updateLastName = function(){
					backend.updateUserLastName(scope.userInfo.last_name, function(){
						messager.showSuccessAlert("Успех!", "Ваша фамилия успешно обновлена!");
					}, function(){
						messager.showErrorAlert("Антиуспех!", "Что-то пошло не так! Пока неясно что!");
					});
				};

				backend.getUserInfo($routeParams.userId, function(){
					scope.userInfo = storage.userInfo;
					backend.alreadyLoaded();
				});

			}
		}
	};
	directive.$inject = ["$routeParams", "backend", "storage", "$modal", "userInfoAvatarCtrl", "glxMessager"];
	app.directive('glxUserInfo', directive)
});

