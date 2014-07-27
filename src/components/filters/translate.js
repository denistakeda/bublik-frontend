define([
	'bublikApp',
	'angular',
	'components/servicies/dictionary'
], function(app, angular){
	"use strict";

	var filter = function($parse, dictionary){
		return function(key, params){
			var tstring = $parse(key)(dictionary);
			if (!tstring)
				return key;

			angular.forEach(params, function(v, k){
				tstring = tstring.replace("{" + k + "}", v);
			})
			return tstring;
		}
	}
	filter.$inject = ["$parse", "dictionary"];
	app.filter("localize", filter);
	return app;
});