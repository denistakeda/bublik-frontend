define([
	'bublikApp',
	'angular'
], function(app, angular){
	"use strict";

	// service
	var config = {
		userPingTimeout: 10000
	};

	app.constant("glxConfig", config);

});
