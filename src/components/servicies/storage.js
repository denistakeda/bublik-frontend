define([
	"bublikApp",
	"angular"
], function(app){
	"use strict";
	var service = function(){

		var _public = {
			/**
			 * @property results {Array} snippets related with current conditions
			 */
			topOfCompanies: {loading: true, hasMore:true}
		};




		return _public;
	};

	app.factory("storage", service);

	return service;
});
