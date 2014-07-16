/**
 * @global define sessionStorage
 */
define([
	"bublikApp",
	"angular"
], function (app, angular) {
	"use strict";

	var properties = {
		load: {
			results: 0,
			table: 0,
			history: 0,
			categories: 0,
			tags: 0,
			resultCount: 0,
			facet: 0
		}
	};

	var service = function ($resource) {

		var	_setters = {

			},

			/**
			 * GET data methods, should be private as well
			 */
			_getters = {
                getLocalization: function(){
                    var User = $resource('/api/localization');
                    User.get(function(localization) {
                        console.log(localization);
                    });
                    console.log("!!!");
                }
			},

			/**
			 * Handle data callbacks. Can be used if you need to emulate success callbacks with exist data.
			 */
			_callbacks = {

			};



		return angular.extend({}, _setters, _getters, _callbacks);
	}
	service.$inject = ['$resource' ];
	app.factory("backend", service);
	return service;
})
