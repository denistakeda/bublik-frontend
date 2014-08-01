define([
	"bublikApp",
	"angular",
	'components/servicies/config'
], function(app){
	"use strict";
	var service = function($interval, resources, config){
		var user = {};

		return user;
	};

	service.$inject = ["$interval", "resources", "glxConfig"];
	app.factory("currentUser", service);

	return service;
});