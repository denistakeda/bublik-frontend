define([
	'bublikApp',
	'angular'
], function(app, angular){
	"use strict";

	// service
	var config = {
		defaultWidget:{
			path: "/top"
		},
		userRegistration: {
			path: "/user/registration",
			template:"<div class='glx-user-registration'></div>",
			controller: "ClearStorageCtrl"
		},
		widgetTop: {
			path: "/top",
			template:"<div class='glx-topcompanies'></div>",
			controller: "ClearStorageCtrl"
		},
		userLogin: {
			path: "/user/login",
			template:"<div class='glx-login'></div>",
			controller: "ClearStorageCtrl"
		},
		userInfo: {
			path: "/user/info",
			template: "<div class='glx-user'></div>",
			controller: "ClearStorageCtrl"
		}

	};

	app.constant("glxPaths", config);

});
