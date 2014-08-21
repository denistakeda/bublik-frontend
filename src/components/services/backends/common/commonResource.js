define([
	'bublikApp',
	'angular'
], function(app, angular){
	"use strict";

	var service = function($resource){
		var resources = {
			localization: $resource('/api/localization')
		};
		return resources;
	}
	service.$inject = ["$resource"];
	app.factory("commonResource", service);
});

