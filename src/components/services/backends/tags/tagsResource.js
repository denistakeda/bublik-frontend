define([
	'bublikApp',
	'angular'
], function(app, angular){
	"use strict";

	var service = function($resource){
		var resources = {
			tagsSuggestions: $resource('/api/tag')
		};
		return resources;
	}
	service.$inject = ["$resource"];
	app.factory("commonResource", service);
});

