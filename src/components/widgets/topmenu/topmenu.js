define([
	'bublikApp',
	'components/filters/translate',
	'css!components/widgets/topmenu/topmenu.css'
], function(app){
	"use strict";

	var directive = function(userBackend, commonBackend, storage){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/topmenu/topmenu.html',
			link: function(scope, elm, attrs){
				userBackend.getMenu();

				scope.logout = function(){
					userBackend.logout(function(data){
						userBackend.getMenu();
						commonBackend.redirectTo("user/login");
					});
				};

				scope.$watch(function(){
					return storage.currentUser && storage.currentUser.user && storage.currentUser.user.id;
				}, function(newValue, oldValue) {
					if (newValue !== oldValue) scope.currentUser = storage.currentUser && storage.currentUser.user;
				});
			}
		}
	}
	directive.$inject = ['userBackend', 'commonBackend', 'storage'];
	app.directive('glxTopmenu', directive)
});
