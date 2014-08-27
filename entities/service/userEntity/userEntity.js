angular.module('glxEntities').factory('glxUserEntity', function ($resource, $routeParams, glxTransformResponseCollection) {
    var _pubFields = {
        userInfo: {}
    };
    var _privFields = {
        lastSendedInterest: []  //TODO do it without field
    };
    var _userInfoResource = $resource('/api/user/:userId',
        {userId: $routeParams.userId},
        {
            'getUserInfo': {
                method: 'GET',
                transformResponse: [
                    glxTransformResponseCollection.fromJsonConverter,
                    glxTransformResponseCollection.extractData,
                    function (data) {
                        angular.extend(_pubFields.userInfo, data);
                        return data;
                    }
                ]
            },
            'changeUserName': {
                method: 'POST'
            }
        }
    );
    var _userAvatarResource = $resource('/api/user/:userId/avatar',
        {userId: $routeParams.userId},
        {
            'changeAvatar': {
                method: 'POST',
                transformResponse: [
                    glxTransformResponseCollection.fromJsonConverter,
                    glxTransformResponseCollection.extractData,
                    function (data) {
                        _pubFields.userInfo.avatar = data;
                    }
                ]
            }
        });
    var _userTagsResource = $resource('/api/user/:userId/interests',
        {userId: $routeParams.userId},
        {
            'addInterests': {
                method: 'PUT',
                transformRequest: function (data) {
                    _privFields.lastSendedInterest = data.interests;
                    return angular.toJson(data);
                },
                transformResponse:
                    glxTransformResponseCollection.onSuccessTransform(function(data){
                        _pubFields.userInfo.interests = _pubFields.userInfo.interests.concat(_privFields.lastSendedInterest);
                        return data;
                    })
            },
            'removeInterests': {
                method: 'POST', //because angular don't supported DELETE request with body
                transformRequest: function (data) {
                    _privFields.lastRemovedInterests = data.interests;
                    return angular.toJson(data);
                },
                transformResponse: glxTransformResponseCollection.onSuccessTransform(function(data){
                    angular.forEach(_privFields.lastRemovedInterests, function (interest) {
                        _pubFields.userInfo.interests.splice(_pubFields.userInfo.interests.indexOf(interest), 1);
                    });
                    return data;
                })
            }
        });
    var _followUserResource = $resource('/api/user/:userId/social/user/follow/:followedId',
        {userId: '@userId', followedId: '@followedId'},
        {
            'followUser': {
                method: 'POST',
                transformResponse: [
                    glxTransformResponseCollection.fromJsonConverter,
                    glxTransformResponseCollection.extractData,
                    glxTransformResponseCollection.onSuccessTransform(function(data){
                        _userInfoResource.getUserInfo();
                        return data;
                    })
                ]
            }
        }
    );
    var _unfollowUserResource = $resource('/api/user/:userId/social/user/unfollow/:unfollowedId',
        {userId: '@userId', unfollowedId: '@unfollowedId'},
        {
            'unfollowUser': {
                method: 'POST',
                transformResponse: [
                    glxTransformResponseCollection.fromJsonConverter,
                    glxTransformResponseCollection.extractData,
                    glxTransformResponseCollection.onSuccessTransform(function(data){
                        _userInfoResource.getUserInfo();
                        return data;
                    })
                ]
            }
        }
    );

    var glxUserEntity = angular.extend({}, _pubFields, _userInfoResource, _userAvatarResource,_userTagsResource);

    return glxUserEntity;
});