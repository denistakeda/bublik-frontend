define([
	"bublikApp",
	"angular"
], function(app){
	"use strict";
	var service = function(){

		var _public = {
		};


		return _public;
	};

	app.factory("storage", service);

	return service;
});
