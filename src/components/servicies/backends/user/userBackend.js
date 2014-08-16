/**
 * @global define sessionStorage
 */
define([
	"bublikApp",
	"angular",
	'components/servicies/backends/user/userResource',
	'components/servicies/storage'

], function(app, angular){
	"use strict";

	var service = function(userResource,commonBackend, storage, $cookies, $location, $rootScope, $routeParams){

		var _setters = {
			},

			/**
			 /**
			 * GET data methods, should be private as well
			 */
			_getters = {

				loadNextTopOfCompanies: function(limit){
					storage.topOfCompanies.loading = true;
					userResource.topOfCompanies.get({level: userResource.topOfCompanies.level, limit: limit ? limit : 10, offset: storage.topOfCompanies.items.length},
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
					userResource.topOfCompanies.get({level: level, limit: limit ? limit : 10, offset: 0},
						function(data){
							angular.extend(storage.topOfCompanies, data);
							storage.topOfCompanies.loading = false;
							cb(storage.topOfCompanies);
						});
				},

				//User info
				getUserInfo: function(userId, onSuccess, onError){
					userResource.userInfo.get({userId: userId}, function(response){
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
					userResource.userInfo.save({userId: $routeParams.userId}, {first_name: newFirstName}, onSuccess, onError);
				},

				updateUserLastName: function(newFirstName, onSuccess, onError){
					onSuccess = onSuccess || function(){
						return true;
					};
					onError = onError || function(){
						return true;
					};
					userResource.userInfo.save({userId: $routeParams.userId}, {last_name: newFirstName}, onSuccess, onError);
				},

				addInterest: function(interest, onSuccess, onError){
					onSuccess = onSuccess || function(){
						return true;
					};
					onError = onError || function(){
						return true;
					};
					userResource.userInterests.insert({userId: $routeParams.userId}, {interests: [interest]}, function(response){
						storage.userInfo.interests.push(interest);
						onSuccess(response);
					},function(response){
						onError(response);
					});
				},
				removeInterest: function(interest, onSuccess, onError){
					onSuccess = onSuccess || function(){
						return true;
					};
					onError = onError || function(){
						return true;
					};
					userResource.userInterests.delete({userId: $routeParams.userId}, {interests: [interest]}, function(response){
						storage.userInfo.interests.splice(storage.userInfo.interests.indexOf(interest), 1);
						onSuccess(response);
					},function(response){
						onError(response);
					});
				},

				updateUserAvatar: function(avatar, onSuccess, onError){
					onSuccess = onSuccess || function(){
						return true;
					};
					onError = onError || function(){
						return true;
					};
					userResource.userAvatar.save({userId: $routeParams.userId},
						{
							image_data: avatar.data,
							content_type: avatar.contentType,
							crop_x: avatar.x,
							crop_y: avatar.y,
							crop_l: avatar.l
						}, onSuccess, onError);
				},

				isEmailUnique: function(email, onSuccess, onError){
					userResource.loginUnique.get({login: email}, function(response){
						if (response.status && response.status === "ok") {
							onSuccess();
						} else {
							onError();
						}
					});
				},

				registration: function(regParam, cb){
					userResource.registration.update({}, regParam, function(regData){
						if (regData.data.access_token) _setters.setAccessToken(regData.data.access_token, cb);
					});
				},

				login: function(loginParam, cb, onError){
					userResource.login.update({}, loginParam, function(response){
						if (response.data.access_token) {
							commonBackend.setAccessToken(response.data.access_token);
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
	service.$inject = ['userResource', 'commonBackend', 'storage', '$cookies', '$location', '$rootScope', '$routeParams' ];
	app.factory("userBackend", service);
	return service;
})
