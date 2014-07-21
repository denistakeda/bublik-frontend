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
				when('/user', {
					template: '<div class="glx-user"></div>'
				}).
				otherwise({
					redirectTo: '/top'
				});
		}]);
});
