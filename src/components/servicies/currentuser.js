define([
	"bublikApp",
	"angular",
	'components/servicies/config'
], function(app){
	"use strict";
	var service = function($interval, resources, config){
		var user = {};
		/*$interval(function(){
		 resources.currentUser.get({}, function(response){
		 angular.extend(user, response);
		 });
		 }, config.userPingTimeout);*/

		return user;
	};

	service.$inject = ["$interval", "resources", "glxConfig"];
	app.factory("currentUser", service);

	return service;
});