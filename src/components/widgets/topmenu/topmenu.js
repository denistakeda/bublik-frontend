define([
	'bublikApp',
	'components/filters/translate',
	'components/services/currentuser',
	'css!components/widgets/topmenu/topmenu.css'
], function(app){
	"use strict";

	var directive = function(userBackend, commonBackend, currentUser){
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
			}
		}
	}
	directive.$inject = ['userBackend', 'commonBackend', 'currentUser'];
	app.directive('glxTopmenu', directive)
});
