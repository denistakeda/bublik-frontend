define([
	'bublikApp',
	'angular'
], function(app, angular){
	"use strict";

	var config = {
		userPingTimeout: 10000,
		showAlertTimeout: 5000,
		tagSuggestionsLimit: 10
	};

	app.constant("glxConfig", config);

});
