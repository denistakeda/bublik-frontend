angular.module('glxEntities').factory('glxUserEntity', function ($resource, $routeParams, glxEntity, glxTransformResponseCollection, glxStorageCleaner) {
    return glxEntity({
        storage: {
            userInfo: {type: 'Object', cleanEvent: '$locationChangeStart'}
        },
        controller: function (storage) {
            var _privFields = {
                lastSendedInterest: []  //TODO do it without field
            };

            angular.extend(this,
                $resource('/api/user/:userId',
                    {userId: '@userId'},
                    {
                        'getUserInfo': {
                            method: 'GET',
                            transformResponse: [
                                glxTransformResponseCollection.fromJsonConverter,
                                glxTransformResponseCollection.extractData,
                                function (data) {
                                    angular.extend(storage.userInfo, data);
                                    return data;
                                }
                            ]
                        },
                        'changeUserName': {
                            method: 'POST'
                        }
                    }
                )
            );

            angular.extend(this,
                $resource('/api/user/:userId/avatar',
                    {userId: $routeParams.userId},
                    {
                        'changeAvatar': {
                            method: 'POST',
                            transformResponse: [
                                glxTransformResponseCollection.fromJsonConverter,
                                glxTransformResponseCollection.extractData,
                                function (data) {
                                    storage.userInfo.avatar = data;
                                }
                            ]
                        }
                    })
            );

            angular.extend(this,
                $resource('/api/user/:userId/interests',
                    {userId: $routeParams.userId},
                    {
                        'addInterests': {
                            method: 'PUT',
                            transformRequest: function (data) {
                                _privFields.lastSendedInterest = data.interests;
                                return angular.toJson(data);
                            },
                            transformResponse: glxTransformResponseCollection.onSuccessTransform(function (data) {
                                storage.userInfo.interests = storage.userInfo.interests.concat(_privFields.lastSendedInterest);
                                return data;
                            })
                        },
                        'removeInterests': {
                            method: 'POST', //because angular don't supported DELETE request with body
                            transformRequest: function (data) {
                                _privFields.lastRemovedInterests = data.interests;
                                return angular.toJson(data);
                            },
                            transformResponse: glxTransformResponseCollection.onSuccessTransform(function (data) {
                                angular.forEach(_privFields.lastRemovedInterests, function (interest) {
                                    storage.userInfo.interests.splice(storage.userInfo.interests.indexOf(interest), 1);
                                });
                                return data;
                            })
                        }
                    })
            );

            angular.extend(this,
                $resource('/api/user/:userId/social/user/follow/:followedId',
                    {userId: '@userId', followedId: '@followedId'},
                    {
                        'followUser': {
                            method: 'POST',
                            transformResponse: [
                                glxTransformResponseCollection.fromJsonConverter,
                                glxTransformResponseCollection.extractData
                            ]
                        }
                    }
                )
            );

            angular.extend(this,
                $resource('/api/user/:userId/social/user/unfollow/:unfollowedId',
                    {userId: '@userId', unfollowedId: '@unfollowedId'},
                    {
                        'unfollowUser': {
                            method: 'POST',
                            transformResponse: [
                                glxTransformResponseCollection.fromJsonConverter,
                                glxTransformResponseCollection.extractData
                            ]
                        }
                    }
                )
            );

        }
    });
});