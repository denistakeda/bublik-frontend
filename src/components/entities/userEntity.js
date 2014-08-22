define([
	"bublikEntities",
	"angular",
	'components/entities/transformResponseCollection'
], function(app, angular){
	"use strict";


	var UserEntity = function($resource, $routeParams, transformResponseCollection){
		var _pubFields = {
			userInfo : {}
		};
		var _privFields = {
			lastSendedInterest: []  //TODO do it without field
		};
		var _userInfoResource = $resource('/api/user/:userId',
				{userId: $routeParams.userId},
				{'getUserInfo': {
					method: 'GET',
					transformResponse: [
						transformResponseCollection.fromJsonConverter,
						transformResponseCollection.extractData,
						function(data){
							angular.extend(_pubFields.userInfo, data);
						}
					]
				}}
			);
		var _userAvatarResource = $resource('/api/user/:userId/avatar',
			{userId: $routeParams.userId},
			{
				'changeAvatar': {
					method: 'POST',
					transformResponse: [
						transformResponseCollection.fromJsonConverter,
						transformResponseCollection.extractData,
						function(data){
							_pubFields.userInfo.avatar = data;
						}
					]
				}
			});
		/*userInterests= $resource('/api/user/:userId/interests', {},
			{'insert': {method: 'PUT'}, 'delete': {method: 'POST'}});*/
		var _userTagsResource = $resource('/api/user/:userId/interests',
			{userId: $routeParams.userId},
			{
				'addInterests': {
					method: 'PUT',
					transformRequest: function(data){
						_privFields.lastSendedInterest = data.interests;
						return angular.toJson(data);
					},
					transformResponse: function(data, headers){
							if (/201*/.test(headers('Status')))
								_pubFields.userInfo.interests = _pubFields.userInfo.interests.concat(_privFields.lastSendedInterest);
							return data;
					}
				},
				'removeInterests': {
					method: 'POST', //because angular don't supported DELETE request with body
					transformRequest: function(data){
						_privFields.lastRemovedInterests = data.interests;
						return angular.toJson(data);
					},
					transformResponse: function(data, headers){
						if (/201*/.test(headers('Status'))){
							angular.forEach(_privFields.lastRemovedInterests, function(interest){
								_pubFields.userInfo.interests.splice(_pubFields.userInfo.interests.indexOf(interest), 1);
							});
						}
						return data;
					}
				}
			});


		return angular.extend({}, _pubFields, _userInfoResource, _userAvatarResource,_userTagsResource);
	};
	UserEntity.$inject = ['$resource', '$routeParams', 'glxTransformResponseCollection'];
	app.factory('glxUserEntity', UserEntity);
	return UserEntity;
});
