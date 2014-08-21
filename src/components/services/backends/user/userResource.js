define([
	'bublikApp',
	'angular'
], function(app, angular){
	"use strict";

	var service = function($resource){
		var resources = {
			menu: $resource('/api/menu'),
			userInfo: $resource('/api/user/:userId',
				{userId: '@id'}),
			userAvatar: $resource('/api/user/:userId/avatar',
				{userId: '@id'}),
			userInterests: $resource('/api/user/:userId/interests', {},
				{'insert': {method: 'PUT'}, 'delete': {method: 'POST'}}),//Because angular don't support DELETE with body
			loginUnique: $resource('/api/user/login/check/:login'),
			registration: $resource('/api/user/new', {}, {'insert': {method: 'PUT'}}),
			login: $resource('/api/user/login', {}, {'insert': {method: 'PUT'}}),
			logout: $resource('/api/user/logout', {}, {'insert': {method: 'PUT'}}),
			tagSuggestions: $resource('/api/search/tag/:keyword', {keyword: '@keyword', limit:'limit'}, {'update': {method: 'POST'}}),
			followUser: $resource('/api/user/:userId/social/user/follow/:followedId',
				{userId: '@userId', followedId: '@followedId'}, {'update': {method: 'POST'}}),
			unfollowUser:$resource('/api/user/:userId/social/user/unfollow/:unfollowedId',
				{userId: '@userId', unfollowedId: '@unfollowedId'}, {'update': {method: 'POST'}})
		};
		return resources;
	}
	service.$inject = ["$resource"];
	app.factory("userResource", service);
});

