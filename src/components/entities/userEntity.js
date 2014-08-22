define([
	"bublikEntities",
	"angular",
	'components/entities/transformResponseCollection'
], function(app, angular){
	"use strict";


	var UserEntity = function($resource, $routeParams, transformResponseCollection){
		var _fields = {
			userInfo : {}
		};
		var _userInfoResource = $resource('/api/user/:userId',
				{userId: $routeParams.userId},
				{'getUserInfo': {
					method: 'GET',
					transformResponse: [
						transformResponseCollection.fromJsonConverter,
						transformResponseCollection.extractData,
						function(data){
							angular.extend(_fields.userInfo, data);
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
							_fields.userInfo.avatar = data;
						}
					]
				}
			});


		return angular.extend({}, _fields, _userInfoResource, _userAvatarResource);
	};
	UserEntity.$inject = ['$resource', '$routeParams', 'glxTransformResponseCollection'];
	app.factory('glxUserEntity', UserEntity);
	return UserEntity;
});
