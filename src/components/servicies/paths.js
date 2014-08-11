define([
	'bublikApp',
	'angular',
	'components/servicies/backends/common/commonBackend'
], function(app, angular){
	"use strict";

	app.controller('ClearStorageCtrl', ['commonBackend', function(commonBackend){
		commonBackend.clearStorage();
	}]);

	var config = {
		defaultRouting: {
			path: "/top"
		},
		allRouting: {
			userRegistration: {
				path: "/user/registration",
				template: "<div class='glx-user-registration'></div>",
				controller: "ClearStorageCtrl"
			},
			widgetTop: {
				path: "/top",
				template: "<div class='glx-topcompanies'></div>",
				controller: "ClearStorageCtrl"
			},
			userLogin: {
				path: "/user/login",
				template: "<div class='glx-login'></div>",
				controller: "ClearStorageCtrl"
			},
			userInfo: {
				path: "/user/:userId",
				template: "<div class='glx-user-info'></div>",
				controller: "ClearStorageCtrl"
			}
		}
	};

	app.constant("glxPaths", config);

});
