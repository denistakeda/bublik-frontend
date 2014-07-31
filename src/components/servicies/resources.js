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
			userInfo: $resource('/api/user/:userId',
				{userId: '@id'}),
			topOfCompanies: $resource('/api/widget/top?level=:level&limit=:limit&offset=:offset',
				{level: "city", limit: 10, offset: 0},
				{charge: {method: "GET"}}),
			loginUnique: $resource('/api/user/login/check/:login'),
			registration: $resource('/api/user/new', {}, {'update': {method: 'PUT'}}),
			login: $resource('/api/user/login', {}, {'update': {method: 'PUT'}})
		};
		return resources;
	}
	service.$inject = ["$resource"];
	app.factory("resources", service);
});

