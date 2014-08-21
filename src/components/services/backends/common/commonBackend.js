define([
	"bublikApp",
	"angular",
	'components/services/backends/common/commonResource',
	'components/services/storage'

], function(app, angular){
	"use strict";

	var service = function(commonResource, storage, $cookies, $location, $rootScope){

		var _setters = {
				clearStorage: function(){
					angular.forEach(storage, function(deletedElm){
						delete storage[deletedElm];
					});
					$rootScope.loading = true;
				},
				alreadyLoaded: function(){
					$rootScope.loading = false;
				},

				redirectTo: function(path){
					$location.path(path);
				},

				setAccessToken: function(accessToken, cb){
					$cookies["ACCESS_TOKEN"] = accessToken;
					cb && cb();
				},

				clearAccessToken: function(cb){
					delete $cookies["ACCESS_TOKEN"];
					cb && cb();
				}
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
	service.$inject = ['commonResource', 'storage', '$cookies', '$location', '$rootScope' ];
	app.factory("commonBackend", service);
	return service;
})