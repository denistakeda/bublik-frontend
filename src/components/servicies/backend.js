/**
 * @global define sessionStorage
 */
define([
	"bublikApp",
	"angular",
    'components/servicies/resources'

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

	var service = function (resources) {

		var	_setters = {

			},

			/**
			 * GET data methods, should be private as well
			 */
			_getters = {
			},

			/**
			 * Handle data callbacks. Can be used if you need to emulate success callbacks with exist data.
			 */
			_callbacks = {

			};



		return angular.extend({}, _setters, _getters, _callbacks);
	}
	service.$inject = ['resources' ];
	app.factory("backend", service);
	return service;
})
