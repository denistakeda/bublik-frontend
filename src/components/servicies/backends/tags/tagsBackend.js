/**
 * @global define sessionStorage
 */
define([
	"bublikApp",
	"angular",
	'components/servicies/backends/tags/tagsResource',
	'components/servicies/storage'

], function(app, angular){
	"use strict";

	var service = function(tagsResource){

		var _setters = {
			},

			/**
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
	service.$inject = ['tagsResource'];
	app.factory("tagsBackend", service);
	return service;
})
