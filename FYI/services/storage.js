define([
	"app",
	"angular"
], function(app){
	"use strict";
	var service = function(){

		var _public = {
			rooms: [],
			currentRoom:{}
		};




		return _public;
	};

	app.factory("storage", service);

	return service;
});
