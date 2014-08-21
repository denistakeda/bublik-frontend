/**
 * @global define sessionStorage
 */
define([
	"bublikApp",
	"angular",
	'components/services/backends/user/userResource',
	'components/services/config',
	'components/services/currentuser',
	'components/services/storage'
], function(app, angular){
	"use strict";

	var service = function(userResource,commonBackend, storage, currentUser, $cookies, $location, $rootScope, $routeParams, config){

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

				//User menu
				getMenu: function(onSuccess, onError){
					userResource.menu.get(function(response){
						currentUser.menu = response.data;
						onSuccess && onSuccess(response.data);
					}, function(response){
						onError && onError(response);
					})
				},

				//User info
				getUserInfo: function(userId, onSuccess, onError){
					userResource.userInfo.get({userId: userId}, function(response){
						storage.userInfo = response.data;
						onSuccess && onSuccess(response.data);
					}, function(response){
						onError && onError(response);
					})
				},

				updateUserFirstName: function(newFirstName, onSuccess, onError){
					userResource.userInfo.save({userId: $routeParams.userId}, {first_name: newFirstName},
						function(response){
							onSuccess && onSuccess(response.data);
						}, function(response){
							onError && onError(response);
						});
				},

				updateUserLastName: function(newFirstName, onSuccess, onError){
					userResource.userInfo.save({userId: $routeParams.userId}, {last_name: newFirstName},
						function(response){
							onSuccess && onSuccess(response.data);
						}, function(response){
							onError && onError(response);
						}
					);
				},

				addInterest: function(interest, onSuccess, onError){
					userResource.userInterests.insert({userId: $routeParams.userId}, {interests: [interest]}, function(response){
						storage.userInfo.interests.push(interest);
						onSuccess && onSuccess(response.data);
					},function(response){
						onError && onError(response);
					});
				},
				removeInterest: function(interest, onSuccess, onError){
					userResource.userInterests.delete({userId: $routeParams.userId}, {interests: [interest]}, function(response){
						storage.userInfo.interests.splice(storage.userInfo.interests.indexOf(interest), 1);
						onSuccess && onSuccess(response.data);
					},function(response){
						onError && onError(response);
					});
				},

				updateUserAvatar: function(avatar, onSuccess, onError){
					userResource.userAvatar.save({userId: $routeParams.userId},
						{
							image_data: avatar.data,
							content_type: avatar.contentType,
							crop_x: avatar.x,
							crop_y: avatar.y,
							crop_l: avatar.l
						},
						function(response){
							onSuccess && onSuccess(response.data);
						}, function(response){
							onError && onError(response);
						}
					);
				},

				getTagsSuggestions: function(keyword,exclude, onSuccess, onError){
					userResource.tagSuggestions.update({keyword: keyword, limit: config.tagSuggestionsLimit},{exclude: exclude}, function(response){
						onSuccess && onSuccess(response.data);
					}, function(response){
						onError && onError(response);
					})
				},

				isEmailUnique: function(email, onSuccess, onError){
					userResource.loginUnique.get({login: email}, function(response){
						if (response.status && response.status === "ok") {
							onSuccess(response.data);
						} else {
							onError(response);
						}
					});
				},

				registration: function(regParam, cb){
					userResource.registration.insert({}, regParam, function(regData){
						if (regData.data.access_token) commonBackend.setAccessToken(regData.data.access_token);
						cb && cb(regData.data);
					});
				},

				login: function(loginParam, onSuccess, onError){
					userResource.login.insert({}, loginParam, function(response){
						if (response.data.access_token) {
							commonBackend.setAccessToken(response.data.access_token);
							onSuccess(response.data);
						} else {
							onError && onError(response.data);
						}
					}, function(response){
						onError(response);
					});
				},

				logout: function(onSuccess, onError){
					userResource.logout.insert(function(response){
						commonBackend.clearAccessToken();
						onSuccess && onSuccess(response.data);
					}, function(response){
						onError && onError(response);
					});
				},

				// Social block
				followUser: function(onSuccess, onError){
					userResource.followUser.update({userId: currentUser.menu.user.id, followedId: storage.userInfo.id}, function(response){
						onSuccess && onSuccess(response.data);
					}, function(response){
						onError && onError(response);
					});
				},

				unfollowUser: function(onSuccess, onError){
					userResource.unfollowUser.update({userId: currentUser.menu.user.id, unfollowedId: storage.userInfo.id}, function(response){
						onSuccess && onSuccess(response.data);
					}, function(response){
						onError && onError(response);
					});
				}

			};


		return angular.extend({}, _setters, _getters, _callbacks);
	}
	service.$inject = ['userResource', 'commonBackend', 'storage', 'currentUser', '$cookies', '$location', '$rootScope', '$routeParams', 'glxConfig' ];
	app.factory("userBackend", service);
	return service;
})
