define([
	'bublikApp',
	'angular'
], function(app, angular){
	"use strict";

	var service = function($resource){
		var resources = {
			userInfo: $resource('/api/user/:userId',
				{userId: '@id'}),
			userAvatar: $resource('/api/user/:userId/avatar',
				{userId: '@id'}),
			userInterests: $resource('/api/user/:userId/interests', {},
				{'insert': {method: 'PUT'}, 'delete': {method: 'POST'}}),
			topOfCompanies: $resource('/api/widget/top?level=:level&limit=:limit&offset=:offset',
				{level: "city", limit: 10, offset: 0},
				{charge: {method: "GET"}}),
			loginUnique: $resource('/api/user/login/check/:login'),
			registration: $resource('/api/user/new', {}, {'update': {method: 'PUT'}}),
			login: $resource('/api/user/login', {}, {'update': {method: 'PUT'}}),
			tagSuggestions: $resource('/api/search/tag/:keyword', {keyword: '@keyword', limit:'limit'}, {'update': {method: 'POST'}})
		};
		return resources;
	}
	service.$inject = ["$resource"];
	app.factory("userResource", service);
});

