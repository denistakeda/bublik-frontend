/**
 * Ajax layer
 */
define([
	'bublikApp',
	'angular'
], function(app, angular){
	"use strict";

	var service = function($resource){
		var resources = {
			localization: $resource('/api/localization'),
			topOfCompanies: $resource('/api/widget/top?level=:level&limit=:limit&offset=:offset',
				{level: "city", limit: 10, offset: 0},
				{charge: {method: "GET"}}),
			loginUnique: $resource('/api/user/login/check/:login')
		};
		return resources;
	}
	service.$inject = ["$resource"];
	app.factory("resources", service);
});

