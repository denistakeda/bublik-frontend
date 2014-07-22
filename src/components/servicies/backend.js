/**
 * @global define sessionStorage
 */
define([
	"bublikApp",
	"angular",
	'components/servicies/resources',
	'components/servicies/storage'

], function(app, angular){
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

	var service = function(resources, storage){

		var _setters = {
				clearStorage: function(){
					storage = {};
				}
			},

			/**
			 * GET data methods, should be private as well
			 */
			_getters = {

				loadNextTopOfCompanies: function(limit){
					storage.topOfCompanies.loading = true;
					resources.topOfCompanies.get({level: resources.topOfCompanies.level, limit: limit ? limit : 10, offset: storage.topOfCompanies.items.length},
						function(data){
							storage.topOfCompanies.items = storage.topOfCompanies.items.concat(data.items);
							storage.topOfCompanies.loading = false;
						});
				}

			},

			/**
			 * Handle data callbacks. Can be used if you need to emulate success callbacks with exist data.
			 */
			_callbacks = {
				getTopOfCompanies: function(level, limit, cb){
					storage.topOfCompanies = {loading: true, hasMore: true};
					resources.topOfCompanies.get({level: level, limit: limit ? limit : 10, offset: 0},
						function(data){
							angular.extend(storage.topOfCompanies, data);
							storage.topOfCompanies.loading = false;
							cb(storage.topOfCompanies);
						});
				},

				isEmailUnique: function(email, onSuccess, onError){
					resources.loginUnique.get({login: email}, function(response){
						if (response.status && response.status==="ok") {
							onSuccess();
						} else {
							onError();
						}
					});
				},

				registration: function(regParam, cb){
					resources.registration.update({}, {user: regParam}, function(data){
						console.log(data);
					});
				}
			};


		return angular.extend({}, _setters, _getters, _callbacks);
	}
	service.$inject = ['resources', 'storage' ];
	app.factory("backend", service);
	return service;
})
