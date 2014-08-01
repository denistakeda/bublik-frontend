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

	var service = function(resources, storage, $cookies, $location, $rootScope){

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
				}
			},

			/**
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

				//User info
				getUserInfo: function(userId, onSuccess, onError){
					resources.userInfo.get({userId: userId}, function(response){
						storage.userInfo = response.data;
						onSuccess && onSuccess(response.data);
					}, function(response){
						onError && onError(response.data);
					})
				},

				updateUserFirstName: function(newFirstName, onSuccess, onError){
					onSuccess = onSuccess || function(){
						return true;
					};
					onError = onError || function(){
						return true;
					};
					resources.userInfo.save({}, {first_name: newFirstName}, onSuccess, onError);
				},

				updateUserLastName: function(newFirstName, onSuccess, onError){
					onSuccess = onSuccess || function(){
						return true;
					};
					onError = onError || function(){
						return true;
					};
					resources.userInfo.save({}, {last_name: newFirstName}, onSuccess, onError);
				},

				isEmailUnique: function(email, onSuccess, onError){
					resources.loginUnique.get({login: email}, function(response){
						if (response.status && response.status === "ok") {
							onSuccess();
						} else {
							onError();
						}
					});
				},

				registration: function(regParam, cb){
					resources.registration.update({}, regParam, function(regData){
						if (regData.data.access_token) _setters.setAccessToken(regData.data.access_token, cb);
					});
				},

				login: function(loginParam, cb, onError){
					resources.login.update({}, loginParam, function(response){
						if (response.data.access_token) {
							_setters.setAccessToken(response.data.access_token);
							cb(response.data);
						} else {
							onError && onError();
						}
					}, function(){
						onError();
					});
				}


			};


		return angular.extend({}, _setters, _getters, _callbacks);
	}
	service.$inject = ['resources', 'storage', '$cookies', '$location', '$rootScope' ];
	app.factory("backend", service);
	return service;
})
