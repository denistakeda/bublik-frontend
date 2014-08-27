angular.module('glxEntities').factory('glxSocialEntity', function ($resource, $routeParams, glxTransformResponseCollection) {

    var _pubFields = {
        socialInfo: {
            followers: []
        }
    };

    var _userFollowersResource = $resource('/api/user/:userId/social/user/followers',
        {userId: $routeParams.userId, limit: '@limit', offset: '@offset'},
        {
            'getFollowers': {
                method: 'GET',
                isArray: true,
                transformResponse: [
                    glxTransformResponseCollection.fromJsonConverter,
                    glxTransformResponseCollection.extractData,
                    function (data) {
                        _pubFields.socialInfo.followers = _pubFields.socialInfo.followers.concat(data);
                        return data;
                    }
                ]
            }
        }
    );

    var glxSocialEntity = angular.extend({}, _pubFields, _userFollowersResource);

    return glxSocialEntity;
});