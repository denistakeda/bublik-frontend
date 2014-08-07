define([
	'bublikApp',
	'angular'
], function(app, angular){
	"use strict";

	// service
	var config = {
		userPingTimeout: 10000,
		showAlertTimeout: 5000,
		deleteAlertTimeout: 3000
	};

	app.constant("glxConfig", config);

});
