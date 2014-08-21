define([
	"bublikApp",
	"angular",
	'components/services/config'
], function(app){
	"use strict";
	var service = function($interval, config){
		var user = {};

		return user;
	};

	service.$inject = ["$interval", "glxConfig"];
	app.factory("currentUser", service);

	return service;
});