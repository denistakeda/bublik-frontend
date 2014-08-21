define([
	'bublikApp',
	'components/services/config',
	'components/filters/translate',
	'components/services/currentuser',
	'css!components/widgets/topmenu/topmenu.css'
], function(app){
	"use strict";

	var directive = function(userBackend, commonBackend, currentUser, config){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/topmenu/topmenu.html',
			link: function(scope, elm, attrs){
				userBackend.getMenu();

				scope.currentUser = currentUser;

				scope.logout = function(){
					userBackend.logout(function(data){
						userBackend.getMenu();
						commonBackend.redirectTo("user/login");
					});
				};

				scope.getUserAvatar = function(){
					return scope.currentUser.menu.user.avatar_preview_url || config.defaultAvatar;
				}
			}
		}
	}
	directive.$inject = ['userBackend', 'commonBackend', 'currentUser', 'glxConfig'];
	app.directive('glxTopmenu', directive)
});
