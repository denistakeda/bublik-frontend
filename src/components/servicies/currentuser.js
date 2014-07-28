define([
	"bublikApp",
	"angular"
], function(app){
	"use strict";
	var service = function($interval, resources){
		var user = {};
		$interval(function(){
			resources.currentUser.get({}, function(response){
				angular.extend(user, response);
			});
		}, 5000)

		return user;
	};

	service.$inject = ["$interval", "resources"];
	app.factory("currentUser", service);

	return service;
});