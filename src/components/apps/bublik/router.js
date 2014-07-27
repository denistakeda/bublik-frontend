define([
	'bublikApp'
], function(app){
	"use strict";
	app.controller('ClearStorageCtrl', ['backend', function(backend){
		backend.clearStorage();
	}]);

	app.config(['$routeProvider',
		function($routeProvider){
			$routeProvider.
				when('/top', {
					template: '<div class="glx-topcompanies"></div>',
					controller: 'ClearStorageCtrl'
				}).
				when('/user/registration', {
					template: '<div class="glx-user-registration"></div>',
					controller: 'ClearStorageCtrl'
				}).
				when('/user/login', {
					template: '<div class="glx-login"></div>',
					controller: 'ClearStorageCtrl'
				}).
				when('/user', {
					template: '<div class="glx-user"></div>'
				}).
				otherwise({
					redirectTo: '/top'
				});
		}]);
});
