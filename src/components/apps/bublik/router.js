define([
	'bublikApp',
	'components/servicies/paths'
], function(app){
	"use strict";
	app.controller('ClearStorageCtrl', ['backend', function(backend){
		backend.clearStorage();
	}]);

	app.config(['$routeProvider','glxPaths',
		function($routeProvider, paths){
			$routeProvider.
				when(paths.widgetTop.path, {
					template: paths.widgetTop.template,
					controller: paths.widgetTop.controller
				}).
				when(paths.userRegistration.path, {
					template: paths.userRegistration.template,
					controller: paths.userRegistration.controller
				}).
				when(paths.userLogin.path, {
					template: paths.userLogin.template,
					controller: paths.userLogin.controller
				}).
				when(paths.userInfo.path, {
					template: paths.userInfo.template,
					controller: paths.userInfo.controller
				}).
				when(paths.currentUserInfo.path, {
					template: paths.currentUserInfo.template,
					controller: paths.currentUserInfo.controller
				}).
				otherwise({
					redirectTo: paths.defaultWidget.path
				});
		}]);
});
