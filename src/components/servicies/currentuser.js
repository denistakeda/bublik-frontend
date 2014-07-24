define([
	"bublikApp",
	"angular"
], function(app){
	"use strict";
	var service = function(){
		return {};
	};

	app.factory("currentUser", service);

	return service;
});